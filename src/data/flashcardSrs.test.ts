import {
  FlashcardSrs,
  loadFlashcardSrs,
  rateFlashcard,
  orderBySrs,
  isDue,
} from './flashcardSrs';

const DAY_MS = 24 * 60 * 60 * 1000;

describe('flashcard spaced repetition', () => {
  beforeEach(() => window.localStorage.clear());

  it('assigns graduated intervals for the four ratings', () => {
    const now = 1_000_000;
    expect(rateFlashcard('again', now).due).toBe(now);
    expect(rateFlashcard('hard', now).due).toBe(now + DAY_MS);
    expect(rateFlashcard('good', now).due).toBe(now + 3 * DAY_MS);
    expect(rateFlashcard('easy', now).due).toBe(now + 7 * DAY_MS);
  });

  it('orders again, new, lapsed, then future by soonest due', () => {
    const now = Date.now();
    const cards = [
      { id: 'future-far' },
      { id: 'new' },
      { id: 'again' },
      { id: 'lapsed' },
      { id: 'future-near' },
    ];
    const srs: FlashcardSrs = {
      'future-far': { rating: 'easy', due: now + 7 * DAY_MS, reviewedAt: now, intervalDays: 7 },
      'future-near': { rating: 'hard', due: now + DAY_MS, reviewedAt: now, intervalDays: 1 },
      again: { rating: 'again', due: now, reviewedAt: now - 1000, intervalDays: 0 },
      lapsed: { rating: 'good', due: now - 1000, reviewedAt: now - 2000, intervalDays: 3 },
    };
    expect(orderBySrs(cards, srs).map((c) => c.id)).toEqual([
      'again',
      'new',
      'lapsed',
      'future-near',
      'future-far',
    ]);
  });

  it('migrates the legacy two-value confidence into the SRS schema', () => {
    window.localStorage.setItem(
      'certification-study:flashcard-confidence',
      JSON.stringify({ 'card-1': 'needs-review', 'card-2': 'mastered' }),
    );
    const srs = loadFlashcardSrs();
    expect(srs['card-1'].rating).toBe('again');
    expect(srs['card-1'].due).toBeLessThanOrEqual(Date.now());
    expect(srs['card-2'].rating).toBe('easy');
    expect(srs['card-2'].due).toBeGreaterThan(Date.now());
    expect(window.localStorage.getItem('certification-study:flashcard-srs')).toBeTruthy();
  });

  it('treats unrated and again cards as due', () => {
    const now = Date.now();
    expect(isDue(undefined, now)).toBe(true);
    expect(isDue({ rating: 'again', due: now - 1000, reviewedAt: 0, intervalDays: 0 }, now)).toBe(true);
    expect(isDue({ rating: 'easy', due: now + 1000, reviewedAt: 0, intervalDays: 7 }, now)).toBe(false);
  });
});
