import { act, fireEvent, render, screen } from '@testing-library/react';
import { useSpeechSynthesis } from './useSpeechSynthesis';

function Harness({ text, onEnd }: { text: string; onEnd?: () => void }) {
  const { supported, speaking, speak, stop } = useSpeechSynthesis();
  return (
    <div>
      <span data-testid="supported">{String(supported)}</span>
      <span data-testid="speaking">{String(speaking)}</span>
      <button onClick={() => speak(text, onEnd)}>Speak</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}

function installSpeechMock() {
  let current: any = null;
  const synth = { speak: jest.fn((utterance: any) => { current = utterance; }), cancel: jest.fn() };
  class MockUtterance {
    text: string;
    onstart: (() => void) | null = null;
    onend: (() => void) | null = null;
    onerror: (() => void) | null = null;
    onboundary: (() => void) | null = null;
    constructor(text: string) { this.text = text; }
  }
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: synth });
  (globalThis as any).SpeechSynthesisUtterance = MockUtterance;
  return { synth, getCurrent: () => current };
}

afterEach(() => {
  delete (window as any).speechSynthesis;
  delete (globalThis as any).SpeechSynthesisUtterance;
});

test('reports unsupported and no-ops when speechSynthesis is missing', () => {
  render(<Harness text="Hello" />);
  expect(screen.getByTestId('supported')).toHaveTextContent('false');
  fireEvent.click(screen.getByRole('button', { name: 'Speak' }));
  expect(screen.getByTestId('speaking')).toHaveTextContent('false');
});

test('speaks text, flips speaking on start, and off on end', () => {
  const { synth, getCurrent } = installSpeechMock();
  render(<Harness text="Hello world" />);
  expect(screen.getByTestId('supported')).toHaveTextContent('true');
  fireEvent.click(screen.getByRole('button', { name: 'Speak' }));
  expect(synth.speak).toHaveBeenCalledTimes(1);
  const utterance = getCurrent();
  expect(utterance.text).toBe('Hello world');
  expect(typeof utterance.onstart).toBe('function');
  expect(typeof utterance.onend).toBe('function');
  expect(typeof utterance.onerror).toBe('function');
  expect(typeof utterance.onboundary).toBe('function');
  act(() => utterance.onstart());
  expect(screen.getByTestId('speaking')).toHaveTextContent('true');
  act(() => utterance.onend());
  expect(screen.getByTestId('speaking')).toHaveTextContent('false');
});

test('stop cancels and flips speaking off', () => {
  const { synth, getCurrent } = installSpeechMock();
  render(<Harness text="Hello" />);
  fireEvent.click(screen.getByRole('button', { name: 'Speak' }));
  act(() => getCurrent().onstart());
  fireEvent.click(screen.getByRole('button', { name: 'Stop' }));
  expect(synth.cancel).toHaveBeenCalled();
  expect(screen.getByTestId('speaking')).toHaveTextContent('false');
});

test('cancels speech on unmount', () => {
  const { synth } = installSpeechMock();
  const { unmount } = render(<Harness text="Hello" />);
  fireEvent.click(screen.getByRole('button', { name: 'Speak' }));
  unmount();
  expect(synth.cancel).toHaveBeenCalled();
});

test('fires onEnd when speech errors', () => {
  const onEnd = jest.fn();
  const { getCurrent } = installSpeechMock();
  render(<Harness text="Hello" onEnd={onEnd} />);
  fireEvent.click(screen.getByRole('button', { name: 'Speak' }));
  act(() => getCurrent().onerror());
  expect(onEnd).toHaveBeenCalled();
  expect(screen.getByTestId('speaking')).toHaveTextContent('false');
});
