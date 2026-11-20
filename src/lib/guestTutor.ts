import { ChatMessage, TutorApiError, TutorUsage } from './tutorApi';

// Client-side daily guest allowance. This is UI/UX state ONLY — it is NOT
// enforcement. localStorage can be cleared or bypassed; a future VPS backend
// must track guest quota server-side (UTC date, atomic reserve) before guest
// answers become real. The answer below is a clearly-labeled local stub.
export const GUEST_DAILY_LIMIT = 10;
const STORAGE_KEY = 'certification-study:guest-tutor-quota';

function todayKey(now: Date): string {
  return now.toISOString().slice(0, 10);
}
function nextUtcMidnight(now: Date): string {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)).toISOString();
}
function readStored(now: Date): { date: string; used: number } {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: todayKey(now), used: 0 };
    const parsed = JSON.parse(raw) as { date?: unknown; used?: unknown };
    if (typeof parsed.date !== 'string' || typeof parsed.used !== 'number') return { date: todayKey(now), used: 0 };
    return parsed.date === todayKey(now) ? { date: parsed.date, used: parsed.used } : { date: todayKey(now), used: 0 };
  } catch {
    return { date: todayKey(now), used: 0 };
  }
}
function clampUsed(used: number): number {
  return Math.max(0, Math.min(GUEST_DAILY_LIMIT, Math.floor(used)));
}

export function getGuestUsage(now = new Date()): TutorUsage {
  const used = clampUsed(readStored(now).used);
  return { isAdmin: false, limit: GUEST_DAILY_LIMIT, used, remaining: GUEST_DAILY_LIMIT - used, resetsAt: nextUtcMidnight(now) };
}

export async function sendGuestPrompt(prompt: string, history: ChatMessage[], now = new Date()): Promise<{ answer: string; usage: TutorUsage }> {
  void history; // Local stub does not use conversation history yet.
  const current = getGuestUsage(now);
  if (current.remaining === 0) {
    throw new TutorApiError('Account required to continue.', 429, 'ACCOUNT_REQUIRED', current);
  }
  const used = (current.used ?? 0) + 1;
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: todayKey(now), used })); } catch { /* quota write is best-effort UI state */ }
  const usage: TutorUsage = { isAdmin: false, limit: GUEST_DAILY_LIMIT, used, remaining: GUEST_DAILY_LIMIT - used, resetsAt: nextUtcMidnight(now) };
  const answer = `(Guest preview) This is a local placeholder — real AI answers require sign-in. You asked: "${prompt}"`;
  return { answer, usage };
}
