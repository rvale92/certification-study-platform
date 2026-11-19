import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/tutor/StudyTutor', () => ({
  __esModule: true,
  default: ({ openSignal = 0 }: { openSignal?: number }) => <button aria-label="Open study tutor">{openSignal ? 'Requested tutor open' : 'AI study tutor'}</button>,
}));

jest.mock('./pages/CheatSheets', () => ({ __esModule: true, default: () => <h1>Cheat Sheets</h1> }));

beforeEach(() => {
  window.history.replaceState(null, '', '/');
  window.localStorage.clear();
});

test('renders certification study homepage', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /welcome to certification study platform/i })).toBeInTheDocument();
});

test('mounts the authenticated study tutor entry point', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: 'Open study tutor' })).toBeInTheDocument();
});

test('main navigation opens the cheat sheets default track', () => {
  render(<App />);
  fireEvent.click(screen.getAllByRole('link', { name: 'Cheat Sheets' })[0]);
  expect(screen.getByRole('heading', { name: 'Cheat Sheets' })).toBeInTheDocument();
  expect(window.location.pathname).toBe('/cheatsheets/aws-saa');
});

test('supports a direct cheat sheet URL and preserves the route on render', () => {
  window.history.replaceState(null, '', '/cheatsheets/aws-saa');
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Cheat Sheets' })).toBeInTheDocument();
});

test('accepts the existing AWS certification ID as a cheat sheet deep-link alias', () => {
  window.history.replaceState(null, '', '/cheatsheets/aws-saa-c03');
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Cheat Sheets' })).toBeInTheDocument();
  expect(window.location.pathname).toBe('/cheatsheets/aws-saa');
});

test('can switch between light and dark modes and retain the preference', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
  expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument();
  expect(window.localStorage.getItem('certification-study:color-mode')).toBe('dark');
});

test('main navigation can request the existing AI Study Tutor drawer', () => {
  render(<App />);
  fireEvent.click(screen.getAllByRole('button', { name: 'AI Study Tutor' })[0]);
  expect(screen.getByRole('button', { name: 'Open study tutor' })).toHaveTextContent('Requested tutor open');
});
