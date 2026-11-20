import { GUEST_DAILY_LIMIT, getGuestUsage, sendGuestPrompt } from './guestTutor';

const KEY = 'certification-study:guest-tutor-quota';

describe('guest tutor quota (client-side UI stub)', () => {
  beforeEach(() => window.localStorage.clear());

  it('starts the day with the full allowance and a UTC-midnight reset', () => {
    const usage = getGuestUsage(new Date('2026-11-19T12:00:00Z'));
    expect(usage.isAdmin).toBe(false);
    expect(usage.limit).toBe(GUEST_DAILY_LIMIT);
    expect(usage.used).toBe(0);
    expect(usage.remaining).toBe(GUEST_DAILY_LIMIT);
    expect(usage.resetsAt).toBe('2026-11-20T00:00:00.000Z');
  });

  it('resets a stale count when the stored date is from a previous day', () => {
    window.localStorage.setItem(KEY, JSON.stringify({ date: '2026-11-18', used: 9 }));
    const usage = getGuestUsage(new Date('2026-11-19T12:00:00Z'));
    expect(usage.used).toBe(0);
    expect(usage.remaining).toBe(GUEST_DAILY_LIMIT);
  });

  it('reserves a question, persists the count, and returns a clearly-labeled placeholder answer', async () => {
    const first = await sendGuestPrompt('Explain routing', [], new Date('2026-11-19T12:00:00Z'));
    expect(first.usage.used).toBe(1);
    expect(first.usage.remaining).toBe(GUEST_DAILY_LIMIT - 1);
    expect(first.answer).toContain('Guest preview');
    expect(first.answer).toContain('Explain routing');
    expect(getGuestUsage(new Date('2026-11-19T13:00:00Z')).used).toBe(1);
  });

  it('refuses to reserve beyond the daily limit with an account-required signal', async () => {
    window.localStorage.setItem(KEY, JSON.stringify({ date: '2026-11-19', used: GUEST_DAILY_LIMIT }));
    await expect(sendGuestPrompt('More?', [], new Date('2026-11-19T12:00:00Z'))).rejects.toMatchObject({
      status: 429,
      code: 'ACCOUNT_REQUIRED',
    });
  });

  it('tolerates unreadable localStorage without crashing', () => {
    window.localStorage.setItem(KEY, 'not-json');
    const usage = getGuestUsage(new Date('2026-11-19T12:00:00Z'));
    expect(usage.used).toBe(0);
    expect(usage.remaining).toBe(GUEST_DAILY_LIMIT);
  });
});
