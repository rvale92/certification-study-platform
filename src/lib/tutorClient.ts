import { ChatMessage, TutorUsage, getUsage, sendPrompt } from './tutorApi';
import { getGuestUsage, sendGuestPrompt } from './guestTutor';

// Clean client/service boundary for the tutor. The React component depends only
// on this interface. To wire a future VPS HTTPS endpoint (with CORS, auth
// verification, and server-side daily quota tracking), add a provider here —
// no component changes needed.
export interface TutorClient {
  getUsage(signal?: AbortSignal): Promise<TutorUsage>;
  sendPrompt(prompt: string, history: ChatMessage[], signal?: AbortSignal): Promise<{ answer: string; usage: TutorUsage }>;
}

export function createTutorClient(token: string | null): TutorClient {
  if (token) {
    return {
      getUsage: (signal) => getUsage(token, signal),
      sendPrompt: (prompt, history, signal) => sendPrompt(token, prompt, history, signal),
    };
  }
  return {
    getUsage: async () => getGuestUsage(),
    sendPrompt: (prompt, history) => sendGuestPrompt(prompt, history),
  };
}
