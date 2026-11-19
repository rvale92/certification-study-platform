import { tutorConfig } from './supabase';

export interface TutorUsage {
  isAdmin: boolean;
  limit: number | null;
  used: number | null;
  remaining: number | null;
  resetsAt: string;
}
export interface ChatMessage { role: 'user' | 'assistant'; content: string }
export class TutorApiError extends Error {
  constructor(message: string, public status = 0, public code = 'NETWORK_ERROR', public usage?: TutorUsage) {
    super(message); this.name = 'TutorApiError';
  }
}
export function boundedHistory(history: ChatMessage[]): ChatMessage[] {
  let remaining = 16000;
  const result: ChatMessage[] = [];
  for (const message of history.slice(-10).reverse()) {
    const content = message.content.slice(0, Math.min(4000, remaining));
    if (!content) break;
    result.unshift({ role: message.role, content });
    remaining -= content.length;
  }
  return result;
}
async function request<T>(token: string, method: 'GET' | 'POST', body?: object, signal?: AbortSignal): Promise<T> {
  if (!tutorConfig) throw new TutorApiError('Study tutor is not configured.', 0, 'UNCONFIGURED');
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (signal?.aborted) controller.abort();
  signal?.addEventListener('abort', abort);
  let timedOut = false;
  const timer = setTimeout(() => { timedOut = true; controller.abort(); }, 60000);
  try {
    const response = await fetch(tutorConfig.url, {
      method,
      headers: { Authorization: `Bearer ${token}`, apikey: tutorConfig.anonKey, 'Content-Type': 'application/json' },
      ...(body ? { body: JSON.stringify(body) } : {}), signal: controller.signal,
    });
    const data = await response.json();
    if (!response.ok) throw new TutorApiError(data.error || 'Tutor request failed.', response.status, data.code, data.usage);
    return data;
  } catch (error) {
    if (error instanceof TutorApiError) throw error;
    if (timedOut) throw new TutorApiError('The tutor timed out. Check usage before trying again.', 0, 'TIMEOUT');
    if (controller.signal.aborted) throw new TutorApiError('Request cancelled.', 0, 'ABORTED');
    throw new TutorApiError('Unable to reach the tutor. Check your connection and try again.');
  } finally {
    clearTimeout(timer); signal?.removeEventListener('abort', abort);
  }
}
export async function getUsage(token: string, signal?: AbortSignal): Promise<TutorUsage> {
  return (await request<{ usage: TutorUsage }>(token, 'GET', undefined, signal)).usage;
}
export function sendPrompt(token: string, prompt: string, history: ChatMessage[], signal?: AbortSignal): Promise<{ answer: string; usage: TutorUsage }> {
  if (!prompt.trim() || prompt.length > 4000) return Promise.reject(new TutorApiError('Enter a prompt of 1–4000 characters.', 0, 'INVALID_PROMPT'));
  return request(token, 'POST', { prompt, history: boundedHistory(history) }, signal);
}
