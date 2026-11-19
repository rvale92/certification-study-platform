import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url = process.env.REACT_APP_SUPABASE_URL?.trim().replace(/\/+$/, '');
const anonKey = process.env.REACT_APP_SUPABASE_ANON_KEY?.trim();
export const tutorConfig = url && anonKey ? {
  url: process.env.REACT_APP_TUTOR_FUNCTION_URL?.trim() || `${url}/functions/v1/study-tutor`,
  anonKey,
} : null;

// A missing or malformed deployment configuration must not break the host app.
function initialize(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  try { return createClient(url, anonKey); } catch { return null; }
}
export const supabase = initialize();
