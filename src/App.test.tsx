import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/tutor/StudyTutor', () => ({
  __esModule: true,
  default: () => <button aria-label="Open study tutor">AI study tutor</button>,
}));

test('renders certification study homepage', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /welcome to certification study platform/i })).toBeInTheDocument();
});

test('mounts the authenticated study tutor entry point', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: 'Open study tutor' })).toBeInTheDocument();
});
