import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the certification study platform', () => {
  render(<App />);
  expect(
    screen.getByText(/Welcome to Certification Study Platform/i)
  ).toBeInTheDocument();
});
