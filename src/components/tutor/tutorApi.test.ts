import { getUsage, sendPrompt, TutorApiError, boundedHistory } from '../../lib/tutorApi';
jest.mock('../../lib/supabase', () => ({ tutorConfig: { url: 'https://example.test/tutor', anonKey: 'public' } }));
const usage = { isAdmin: false, limit: 10, used: 1, remaining: 9, resetsAt: '2026-11-17T00:00:00Z' };
beforeEach(() => { global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ usage, answer: 'Answer' }) }); });
test('GET usage and POST authenticate without ever retrying a prompt', async () => {
  expect(await getUsage('token')).toEqual(usage);
  expect(fetch).toHaveBeenLastCalledWith('https://example.test/tutor', expect.objectContaining({ method: 'GET', headers: expect.objectContaining({ Authorization: 'Bearer token', apikey: 'public' }) }));
  expect(await sendPrompt('token', 'Help', [])).toEqual({ answer: 'Answer', usage });
  expect(fetch).toHaveBeenLastCalledWith(expect.any(String), expect.objectContaining({ method: 'POST', body: JSON.stringify({ prompt: 'Help', history: [] }) }));
  (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 429, json: async () => ({ error: 'Daily limit reached', code: 'DAILY_LIMIT_REACHED', usage }) });
  await expect(sendPrompt('token', 'Again', [])).rejects.toMatchObject({ status: 429, code: 'DAILY_LIMIT_REACHED', usage });
  expect(fetch).toHaveBeenCalledTimes(3);
});
test('bounds history to recent 10 messages, 4000 each, 16000 total', () => {
  const messages = boundedHistory(Array.from({ length: 12 }, (_, i) => ({ role: 'user' as const, content: `${i}`.padEnd(5000, 'x') })));
  expect(messages).toHaveLength(4);
  expect(messages[3].content.startsWith('11')).toBe(true);
  expect(messages.every(m => m.content.length <= 4000)).toBe(true);
});
test('rejects invalid prompts without fetching', async () => {
  await expect(sendPrompt('token', 'x'.repeat(4001), [])).rejects.toBeInstanceOf(TutorApiError);
  await expect(sendPrompt('token', ' ', [])).rejects.toThrow();
  expect(fetch).not.toHaveBeenCalled();
});
test('aborts requests at 60 seconds without retrying', async () => {
  jest.useFakeTimers();
  (fetch as jest.Mock).mockImplementation((_url, init) => new Promise((_resolve, reject) => init.signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')))));
  const pending = expect(sendPrompt('token', 'Help', [])).rejects.toMatchObject({ code: 'TIMEOUT' });
  jest.advanceTimersByTime(60000);
  await pending;
  expect(fetch).toHaveBeenCalledTimes(1);
  jest.useRealTimers();
});
