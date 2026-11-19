export {};
jest.mock('@supabase/supabase-js', () => ({ createClient: jest.fn(() => ({ auth: {} })) }));

const original = { ...process.env };
afterEach(() => { process.env = { ...original }; jest.resetModules(); });
test('missing public configuration disables the client without crashing', () => {
  delete process.env.REACT_APP_SUPABASE_URL;
  delete process.env.REACT_APP_SUPABASE_ANON_KEY;
  const { supabase, tutorConfig } = require('../../lib/supabase');
  expect(supabase).toBeNull();
  expect(tutorConfig).toBeNull();
});
test('configured singleton uses only public configuration and default function URL', () => {
  process.env.REACT_APP_SUPABASE_URL = 'https://example.supabase.co/';
  process.env.REACT_APP_SUPABASE_ANON_KEY = 'public-key';
  const first = require('../../lib/supabase');
  expect(first.supabase).toBe(require('../../lib/supabase').supabase);
  expect(first.tutorConfig).toEqual({ url: 'https://example.supabase.co/functions/v1/study-tutor', anonKey: 'public-key' });
});
