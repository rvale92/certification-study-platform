import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ExamReview from './ExamReview';

const createAttempt = (certification: string, completedAt: string, scorePercent: number) => ({
  certification,
  completedAt,
  totalQuestions: 1,
  correctAnswers: scorePercent === 100 ? 1 : 0,
  scorePercent,
  timeTakenSeconds: 60,
  domainBreakdown: {
    'Design Secure Architectures': { total: 1, correct: scorePercent === 100 ? 1 : 0 },
  },
  questions: [
    {
      id: `${certification}-question`,
      question: `${certification} review question`,
      options: ['Correct', 'Incorrect'],
      correctAnswer: 'Correct',
      explanation: 'The saved attempt explanation.',
      domain: 'Design Secure Architectures',
      userAnswer: scorePercent === 100 ? 'Correct' : 'Incorrect',
    },
  ],
});

const renderBareReview = () => render(
  <MemoryRouter initialEntries={['/exam-review']}>
    <Routes>
      <Route path="/exam-review" element={<ExamReview />} />
    </Routes>
  </MemoryRouter>,
);

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
});

test('bare review route loads the most recent saved attempt', () => {
  window.localStorage.setItem(
    'certification-study:attempt:jncia',
    JSON.stringify(createAttempt('jncia', '2026-10-01T10:00:00.000Z', 40)),
  );
  window.localStorage.setItem(
    'certification-study:attempt:aws-saa-c03',
    JSON.stringify(createAttempt('aws-saa-c03', '2026-11-01T10:00:00.000Z', 100)),
  );

  renderBareReview();

  expect(screen.getByRole('heading', { name: /AWS Certified Solutions Architect.*Review/i })).toBeInTheDocument();
  expect(screen.getByText('100%')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'aws-saa-c03 review question' })).toBeInTheDocument();
});

test('bare review route shows a practice link when there is no saved attempt', () => {
  renderBareReview();

  expect(screen.getByRole('heading', { name: 'No completed practice session' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Browse practice exams' })).toHaveAttribute('href', '/practice-exams');
});
