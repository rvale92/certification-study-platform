import type { CertificationId } from './examQuestions';

export interface WeakSpotEntry {
  track: CertificationId;
  questionId: string;
  missed: boolean;
  missedCount: number;
  flagged: boolean;
  streak: number;
  lastSessionId: string | null;
  updatedAt: string;
}

export type WeakSpots = Record<string, WeakSpotEntry>;

const STORAGE_KEY = 'certification-study:weak-spots';

export const weakSpotKey = (track: CertificationId, questionId: string): string =>
  `${track}:${questionId}`;

export const newSessionId = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

const CERTIFICATION_IDS: readonly CertificationId[] = [
  'aws-saa-c03',
  'jncia',
  'ccna',
  'security-plus',
  'sc-200',
];

const isCertificationId = (value: unknown): value is CertificationId =>
  CERTIFICATION_IDS.includes(value as CertificationId);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isWeakSpotEntry = (value: unknown): value is WeakSpotEntry => {
  if (!isRecord(value)) return false;
  return isCertificationId(value.track)
    && typeof value.questionId === 'string'
    && typeof value.missed === 'boolean'
    && typeof value.missedCount === 'number'
    && typeof value.flagged === 'boolean'
    && typeof value.streak === 'number'
    && (value.lastSessionId === null || typeof value.lastSessionId === 'string')
    && typeof value.updatedAt === 'string';
};

export const loadWeakSpots = (): WeakSpots => {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return {};
  try {
    const parsed: unknown = JSON.parse(stored);
    if (!isRecord(parsed)) return {};
    const result: WeakSpots = {};
    Object.entries(parsed).forEach(([key, value]) => {
      if (isWeakSpotEntry(value)) result[key] = value;
    });
    return result;
  } catch {
    return {};
  }
};

export const saveWeakSpots = (weakSpots: WeakSpots): void => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(weakSpots));
};

/** An entry stays in the queue while it still needs work. */
export const isActiveWeakSpot = (entry: WeakSpotEntry): boolean =>
  entry.streak < 2 && (entry.missed || entry.flagged);

const ensureEntry = (
  weakSpots: WeakSpots,
  track: CertificationId,
  questionId: string,
): WeakSpotEntry => {
  const existing = weakSpots[weakSpotKey(track, questionId)];
  if (existing) return existing;
  return {
    track,
    questionId,
    missed: false,
    missedCount: 0,
    flagged: false,
    streak: 0,
    lastSessionId: null,
    updatedAt: new Date().toISOString(),
  };
};

const prune = (weakSpots: WeakSpots): WeakSpots => {
  const result: WeakSpots = {};
  Object.values(weakSpots).forEach((entry) => {
    if (isActiveWeakSpot(entry)) {
      result[weakSpotKey(entry.track, entry.questionId)] = entry;
    }
  });
  return result;
};

export const recordMiss = (
  weakSpots: WeakSpots,
  track: CertificationId,
  questionId: string,
  sessionId: string,
): WeakSpots => {
  const entry = ensureEntry(weakSpots, track, questionId);
  const next: WeakSpotEntry = {
    ...entry,
    missed: true,
    missedCount: entry.missedCount + 1,
    streak: 0,
    lastSessionId: sessionId,
    updatedAt: new Date().toISOString(),
  };
  return { ...weakSpots, [weakSpotKey(track, questionId)]: next };
};

export const recordCorrect = (
  weakSpots: WeakSpots,
  track: CertificationId,
  questionId: string,
  sessionId: string,
): WeakSpots => {
  const key = weakSpotKey(track, questionId);
  const entry = weakSpots[key];
  if (!entry) return weakSpots;
  // At most +1 per session: only increment on the first correct answer of a session.
  const streak = entry.lastSessionId === sessionId ? entry.streak : entry.streak + 1;
  const next: WeakSpotEntry = {
    ...entry,
    streak,
    lastSessionId: sessionId,
    updatedAt: new Date().toISOString(),
  };
  return prune({ ...weakSpots, [key]: next });
};

export const setFlagged = (
  weakSpots: WeakSpots,
  track: CertificationId,
  questionId: string,
  flagged: boolean,
): WeakSpots => {
  const key = weakSpotKey(track, questionId);
  const existing = weakSpots[key];
  if (!flagged && !existing) return weakSpots;
  const entry = ensureEntry(weakSpots, track, questionId);
  const next: WeakSpotEntry = {
    ...entry,
    flagged,
    updatedAt: new Date().toISOString(),
  };
  return prune({ ...weakSpots, [key]: next });
};

export const getActiveWeakSpots = (
  weakSpots: WeakSpots,
  track?: CertificationId,
): WeakSpotEntry[] =>
  Object.values(weakSpots)
    .filter((entry) => isActiveWeakSpot(entry) && (!track || entry.track === track))
    .sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));

/** Drops entries whose question no longer exists in the question banks. */
export const filterWeakSpots = (
  weakSpots: WeakSpots,
  questionExists: (track: CertificationId, questionId: string) => boolean,
): WeakSpots => {
  const result: WeakSpots = {};
  Object.values(weakSpots).forEach((entry) => {
    if (questionExists(entry.track, entry.questionId)) {
      result[weakSpotKey(entry.track, entry.questionId)] = entry;
    }
  });
  return result;
};
