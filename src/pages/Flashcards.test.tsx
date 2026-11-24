import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Flashcards from './Flashcards';

beforeEach(() => {
  window.localStorage.clear();
});

test('rating buttons are disabled until the card is flipped', () => {
  render(<Flashcards />);

  expect(screen.getByRole('button', { name: /1 · Again/ })).toBeDisabled();
  expect(screen.getByRole('button', { name: /4 · Easy/ })).toBeDisabled();

  fireEvent.click(screen.getByRole('button', { name: /Flashcard question/ }));

  expect(screen.getByRole('button', { name: /1 · Again/ })).toBeEnabled();
  expect(screen.getByRole('button', { name: /4 · Easy/ })).toBeEnabled();
});

test('keyboard rating keys do not persist a rating before the card is flipped', () => {
  render(<Flashcards />);
  const readSrs = () =>
    JSON.parse(window.localStorage.getItem('certification-study:flashcard-srs') || '{}');

  fireEvent.keyDown(window, { key: '4' });
  expect(Object.keys(readSrs())).toHaveLength(0);

  fireEvent.click(screen.getByRole('button', { name: /Flashcard question/ }));
  fireEvent.keyDown(window, { key: '4' });
  expect(Object.keys(readSrs())).toHaveLength(1);
});
