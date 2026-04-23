// =========================================================================
// supabase.js — client init + auth/data helpers for prompt-library v2
//
// Loaded as a <script type="module"> from index.html. Exposes window.PL
// so existing inline scripts can call into it without a refactor.
//
// SECURITY: the anon key below is *public* by design. All access control
// happens via Row-Level Security policies in supabase/schema.sql. Never
// put the service-role key in this file.
// =========================================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// -------------------------------------------------------------------------
// Config — fill these in after creating the Supabase project
// -------------------------------------------------------------------------
const SUPABASE_URL      = 'https://gclhidxujbifiuapypcs.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_3A46MTft4gPNBpcegWRbAQ_FGotQdOg';

export const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});

// -------------------------------------------------------------------------
// Auth state + profile cache
// -------------------------------------------------------------------------
let currentUser    = null;
let currentProfile = null;
const listeners    = new Set();

function notify() { for (const fn of listeners) fn({ user: currentUser, profile: currentProfile }); }

async function loadProfile(userId) {
  if (!userId) { currentProfile = null; return; }
  const { data } = await sb.from('profiles').select('*').eq('id', userId).maybeSingle();
  currentProfile = data ?? null;
}

export function onAuth(fn) { listeners.add(fn); return () => listeners.delete(fn); }
export function getUser()    { return currentUser; }
export function getProfile() { return currentProfile; }

sb.auth.getSession().then(async ({ data }) => {
  currentUser = data.session?.user ?? null;
  await loadProfile(currentUser?.id);
  notify();
});

sb.auth.onAuthStateChange(async (_event, session) => {
  currentUser = session?.user ?? null;
  await loadProfile(currentUser?.id);
  notify();
});

// -------------------------------------------------------------------------
// Sign in / out
// -------------------------------------------------------------------------
export async function signInWithGitHub() {
  return sb.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo: window.location.origin + window.location.pathname }
  });
}

export async function signInWithEmail(email) {
  return sb.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: window.location.origin + window.location.pathname }
  });
}

export async function signOut() { return sb.auth.signOut(); }

// -------------------------------------------------------------------------
// Profile / handle
// -------------------------------------------------------------------------
const HANDLE_RE = /^[a-z0-9_-]{3,24}$/;

export function validateHandleShape(h) {
  if (!h) return 'Handle is required';
  if (!HANDLE_RE.test(h)) return 'Use 3–24 chars: a–z, 0–9, _, -';
  return null;
}

export async function isHandleAvailable(h) {
  const lower = h.toLowerCase();
  const [{ data: reserved }, { data: taken }] = await Promise.all([
    sb.from('reserved_handles').select('handle').eq('handle', lower).maybeSingle(),
    sb.from('profiles').select('id').eq('handle', lower).maybeSingle()
  ]);
  if (reserved) return 'That handle is reserved';
  if (taken)    return 'That handle is taken';
  return null;
}

export async function setHandle(h) {
  if (!currentUser) throw new Error('not signed in');
  const lower = h.toLowerCase();
  const { error } = await sb.from('profiles').update({ handle: lower }).eq('id', currentUser.id);
  if (error) throw error;
  await loadProfile(currentUser.id);
  notify();
}

export async function updateProfile(fields) {
  if (!currentUser) throw new Error('not signed in');
  const allowed = ['bio', 'x_handle', 'avatar_url'];
  const patch = {};
  for (const k of allowed) if (k in fields) patch[k] = fields[k];
  const { error } = await sb.from('profiles').update(patch).eq('id', currentUser.id);
  if (error) throw error;
  await loadProfile(currentUser.id);
  notify();
}

// -------------------------------------------------------------------------
// Likes
// -------------------------------------------------------------------------
async function anonIpHash() {
  // Client-side "fingerprint" — not secure, just a best-effort dedup key
  // for anonymous likes. Server-side enforcement is via unique index.
  const raw = (navigator.userAgent || '') + '|' + (navigator.language || '') + '|' + screen.width + 'x' + screen.height;
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function getLikeCounts() {
  const { data } = await sb.from('likes').select('prompt_id');
  const counts = {};
  for (const row of data ?? []) counts[row.prompt_id] = (counts[row.prompt_id] ?? 0) + 1;
  return counts;
}

export async function getMyLikes() {
  if (!currentUser) return new Set();
  const { data } = await sb.from('likes').select('prompt_id').eq('user_id', currentUser.id);
  return new Set((data ?? []).map(r => r.prompt_id));
}

export async function toggleLike(promptId) {
  if (currentUser) {
    const { data: existing } = await sb.from('likes')
      .select('id').eq('user_id', currentUser.id).eq('prompt_id', promptId).maybeSingle();
    if (existing) {
      await sb.from('likes').delete().eq('id', existing.id);
      return false;
    }
    await sb.from('likes').insert({ user_id: currentUser.id, prompt_id: promptId });
    return true;
  }
  const ip_hash = await anonIpHash();
  const { error } = await sb.from('likes').insert({ ip_hash, prompt_id: promptId });
  if (error && error.code !== '23505') throw error;
  return !error;
}

// -------------------------------------------------------------------------
// Submissions
// -------------------------------------------------------------------------
export async function submitPrompt(payload) {
  if (!currentUser) throw new Error('not signed in');
  return sb.from('submissions').insert({ submitter_id: currentUser.id, payload });
}

export async function listMySubmissions() {
  if (!currentUser) return [];
  const { data } = await sb.from('submissions')
    .select('*').eq('submitter_id', currentUser.id)
    .order('created_at', { ascending: false });
  return data ?? [];
}

// -------------------------------------------------------------------------
// Admin
// -------------------------------------------------------------------------
export async function listPendingSubmissions() {
  const { data } = await sb.from('submissions')
    .select('*, submitter:profiles!submissions_submitter_id_fkey(handle,avatar_url)')
    .eq('status', 'pending').order('created_at', { ascending: true });
  return data ?? [];
}

export async function approveSubmission(id) {
  const { data: sub, error } = await sb.from('submissions').select('*').eq('id', id).single();
  if (error) throw error;
  const p = sub.payload;
  const { data: maxRow } = await sb.from('prompts').select('id').order('id', { ascending: false }).limit(1).maybeSingle();
  const nextId = (maxRow?.id ?? 0) + 1;
  const { error: insErr } = await sb.from('prompts').insert({
    id: nextId,
    title: p.title, category: p.category, complexity: p.complexity,
    purpose: p.purpose, tags: p.tags ?? [], models: p.models ?? [],
    temperature: p.temperature ?? null, prompt: p.prompt,
    chaining: p.chaining ?? '', notes: p.notes ?? '',
    submitted_by: sub.submitter_id
  });
  if (insErr) throw insErr;
  await sb.from('submissions').update({
    status: 'approved', reviewed_by: currentUser.id, reviewed_at: new Date().toISOString()
  }).eq('id', id);
}

export async function rejectSubmission(id, note) {
  await sb.from('submissions').update({
    status: 'rejected', review_note: note ?? null,
    reviewed_by: currentUser.id, reviewed_at: new Date().toISOString()
  }).eq('id', id);
}

// Expose on window so non-module inline scripts in index.html can use it
window.PL = {
  sb, onAuth, getUser, getProfile,
  signInWithGitHub, signInWithEmail, signOut,
  validateHandleShape, isHandleAvailable, setHandle, updateProfile,
  getLikeCounts, getMyLikes, toggleLike,
  submitPrompt, listMySubmissions,
  listPendingSubmissions, approveSubmission, rejectSubmission
};
