import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CheatSheets from './CheatSheets';

jest.mock('../data/cheatsheets', () => ({
  cheatSheetTracks: [
    { id: 'aws-saa', title: 'AWS Solutions Architect', examCode: 'SAA-C03', status: 'available' },
    { id: 'jncia', title: 'JNCIA-Junos', examCode: 'JN0-106', status: 'coming-soon' },
  ],
  cheatSheetModules: {
    'aws-saa': {
      id: 'aws-saa', certificationId: 'aws-saa-c03', title: 'AWS Solutions Architect',
      examCode: 'SAA-C03', description: 'Make architecture trade-offs.', lastReviewed: '2026-11-19',
      domains: [
        { id: 'secure', title: 'Design Secure Architectures', weight: 30, summary: 'Protect access.', cards: [
          { id: 'iam', title: 'IAM and STS', summary: 'Temporary access, not shared keys.', analogy: 'A temporary visitor badge.', bullets: ['Assume a role with STS.'], tags: ['identity'], sourceIds: ['aws'] },
        ] },
        { id: 'performance', title: 'Design High-Performing Architectures', weight: 24, summary: 'Meet latency goals.', cards: [
          { id: 'cache', title: 'DynamoDB caching', summary: 'Cache repeat reads.', bullets: ['DAX reduces read latency.'], tags: ['DAX', 'database'], sourceIds: ['aws'] },
        ] },
      ],
      decisionCards: [{ id: 'queue', title: 'SQS vs SNS', summary: 'Choose queue or fan-out.', bullets: [], tags: ['messaging'], sourceIds: ['aws'], comparisons: [{ option: 'SQS', pickWhen: 'Buffer work.', watchOut: 'Consumers delete messages.' }, { option: 'SNS', pickWhen: 'Fan out.', watchOut: 'Not a work queue.' }] }],
      limits: [{ id: 'sqs-size', title: 'SQS message size', summary: '1 MiB current maximum.', bullets: ['Legacy 256 KB is not current.'], tags: ['quota'], sourceIds: ['aws'] }],
      strategies: [{ id: 'pacing', title: 'Pacing', summary: 'Budget time for review.', bullets: ['Read the constraint first.'], tags: ['exam'], sourceIds: ['aws'] }],
      sources: [{ id: 'aws', label: 'Official AWS documentation', url: 'https://docs.aws.amazon.com/' }],
    },
  },
}), { virtual: true });

function show(path = '/cheatsheets/aws-saa') {
  return render(<MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Routes><Route path="/cheatsheets/:trackId" element={<CheatSheets />} /></Routes>
  </MemoryRouter>);
}

test('renders a modular track with domain weights, topic cards and review date', () => {
  show();
  expect(screen.getByRole('heading', { name: 'Cheat Sheets', level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /AWS Solutions Architect/, level: 2 })).toBeInTheDocument();
  expect(screen.getByText(/30%/)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /IAM and STS/ })).toHaveAttribute('aria-expanded', 'false');
  expect(screen.getByText(/2026-11-19/)).toBeInTheDocument();
});

test('searches hidden card details and tags case-insensitively, with reset and empty states', () => {
  show();
  const search = screen.getByRole('textbox', { name: 'Search cheat sheet' });
  fireEvent.change(search, { target: { value: '  DAX  ' } });
  expect(screen.getByRole('button', { name: /DynamoDB caching/ })).toHaveAttribute('aria-expanded', 'true');
  expect(screen.queryByRole('button', { name: /IAM and STS/ })).not.toBeInTheDocument();
  expect(screen.getByText('DAX reduces read latency.')).toBeVisible();
  fireEvent.change(search, { target: { value: 'zzzz-unmatched' } });
  expect(screen.getByText('No cards match your filters.')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Reset filters' }));
  expect(search).toHaveValue('');
  expect(screen.getByRole('button', { name: /IAM and STS/ })).toBeInTheDocument();
});

test('filters by section and domain, and can expand and collapse matching cards', () => {
  show();
  fireEvent.click(screen.getByRole('tab', { name: 'Numbers & limits' }));
  expect(screen.getByRole('button', { name: /SQS message size/ })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /IAM and STS/ })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('tab', { name: 'All notes' }));
  fireEvent.mouseDown(screen.getByLabelText('Domain'));
  fireEvent.click(screen.getByRole('option', { name: /Design Secure Architectures/ }));
  expect(screen.getByRole('button', { name: /IAM and STS/ })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /DynamoDB caching/ })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Expand all' }));
  expect(screen.getByRole('button', { name: /IAM and STS/ })).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(screen.getByRole('button', { name: 'Collapse all' }));
  expect(screen.getByRole('button', { name: /IAM and STS/ })).toHaveAttribute('aria-expanded', 'false');
});

test('keeps source links safe and comparison notes readable', () => {
  show();
  fireEvent.click(screen.getByRole('button', { name: /SQS vs SNS/ }));
  expect(screen.getByText('Buffer work.')).toBeInTheDocument();
  const sources = screen.getAllByRole('link', { name: /Official AWS documentation/ });
  sources.forEach((link) => {
    expect(link).toHaveAttribute('href', 'https://docs.aws.amazon.com/');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

test('shows a clear coming-soon state rather than incomplete content for future tracks', () => {
  show('/cheatsheets/jncia');
  expect(screen.getByRole('heading', { name: 'JNCIA-Junos: coming soon' })).toBeInTheDocument();
  expect(screen.queryByRole('textbox', { name: 'Search cheat sheet' })).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Open the AWS/ })).toHaveAttribute('href', '/cheatsheets/aws-saa');
});

test.each(['__proto__', 'constructor', 'toString'])('treats inherited registry key %s as an unknown track', (id) => {
  show(`/cheatsheets/${id}`);
  expect(screen.getByRole('heading', { name: 'Cheat sheet not found' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Open the AWS/ })).toBeInTheDocument();
});

test('handles unknown track routes with a useful recovery link', () => {
  show('/cheatsheets/not-a-track');
  expect(screen.getByRole('heading', { name: 'Cheat sheet not found' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Open the AWS/ })).toBeInTheDocument();
});
