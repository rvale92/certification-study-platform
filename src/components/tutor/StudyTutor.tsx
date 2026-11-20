import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Drawer, Fab, Stack, TextField, Typography } from '@mui/material';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import { boundedHistory, ChatMessage, TutorApiError, TutorUsage } from '../../lib/tutorApi';
import { createTutorClient } from '../../lib/tutorClient';

interface FailedQuestion { prompt: string; history: ChatMessage[] }
export default function StudyTutor({ openSignal = 0 }: { openSignal?: number }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { if (openSignal > 0) setOpen(true); }, [openSignal]);
  const [session, setSession] = useState<Session | null>(null);
  const [initializing, setInitializing] = useState(Boolean(supabase));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [authBusy, setAuthBusy] = useState(false);
  const [sending, setSending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [usage, setUsage] = useState<TutorUsage | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [prompt, setPrompt] = useState('');
  const [failed, setFailed] = useState<FailedQuestion | null>(null);
  const generation = useRef(0);
  // A GET started before a completed prompt must not roll its quota backward.
  const quotaVersion = useRef(0);
  const account = useRef<string | null>(null);
  const requests = useRef(new Set<AbortController>());
  const sendingLock = useRef(false);
  const client = useMemo(() => createTutorClient(session?.access_token ?? null), [session?.access_token]);
  const invalidate = useCallback(() => {
    generation.current++;
    requests.current.forEach(controller => controller.abort());
    requests.current.clear(); sendingLock.current = false;
  }, []);
  const applySession = useCallback((next: Session | null) => {
    invalidate();
    if (account.current !== (next?.user.id ?? null) || !next) {
      setMessages([]); setPrompt(''); setFailed(null); setPassword(''); setNewPassword(''); setShowPasswordForm(false); setShowAuthForm(false);
    }
    account.current = next?.user.id ?? null;
    setSession(next ? { ...next } : null); setUsage(null); setError(''); setNotice('');
    setInitializing(false); setAuthBusy(false); setSending(false); setChecking(false);
  }, [invalidate]);
  useEffect(() => {
    if (!supabase) return;
    let alive = true;
    let receivedEvent = false;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, next) => {
      if (alive) { receivedEvent = true; applySession(next); }
    });
    supabase.auth.getSession().then(({ data, error: authError }) => {
      if (!alive || receivedEvent) return;
      applySession(data.session);
      if (authError) setError(authError.message);
    }).catch(() => { if (alive && !receivedEvent) { setInitializing(false); setError('Unable to restore your session. Please sign in.'); } });
    return () => { alive = false; invalidate(); subscription.unsubscribe(); };
  }, [applySession, invalidate]);

  const refreshUsage = useCallback(async () => {
    const current = generation.current;
    const version = quotaVersion.current;
    const controller = new AbortController(); requests.current.add(controller);
    setChecking(true);
    try {
      const value = await client.getUsage(controller.signal);
      if (current === generation.current && version === quotaVersion.current) { setUsage(value); return value; }
    } catch (err) {
      if (current === generation.current && version === quotaVersion.current) {
        setUsage(null);
        setError(err instanceof TutorApiError && err.status === 401 ? 'Your session is no longer authorized. Sign out and sign in again.' : err instanceof Error ? err.message : 'Unable to check usage.');
      }
    } finally {
      requests.current.delete(controller);
      if (current === generation.current) setChecking(false);
    }
  }, [client]);
  useEffect(() => { if (open && !initializing) void refreshUsage(); }, [open, initializing, session, refreshUsage]);
  useEffect(() => {
    if (!open || !usage) return;
    const remaining = Date.parse(usage.resetsAt) - Date.now();
    if (!Number.isFinite(remaining)) return;
    // A stale server timestamp is retried slowly, never in a tight loop.
    const timer = setTimeout(() => { void refreshUsage(); }, Math.min(2147483647, Math.max(1000, remaining + 50)));
    const onVisible = () => { if (document.visibilityState === 'visible' && Date.now() >= Date.parse(usage.resetsAt)) void refreshUsage(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => { clearTimeout(timer); document.removeEventListener('visibilitychange', onVisible); };
  }, [open, usage, refreshUsage]);

  const authenticate = async (signup: boolean) => {
    if (!supabase) return;
    setAuthBusy(true); setError(''); setNotice('');
    const current = generation.current;
    try {
      const result = signup ? await supabase.auth.signUp({ email, password }) : await supabase.auth.signInWithPassword({ email, password });
      if (current !== generation.current) return;
      if (result.error) throw result.error;
      setPassword('');
      if (result.data.session) applySession(result.data.session);
      else if (signup) setNotice('Check your email to confirm your account, then sign in.');
    } catch (err) { if (current === generation.current) setError(err instanceof Error ? err.message : 'Authentication failed.'); }
    finally { if (current === generation.current) setAuthBusy(false); }
  };
  const savePassword = async () => {
    if (!supabase || !session || newPassword.length < 12 || authBusy) return;
    const userId = session.user.id;
    setAuthBusy(true); setError(''); setNotice('');
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
      if (account.current !== userId) return;
      if (updateError) throw updateError;
      setNewPassword(''); setShowPasswordForm(false);
      setNotice('Password saved. You can sign in with email and password next time.');
    } catch (err) {
      if (account.current === userId) setError(err instanceof Error ? err.message : 'Unable to save password.');
    } finally { if (account.current === userId) setAuthBusy(false); }
  };
  const logout = async () => {
    if (!supabase) return;
    applySession(null);
    const current = generation.current;
    try {
      const result = await supabase.auth.signOut();
      if (result.error && current === generation.current) setError(`${result.error.message} Please try signing out again.`);
    } catch { if (current === generation.current) setError('Sign out failed. Please try again.'); }
  };
  const submit = async (retry?: FailedQuestion) => {
    if (!usage || (!usage.isAdmin && usage.remaining === 0) || sendingLock.current || checking) return;
    const question = retry?.prompt ?? prompt;
    if (!question.trim() || question.length > 4000) return;
    const history = retry?.history ?? boundedHistory(messages);
    const current = generation.current;
    const controller = new AbortController(); requests.current.add(controller);
    sendingLock.current = true; setSending(true); setError(''); setFailed(null); setPrompt('');
    if (!retry) setMessages(previous => [...previous, { role: 'user', content: question }]);
    try {
      const result = await client.sendPrompt(question, history, controller.signal);
      if (current !== generation.current) return;
      quotaVersion.current++;
      setMessages(previous => [...previous, { role: 'assistant', content: result.answer }]); setUsage(result.usage);
    } catch (err) {
      if (current !== generation.current) return;
      quotaVersion.current++;
      const apiError = err instanceof TutorApiError ? err : null;
      if (apiError?.usage) setUsage(apiError.usage);
      setError(apiError?.status === 401 ? 'Your session is no longer authorized. Sign out and sign in again.' : err instanceof Error ? err.message : 'Tutor request failed.');
      if (apiError?.status !== 429 && apiError?.status !== 401) setFailed({ prompt: question, history });
      // Failed upstream calls can still reserve quota. GET never consumes it.
      await refreshUsage();
    } finally {
      requests.current.delete(controller);
      if (current === generation.current) { sendingLock.current = false; setSending(false); }
    }
  };
  const exhausted = usage !== null && !usage.isAdmin && usage.remaining === 0;
  const loginForm = <Box component="form" onSubmit={e => { e.preventDefault(); void authenticate(false); }}><Stack spacing={2}>
    <TextField label="Email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} />
    <TextField label="Password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} />
    <Button type="submit" variant="contained" disabled={authBusy}>Sign in</Button>
    <Button disabled={authBusy || !email || !password} onClick={() => void authenticate(true)}>Create account</Button>
    {authBusy && <CircularProgress size={24} aria-label="Authenticating"/>}
  </Stack></Box>;
  const conversation = <>
    <Stack role="log" aria-label="Tutor conversation" aria-live="polite" spacing={2} sx={{ overflowWrap: 'anywhere' }}>
      {messages.map((message, index) => <Box key={index} sx={{ p: 1.5, borderRadius: 1, bgcolor: message.role === 'user' ? 'action.hover' : 'background.default' }}><Typography variant="subtitle2">{message.role === 'user' ? 'You' : 'Tutor'}</Typography><Typography sx={{ whiteSpace: 'pre-wrap' }}>{message.content}</Typography></Box>)}
    </Stack>
    <Box component="form" onSubmit={e => { e.preventDefault(); void submit(); }}><Stack spacing={1}>
      <TextField label="Your question" multiline minRows={3} maxRows={8} value={prompt} onChange={e => setPrompt(e.target.value)} inputProps={{ maxLength: 4000 }} helperText={`${prompt.length}/4000 characters`} disabled={sending} />
      <Button type="submit" variant="contained" disabled={sending || checking || !usage || exhausted || !prompt.trim() || prompt.length > 4000}>Send question</Button>
      {sending && <CircularProgress size={24} aria-label="Tutor is thinking"/>}
      {failed && <><Typography variant="caption">A failed request may count toward your daily quota. Retrying sends a new request.</Typography><Button disabled={sending || checking || !usage || exhausted} onClick={() => void submit(failed)}>Retry question</Button></>}
    </Stack></Box>
  </>;
  return <>
    <Fab color="primary" aria-label="Open study tutor" onClick={() => setOpen(true)} sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1200 }}>Tutor</Fab>
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)} PaperProps={{ role: 'dialog', 'aria-modal': true, 'aria-labelledby': 'study-tutor-title', sx: { width: { xs: '100%', sm: 440 }, maxWidth: '100vw' } }}>
      <Stack spacing={2} sx={{ p: { xs: 2, sm: 3 }, minHeight: 0 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center"><Typography id="study-tutor-title" variant="h5" component="h2">Study tutor</Typography><Button onClick={() => setOpen(false)}>Close</Button></Stack>
        {!supabase ? <Alert severity="info">Study tutor is not configured for this deployment. Your study materials remain available.</Alert> : initializing ? <CircularProgress aria-label="Restoring session"/> : <>
          {error && <Alert severity="error">{error}</Alert>}
          {notice && <Alert severity="success">{notice}</Alert>}
          {session ? <>
            <Typography variant="body2">{session.user.email}</Typography><Button onClick={() => void logout()}>Sign out</Button>
            <Button onClick={() => setShowPasswordForm(value => !value)}>Set sign-in password</Button>
            {showPasswordForm && <Box component="form" onSubmit={e => { e.preventDefault(); void savePassword(); }}><Stack spacing={1}>
              <TextField label="New sign-in password" type="password" autoComplete="new-password" value={newPassword} onChange={e => setNewPassword(e.target.value)} helperText="Use at least 12 characters. Useful after accepting an invitation." inputProps={{ minLength: 12 }} required />
              <Button type="submit" disabled={authBusy || newPassword.length < 12}>Save password</Button>
            </Stack></Box>}
            {checking && <CircularProgress size={24} aria-label="Checking usage"/>}
            {usage && <Box role="status"><Typography>{usage.isAdmin ? 'Admin · Unlimited prompts' : `${usage.remaining} of ${usage.limit} prompts remaining`}</Typography>{!usage.isAdmin && <Typography variant="caption">Resets {new Date(usage.resetsAt).toLocaleString()}</Typography>}</Box>}
            <Button disabled={checking || sending} onClick={() => { setError(''); void refreshUsage(); }}>Refresh usage</Button>
            {exhausted && <Alert severity="info">Daily limit reached. Your quota will refresh automatically at the reset time.</Alert>}
            {conversation}
          </> : <>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">Guest preview</Typography>
              {!showAuthForm && !exhausted && <Button onClick={() => setShowAuthForm(true)}>Sign in / Create account</Button>}
            </Stack>
            {(showAuthForm || exhausted) && loginForm}
            {checking && <CircularProgress size={24} aria-label="Checking usage"/>}
            {usage && <Box role="status"><Typography>{`${usage.remaining} of ${usage.limit} guest questions remaining today`}</Typography><Typography variant="caption">Guest preview resets {new Date(usage.resetsAt).toLocaleString()}</Typography></Box>}
            {exhausted && <Alert severity="info">Account required to continue. Sign in or create an account to keep asking questions.</Alert>}
            {conversation}
          </>}
        </>}
      </Stack>
    </Drawer>
  </>;
}
