import { render, screen } from '@testing-library/react';
import TutorAvatar from './TutorAvatar';

test('exposes the requested avatar state', () => {
  const { rerender } = render(<TutorAvatar state="idle" />);
  expect(screen.getByTestId('tutor-avatar')).toHaveAttribute('data-state', 'idle');
  rerender(<TutorAvatar state="thinking" />);
  expect(screen.getByTestId('tutor-avatar')).toHaveAttribute('data-state', 'thinking');
  rerender(<TutorAvatar state="speaking" />);
  expect(screen.getByTestId('tutor-avatar')).toHaveAttribute('data-state', 'speaking');
});

test('animates the mouth only while speaking', () => {
  const { rerender } = render(<TutorAvatar state="idle" />);
  expect(screen.getByTestId('tutor-avatar-mouth')).toHaveAttribute('data-speaking', 'false');
  rerender(<TutorAvatar state="speaking" />);
  expect(screen.getByTestId('tutor-avatar-mouth')).toHaveAttribute('data-speaking', 'true');
});
