import {
  WeakSpots,
  loadWeakSpots,
  saveWeakSpots,
  recordMiss,
  recordCorrect,
  setFlagged,
  getActiveWeakSpots,
} from './weakSpots';
import type { CertificationId } from './examQuestions';

const TRACK: CertificationId = 'jncia';

describe('weak-spots queue', () => {
  beforeEach(() => window.localStorage.clear());

  it('buckets a missed question and keeps it active', () => {
    let ws: WeakSpots = {};
    ws = recordMiss(ws, TRACK, 'jncia-001', 's1');
    expect(getActiveWeakSpots(ws)).toHaveLength(1);
    expect(ws['jncia:jncia-001'].missed).toBe(true);
    expect(ws['jncia:jncia-001'].missedCount).toBe(1);
  });

  it('increments streak at most once per session', () => {
    let ws: WeakSpots = recordMiss({}, TRACK, 'jncia-001', 's0');
    ws = recordCorrect(ws, TRACK, 'jncia-001', 's1');
    ws = recordCorrect(ws, TRACK, 'jncia-001', 's1');
    expect(ws['jncia:jncia-001'].streak).toBe(1);
  });

  it('graduates a question after two correct answers in separate sessions', () => {
    let ws: WeakSpots = recordMiss({}, TRACK, 'jncia-001', 's0');
    ws = recordCorrect(ws, TRACK, 'jncia-001', 's1');
    ws = recordCorrect(ws, TRACK, 'jncia-001', 's2');
    expect(getActiveWeakSpots(ws)).toHaveLength(0);
  });

  it('resets streak on a miss', () => {
    let ws: WeakSpots = recordMiss({}, TRACK, 'jncia-001', 's0');
    ws = recordCorrect(ws, TRACK, 'jncia-001', 's1');
    ws = recordMiss(ws, TRACK, 'jncia-001', 's2');
    expect(ws['jncia:jncia-001'].streak).toBe(0);
    expect(getActiveWeakSpots(ws)).toHaveLength(1);
  });

  it('does not let unflagging bypass a missed question', () => {
    let ws: WeakSpots = recordMiss({}, TRACK, 'jncia-001', 's0');
    ws = setFlagged(ws, TRACK, 'jncia-001', true);
    ws = setFlagged(ws, TRACK, 'jncia-001', false);
    expect(getActiveWeakSpots(ws)).toHaveLength(1);
    expect(ws['jncia:jncia-001'].missed).toBe(true);
  });

  it('removes a flag-only question when unflagged', () => {
    let ws: WeakSpots = setFlagged({}, TRACK, 'jncia-001', true);
    expect(getActiveWeakSpots(ws)).toHaveLength(1);
    ws = setFlagged(ws, TRACK, 'jncia-001', false);
    expect(getActiveWeakSpots(ws)).toHaveLength(0);
  });

  it('persists and reloads through localStorage', () => {
    const ws = recordMiss({}, TRACK, 'jncia-001', 's0');
    saveWeakSpots(ws);
    expect(loadWeakSpots()['jncia:jncia-001']).toEqual(ws['jncia:jncia-001']);
  });
});
