export type FlashcardRating = 'again' | 'hard' | 'good' | 'easy';

export interface CardSrsState {
  rating: FlashcardRating;
  due: number;
  reviewedAt: number;
  intervalDays: number;
}

export type FlashcardSrs = Record<string, CardSrsState>;

const STORAGE_KEY = 'certification-study:flashcard-srs';
const LEGACY_KEY = 'certification-study:flashcard-confidence';

const DAY_MS = 24 * 60 * 60 * 1000;

export const RATING_INTERVALS_DAYS: Record<FlashcardRating, number> = {
  again: 0,
  hard: 1,
  good: 3,
  easy: 7,
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isRating = (value: unknown): value is FlashcardRating =>
  value === 'again' || value === 'hard' || value === 'good' || value === 'easy';

const isCardSrsState = (value: unknown): value is CardSrsState =>
  isRecord(value)
  && isRating(value.rating)
  && typeof value.due === 'number'
  && typeof value.reviewedAt === 'number'
  && typeof value.intervalDays === 'number';

export const ratingDue = (rating: FlashcardRating, now: number): number =>
  now + RATING_INTERVALS_DAYS[rating] * DAY_MS;

export const rateFlashcard = (rating: FlashcardRating, now = Date.now()): CardSrsState => ({
  rating,
  due: ratingDue(rating, now),
  reviewedAt: now,
  intervalDays: RATING_INTERVALS_DAYS[rating],
});

/** Legacy `certification-study:flashcard-confidence` -> new SRS schema. */
const migrateLegacy = (legacy: Record<string, unknown>): FlashcardSrs => {
  const now = Date.now();
  const migrated: FlashcardSrs = {};
  Object.entries(legacy).forEach(([id, value]) => {
    if (value === 'needs-review') {
      migrated[id] = { rating: 'again', due: now, reviewedAt: 0, intervalDays: 0 };
    } else if (value === 'mastered') {
      migrated[id] = { rating: 'easy', due: ratingDue('easy', now), reviewedAt: now, intervalDays: RATING_INTERVALS_DAYS.easy };
    }
  });
  return migrated;
};

const readSrs = (): FlashcardSrs => {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return {};
  try {
    const parsed: unknown = JSON.parse(stored);
    if (!isRecord(parsed)) return {};
    const result: FlashcardSrs = {};
    Object.entries(parsed).forEach(([id, value]) => {
      if (isCardSrsState(value)) result[id] = value;
    });
    return result;
  } catch {
    return {};
  }
};

export const loadFlashcardSrs = (): FlashcardSrs => {
  const srs = readSrs();
  if (window.localStorage.getItem(STORAGE_KEY)) {
    return srs;
  }
  const legacyRaw = window.localStorage.getItem(LEGACY_KEY);
  if (!legacyRaw) return srs;
  try {
    const legacy: unknown = JSON.parse(legacyRaw);
    if (!isRecord(legacy)) return srs;
    const merged = { ...migrateLegacy(legacy), ...srs };
    saveFlashcardSrs(merged);
    return merged;
  } catch {
    return srs;
  }
};

export const saveFlashcardSrs = (srs: FlashcardSrs): void => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(srs));
};

export const isDue = (state: CardSrsState | undefined, now = Date.now()): boolean =>
  !state || state.rating === 'again' || state.due <= now;

const srsRank = (state: CardSrsState | undefined, now: number): number => {
  if (!state) return 1; // new / unrated
  if (state.rating === 'again') return 0; // weakest, in-session re-queue
  if (state.due <= now) return 2; // lapsed hard/good/easy
  return 3; // future
};

/**
 * Orders a deck by spaced-repetition priority instead of a uniform shuffle:
 * again cards first, then new cards, then lapsed due cards, then future cards
 * with the soonest due date first.
 */
export const orderBySrs = <T extends { id: string }>(cards: T[], srs: FlashcardSrs): T[] => {
  const now = Date.now();
  return [...cards].sort((a, b) => {
    const sa = srs[a.id];
    const sb = srs[b.id];
    const ra = srsRank(sa, now);
    const rb = srsRank(sb, now);
    if (ra !== rb) return ra - rb;
    if (ra === 3) return (sa?.due ?? 0) - (sb?.due ?? 0);
    if (ra === 0) return (sa?.reviewedAt ?? 0) - (sb?.reviewedAt ?? 0);
    return 0;
  });
};
