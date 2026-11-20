import { Box } from '@mui/material';

const AVATAR_CSS = `
.ta-head { transform-origin: 44px 44px; }
.ta-breathe { animation: ta-breathe 3s ease-in-out infinite; }
.ta-thinking { animation: ta-think 1.1s ease-in-out infinite; }
.ta-eyes { transform-origin: center; animation: ta-blink 4.2s ease-in-out infinite; }
.ta-mouth { transform-origin: 44px 60px; animation: ta-mouth 0.24s ease-in-out infinite; }
@keyframes ta-breathe { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-2px) scale(1.02); } }
@keyframes ta-think { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
@keyframes ta-blink { 0%,90%,100% { transform: scaleY(1); } 94% { transform: scaleY(0.12); } }
@keyframes ta-mouth { 0%,100% { transform: scaleY(0.3); } 50% { transform: scaleY(1.1); } }
`;

export type AvatarState = 'idle' | 'thinking' | 'speaking';

// Lightweight decorative 2D SVG character. No external media or libraries;
// motion is pure CSS keyframes. Decorative (aria-hidden) — the surrounding UI
// conveys state in text.
export default function TutorAvatar({ state }: { state: AvatarState }) {
  const headClass = state === 'thinking' ? 'ta-head ta-thinking' : 'ta-head ta-breathe';
  return (
    <Box data-testid="tutor-avatar" data-state={state} aria-hidden="true" sx={{ width: 88, height: 88, flexShrink: 0 }}>
      <style>{AVATAR_CSS}</style>
      <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden="true" focusable="false">
        <g className={headClass}>
          <circle cx="44" cy="44" r="40" fill="#2563eb" />
          <circle cx="44" cy="44" r="40" fill="none" stroke="#1e40af" strokeWidth="2" />
          <circle className="ta-eyes" cx="32" cy="38" r="5" fill="#fff" />
          <circle className="ta-eyes" cx="56" cy="38" r="5" fill="#fff" />
          <ellipse data-testid="tutor-avatar-mouth" data-speaking={state === 'speaking' ? 'true' : 'false'} cx="44" cy="60" rx="9" ry={state === 'speaking' ? 4.5 : 1.5} fill="#fff" className={state === 'speaking' ? 'ta-mouth' : undefined} />
        </g>
        {state === 'thinking' && (
          <g className="ta-thinking" style={{ transformOrigin: '44px 20px' }}>
            <circle cx="38" cy="16" r="2" fill="#2563eb" />
            <circle cx="44" cy="13" r="2" fill="#2563eb" />
            <circle cx="50" cy="16" r="2" fill="#2563eb" />
          </g>
        )}
      </svg>
    </Box>
  );
}
