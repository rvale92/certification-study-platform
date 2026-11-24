import { loadExamAttempt } from './examAttempt';

describe('exam attempt storage', () => {
  beforeEach(() => window.localStorage.clear());

  it('returns null when no attempt is stored', () => {
    expect(loadExamAttempt('jncia')).toBeNull();
  });

  it('returns null for corrupted JSON', () => {
    window.localStorage.setItem('certification-study:attempt:jncia', '{broken');
    expect(loadExamAttempt('jncia')).toBeNull();
  });

  it('returns null for JSON that is not a valid attempt', () => {
    window.localStorage.setItem('certification-study:attempt:jncia', JSON.stringify({ foo: 'bar' }));
    expect(loadExamAttempt('jncia')).toBeNull();
  });
});
