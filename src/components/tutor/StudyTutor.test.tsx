import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import StudyTutor from './StudyTutor';
import { supabase } from '../../lib/supabase';
import { getUsage, sendPrompt, TutorApiError } from '../../lib/tutorApi';

jest.mock('../../lib/supabase', () => ({ supabase: { auth: { getSession: jest.fn(), onAuthStateChange: jest.fn(), signInWithPassword: jest.fn(), signUp: jest.fn(), signOut: jest.fn() } } }));
jest.mock('../../lib/tutorApi', () => ({ ...jest.requireActual('../../lib/tutorApi'), getUsage: jest.fn(), sendPrompt: jest.fn() }));
const auth = supabase!.auth;
let listener: (event: string, session: any) => void;
const unsubscribe = jest.fn();
const session = { access_token: 'token-a', user: { id: 'a', email: 'a@example.com' } };
const usage = { isAdmin: false, limit: 10, used: 2, remaining: 8, resetsAt: '2099-01-01T00:00:00Z' };
beforeEach(() => {
  jest.clearAllMocks();
  (auth.getSession as jest.Mock).mockResolvedValue({ data: { session: null }, error: null });
  (auth.onAuthStateChange as jest.Mock).mockImplementation(cb => { listener = cb; return { data: { subscription: { unsubscribe } } }; });
  (auth.signInWithPassword as jest.Mock).mockResolvedValue({ data: { session }, error: null });
  (auth.signUp as jest.Mock).mockResolvedValue({ data: { session: null }, error: null });
  (auth.signOut as jest.Mock).mockResolvedValue({ error: null });
  (getUsage as jest.Mock).mockResolvedValue(usage);
  (sendPrompt as jest.Mock).mockResolvedValue({ answer: '<img src=x onerror=alert(1)>', usage: { ...usage, used: 3, remaining: 7 } });
});
async function open() { render(<StudyTutor/>); fireEvent.click(screen.getByRole('button', { name: /open study tutor/i })); await screen.findByRole('heading', { name: 'Study tutor' }); }
async function openAuthenticated() { (auth.getSession as jest.Mock).mockResolvedValue({ data: { session }, error: null }); await open(); await screen.findByText(/8 of 10 prompts remaining/i); }
test('initializes session, subscribes, signs up with confirmation, signs in and logs out', async () => {
  await open();
  fireEvent.change(await screen.findByLabelText(/^Email/), { target: { value: 'a@example.com' } });
  fireEvent.change(screen.getByLabelText(/^Password/), { target: { value: 'secret-password' } });
  fireEvent.click(screen.getByRole('button', { name: 'Create account' }));
  expect(await screen.findByText(/check your email/i)).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText(/^Password/), { target: { value: 'secret-password' } });
  fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
  await screen.findByText(/8 of 10 prompts remaining/i);
  expect(auth.signInWithPassword).toHaveBeenCalledWith({ email: 'a@example.com', password: 'secret-password' });
  expect(getUsage).toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Sign out' }));
  await screen.findByLabelText(/^Email/);
  expect(auth.signOut).toHaveBeenCalled();
});
test('unsubscribes on unmount', async () => {
  const view = render(<StudyTutor/>);
  await waitFor(() => expect(auth.getSession).toHaveBeenCalled());
  view.unmount(); expect(unsubscribe).toHaveBeenCalled();
});

async function ask(prompt = 'Explain routing') {
  fireEvent.change(screen.getByLabelText('Your question'), { target: { value: prompt } });
  fireEvent.click(screen.getByRole('button', { name: 'Send question' }));
  await waitFor(() => expect(sendPrompt).toHaveBeenCalled());
}
test('sends prompts with bounded history, renders safe text, updates server quota', async () => {
  await openAuthenticated(); await ask();
  expect(await screen.findByText('<img src=x onerror=alert(1)>')).toBeInTheDocument();
  expect(screen.queryByRole('img', { hidden: true })).not.toBeInTheDocument();
  expect(screen.getByText(/7 of 10 prompts remaining/)).toBeInTheDocument();
  expect(sendPrompt).toHaveBeenCalledWith('token-a', 'Explain routing', [], expect.any(AbortSignal));
});
test('clears transcript and ignores pending answers after account change', async () => {
  let resolve: any;
  (sendPrompt as jest.Mock).mockReturnValue(new Promise(r => { resolve = r; }));
  await openAuthenticated(); await ask('Private question');
  act(() => listener('SIGNED_IN', { access_token: 'token-b', user: { id: 'b', email: 'b@example.com' } }));
  expect(screen.queryByText('Private question')).not.toBeInTheDocument();
  await act(async () => resolve({ answer: 'Private answer', usage }));
  expect(screen.queryByText('Private answer')).not.toBeInTheDocument();
  expect(screen.getByText('b@example.com')).toBeInTheDocument();
});
test('refreshes usage after a failed reserved request and permits explicit retry', async () => {
  await openAuthenticated();
  (sendPrompt as jest.Mock).mockRejectedValueOnce(new TutorApiError('Upstream failed', 502, 'UPSTREAM_ERROR'));
  (getUsage as jest.Mock).mockResolvedValue({ ...usage, remaining: 7, used: 3 });
  await ask();
  expect(await screen.findByText('Upstream failed')).toBeInTheDocument();
  await screen.findByText(/7 of 10 prompts remaining/);
  expect(sendPrompt).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByRole('button', { name: 'Retry question' }));
  await waitFor(() => expect(sendPrompt).toHaveBeenCalledTimes(2));
});
test('429 displays reset time, refreshes GET usage, and disables sending', async () => {
  await openAuthenticated();
  const exhausted = { ...usage, used: 10, remaining: 0 };
  (sendPrompt as jest.Mock).mockRejectedValueOnce(new TutorApiError('Daily limit reached', 429, 'DAILY_LIMIT_REACHED', exhausted));
  (getUsage as jest.Mock).mockResolvedValue(exhausted);
  await ask();
  await screen.findByText('Daily limit reached');
  expect(await screen.findByText(/0 of 10 prompts remaining/)).toBeInTheDocument();
  expect(screen.getByText(/Resets/)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Send question' })).toBeDisabled();
});
test('refreshes at reset rather than leaving quota disabled across midnight', async () => {
  jest.useFakeTimers();
  (auth.getSession as jest.Mock).mockResolvedValue({ data: { session }, error: null });
  (getUsage as jest.Mock).mockResolvedValueOnce({ ...usage, remaining: 0, resetsAt: new Date(Date.now() + 5000).toISOString() }).mockResolvedValue(usage);
  await open();
  await screen.findByText(/0 of 10 prompts remaining/);
  await act(async () => { jest.advanceTimersByTime(5100); });
  expect(await screen.findByText(/8 of 10 prompts remaining/)).toBeInTheDocument();
  jest.useRealTimers();
});
test('a late reset GET cannot overwrite newer POST quota', async () => {
  jest.useFakeTimers();
  let finishPost: any;
  let finishGet: any;
  (auth.getSession as jest.Mock).mockResolvedValue({ data: { session }, error: null });
  (getUsage as jest.Mock).mockResolvedValueOnce({ ...usage, resetsAt: new Date(Date.now() + 5000).toISOString() }).mockImplementation(() => new Promise(resolve => { finishGet = resolve; }));
  (sendPrompt as jest.Mock).mockImplementation(() => new Promise(resolve => { finishPost = resolve; }));
  await open(); await screen.findByText(/8 of 10 prompts remaining/);
  await ask();
  await act(async () => { jest.advanceTimersByTime(5100); });
  await act(async () => { finishPost({ answer: 'Done', usage: { ...usage, used: 3, remaining: 7 } }); });
  await act(async () => { finishGet(usage); });
  expect(screen.getByText(/7 of 10 prompts remaining/)).toBeInTheDocument();
  jest.useRealTimers();
});
test('same-session auth events re-verify backend usage', async () => {
  await openAuthenticated();
  act(() => listener('SIGNED_IN', session));
  await screen.findByText(/8 of 10 prompts remaining/);
  expect(getUsage).toHaveBeenCalledTimes(2);
});
test('invited authenticated users can set a password for later sign-in', async () => {
  (auth as any).updateUser = jest.fn().mockResolvedValue({ data: { user: session.user }, error: null });
  await openAuthenticated();
  fireEvent.click(screen.getByRole('button', { name: 'Set sign-in password' }));
  fireEvent.change(screen.getByLabelText(/New sign-in password/), { target: { value: 'a-long-new-password-123' } });
  fireEvent.click(screen.getByRole('button', { name: 'Save password' }));
  await waitFor(() => expect((auth as any).updateUser).toHaveBeenCalled());
  expect((auth as any).updateUser).toHaveBeenCalledWith({ password: 'a-long-new-password-123' });
  expect(await screen.findByText('Password saved. You can sign in with email and password next time.')).toBeInTheDocument();
});

test('usage failures expose a read-only retry and do not consume prompts', async () => {
  (getUsage as jest.Mock).mockRejectedValueOnce(new TutorApiError('Offline'));
  (auth.getSession as jest.Mock).mockResolvedValue({ data: { session }, error: null });
  await open(); await screen.findByText('Offline');
  fireEvent.click(screen.getByRole('button', { name: 'Refresh usage' }));
  await screen.findByText(/8 of 10 prompts remaining/);
  expect(sendPrompt).not.toHaveBeenCalled();
});

test('opens from a navigation request without changing authentication state', async () => {
  const view = render(<StudyTutor openSignal={0} />);
  view.rerender(<StudyTutor openSignal={1} />);
  expect(await screen.findByRole('heading', { name: 'Study tutor' })).toBeInTheDocument();
  expect(sendPrompt).not.toHaveBeenCalled();
});
