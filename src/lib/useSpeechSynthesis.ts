import { useCallback, useEffect, useState } from 'react';

export interface UseSpeechSynthesisResult {
  supported: boolean;
  speaking: boolean;
  speak: (text: string, onEnd?: () => void) => void;
  stop: () => void;
}

// Opt-in, user-triggered browser speech synthesis. Never auto-play: callers
// invoke speak() only from an explicit user action. Cancels cleanly on stop,
// a new utterance, or unmount.
export function useSpeechSynthesis(): UseSpeechSynthesisResult {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const [speaking, setSpeaking] = useState(false);

  const stop = useCallback(() => {
    if (supported) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (!supported || !text.trim()) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => { setSpeaking(false); onEnd?.(); };
    utterance.onerror = () => { setSpeaking(false); onEnd?.(); };
    utterance.onboundary = () => { /* best-effort: not fired by every browser */ };
    try { window.speechSynthesis.speak(utterance); } catch { setSpeaking(false); onEnd?.(); }
  }, [supported]);

  useEffect(() => {
    return () => { if (supported) window.speechSynthesis.cancel(); };
  }, [supported]);

  return { supported, speaking, speak, stop };
}
