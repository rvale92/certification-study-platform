import type { CertificationId, Question } from './examQuestions';

export interface AttemptQuestion extends Question {
  userAnswer: string | null;
}

export interface DomainResult {
  total: number;
  correct: number;
}

export interface ExamAttempt {
  certification: CertificationId;
  completedAt: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercent: number;
  timeTakenSeconds: number;
  domainBreakdown: Record<string, DomainResult>;
  questions: AttemptQuestion[];
}

const storageKey = (certification: CertificationId): string => `certification-study:attempt:${certification}`;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isQuestion = (value: unknown): value is AttemptQuestion => {
  if (!isRecord(value)) return false;
  return typeof value.id === 'string'
    && typeof value.question === 'string'
    && Array.isArray(value.options)
    && value.options.every((option) => typeof option === 'string')
    && typeof value.correctAnswer === 'string'
    && typeof value.explanation === 'string'
    && typeof value.domain === 'string'
    && (value.userAnswer === null || typeof value.userAnswer === 'string')
    && (value.distractorExplanations === undefined || isRecord(value.distractorExplanations));
};

const isExamAttempt = (value: unknown, certification: CertificationId): value is ExamAttempt => {
  if (!isRecord(value) || value.certification !== certification || !Array.isArray(value.questions)) return false;
  if (!value.questions.every(isQuestion) || !isRecord(value.domainBreakdown)) return false;
  return typeof value.completedAt === 'string'
    && Number.isFinite(Date.parse(value.completedAt))
    && typeof value.totalQuestions === 'number'
    && typeof value.correctAnswers === 'number'
    && typeof value.scorePercent === 'number'
    && typeof value.timeTakenSeconds === 'number'
    && Object.values(value.domainBreakdown).every((domain) =>
      isRecord(domain) && typeof domain.total === 'number' && typeof domain.correct === 'number',
    );
};

export const saveExamAttempt = (attempt: ExamAttempt): void => {
  window.localStorage.setItem(storageKey(attempt.certification), JSON.stringify(attempt));
};

export const loadExamAttempt = (certification: CertificationId): ExamAttempt | null => {
  const stored = window.localStorage.getItem(storageKey(certification));
  if (!stored) return null;

  const parsed: unknown = JSON.parse(stored);
  if (!isExamAttempt(parsed, certification)) {
    throw new Error(`Saved exam attempt for ${certification} has an invalid format.`);
  }
  return parsed;
};

export const loadMostRecentExamAttempt = (certifications: CertificationId[]): ExamAttempt | null => {
  let latestAttempt: ExamAttempt | null = null;

  for (const certification of certifications) {
    const attempt = loadExamAttempt(certification);
    if (
      attempt
      && (!latestAttempt || Date.parse(attempt.completedAt) > Date.parse(latestAttempt.completedAt))
    ) {
      latestAttempt = attempt;
    }
  }

  return latestAttempt;
};
