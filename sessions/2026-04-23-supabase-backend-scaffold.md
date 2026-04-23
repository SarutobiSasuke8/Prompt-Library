---
id: 2026-04-23-supabase-backend-scaffold
date: [[2026-04-23]]
started: 2026-04-23T19:00:00+0100
ended: 2026-04-23T20:15:00+0100
project: [[prompt-library]]
repo: [[SarutobiSasuke8/Prompt-Library]]
branch: [[main]]
base: [[main]]
agent: Claude Code
llms_used:
  - [[Claude Opus 4.7]]
  - [[Claude Sonnet 4.6]]
model_ids:
  - claude-opus-4-7
  - claude-sonnet-4-6
provider: [[Anthropic]]
family: [[Claude 4]]
environment: win32, Windows 11, bash
status: active
complexity: intermediate
tags:
  - backend
  - supabase
  - auth
  - user-management
  - scaffolding
  - planning
  - sessions
  - v2
scope:
  - [[prompt-library/supabase/schema.sql]]
  - [[prompt-library/supabase.js]]
  - [[prompt-library/privacy.html]]
  - [[prompt-library/ROADMAP.md]]
touches:
  - prompt-library/supabase/schema.sql
  - prompt-library/supabase.js
  - prompt-library/privacy.html
  - prompt-library/ROADMAP.md
  - prompt-library/index.html
  - prompt-library/learn.html
  - prompt-library/screenshot.png
untouched:
  - prompt-library/prompts.js
  - prompt-library/CLAUDE.md
  - prompt-library/CONTRIBUTING.md
  - prompt-library/README.md
  - prompt-library/add-prompt.html
  - .github/workflows/deploy.yml
commits:
  - 2292fa5   # Add screenshot, privacy page, Supabase integration files, nav updates
supabase_project:
  url: https://gclhidxujbifiuapypcs.supabase.co
  org: SarutobiSasuke8's Org (free tier)
  schema_status: applied
  auth_providers_enabled: pending
related:
  - [[2026-04-22-frontend-visual-refresh]]
  - [[ROADMAP]]
  - [[CLAUDE.md]]
concepts:
  - [[v2]]
  - [[supabase]]
  - [[row-level-security]]
  - [[github-oauth]]
  - [[magic-link-auth]]
  - [[handle-blocklist]]
  - [[anon-likes]]
  - [[submission-approval]]
  - [[admin-dashboard]]
  - [[puter.js]]
  - [[cloudflare-workers-ai]]
  - [[webllm]]
links:
  supabase_dashboard: https://supabase.com/dashboard/project/gclhidxujbifiuapypcs
  schema_file: prompt-library/supabase/schema.sql
  client_file: prompt-library/supabase.js
  privacy_page: prompt-library/privacy.html
---

# 2026-04-23 — Supabase backend scaffold (v2 user management)

## Context

Earlier today a parallel [[Claude Sonnet 4.6]] thread introduced the idea of
adding a [[user management]] system to the static site — driven by the user's
desire to replace the existing "contribute → GitHub" link with an in-site
submission flow.

This [[Claude Opus 4.7]] session took that idea, evaluated it against the
[[ROADMAP]]'s "wait for users" constraint, and reframed it as a deliberate
**experiment**. The user accepted that framing: they're not optimizing for
shipped product value, they want to learn what it takes to add a real backend
to a previously-static site.

Once the scope shifted from "should we?" to "how do we?", the conversation
produced a 5-phase plan (auth → likes → profiles → submissions → DB rendering),
locked in the five open design decisions, and scaffolded Phase 1 foundations.

## Decisions

### Product / scope

- **Stance on user management:** build it, as an experiment. Explicitly
  acknowledged we're violating the [[ROADMAP]]'s "no backend until 100 weekly
  users" rule; that rule exists to prevent *accidental* scope bloat, which
  this isn't.
- **Auth providers:** both [[GitHub OAuth]] (lowest-friction for the target
  audience) and [[email magic link]] (no OAuth app needed, free in Supabase).
- **Anonymous likes:** allowed, gated behind a server-side `config` flag
  (`allow_anon_likes`). Kill switch means we can turn anon off without a
  code deploy if abuse appears.
- **Submissions:** approval required for v1 of the experiment. Flag
  `require_approval` makes this toggleable. Recommendation: keep approval on
  for the first ~20 submissions to set the [[CONTRIBUTING|quality bar]], then
  reconsider. User is tempted to open-publish later — deferred.
- **Profiles:** handle + avatar + bio + submitted prompts (public) +
  liked prompts (private, RLS-enforced owner-only). [[GitHub handle]] linked
  via OAuth metadata; [[X handle]] stored as free-text (X API costs $100/mo
  minimum, not worth it for an experiment).
- **Moderation UI:** in-site admin page gated by `profiles.is_admin = true`,
  invisible to non-admins. Chosen over SQL-only because "it's an experiment."

### Architecture

- **Source of truth for prompts:** shifts from `prompts.js` to the `prompts`
  table in Postgres once submissions go live (Phase 4/5). `prompts.js` stays
  as a baked-in cache + fallback.
- **CLAUDE.md constraint relaxed:** the "no external JS at runtime" rule
  breaks the moment `@supabase/supabase-js` loads from esm.sh. Needs a
  documented exception in [[prompt-library/CLAUDE.md]] before Phase 2.
- **Anon key is safe to commit:** `sb_publishable_...` is the new-format
  public client key; all security enforced via [[Row-Level Security]]
  policies, not key secrecy.

### Timelines

- Planning honesty: original "5–6 days of focused work" was caveated as
  calendar-days-if-full-time. Real estimate: 2–3 weeks evenings/weekends,
  shipped in slices (auth+likes → sit with it → submissions → admin).

### Out-of-scope parked to [[ROADMAP]]

- **In-site AI querying** — user asked about adding a "try this prompt"
  feature. Evaluated three viable paths: (a) [[Cloudflare Workers AI]] via a
  Worker proxy, (b) [[WebLLM]] / Transformers.js in-browser, (c) [[Puter.js]]
  shifting cost to end users. Flagged the **API-key-leak trap** (never
  embed keys in client JS). Parked under v3 in ROADMAP; not building this
  alongside auth.

### Branding (mid-session digression)

- Domain `prompt-library.xyz` evaluated at €1.70/yr (renewal €16.55/yr).
  Verdict: fine for a side-project / dev-tool brand, weaker for a consumer
  product. User framed the project as a side-project, so purchase is
  no-risk. Not purchased yet.

## Changes

### Files created

- [[prompt-library/supabase/schema.sql]] — 252 lines. Creates 6 tables
  (`config`, `profiles`, `reserved_handles`, `prompts`, `submissions`,
  `likes`), an enum (`submission_status`), 2 helper functions
  (`handle_new_user`, `is_admin`, `validate_handle`), 1 trigger
  (`on_auth_user_created`), [[Row-Level Security]] policies for every table,
  and a seed of 20 reserved handles. Idempotent — safe to re-run.
- [[prompt-library/supabase.js]] — 218 lines. [[Supabase JS SDK]] client
  initialization, auth state management with subscriber pattern, profile
  caching, sign-in helpers (GitHub + email magic link), handle
  validation/availability/setter, profile updater, likes (user + anonymous
  via SHA-256 fingerprint), submission + admin APIs. Exposes `window.PL`
  for use from existing non-module inline scripts.
- [[prompt-library/privacy.html]] — minimal privacy policy required before
  email auth can be enabled (stores email addresses). Styled to match the
  existing dark theme. Lists data collected, what's not done, contact path.

### Files modified

- [[prompt-library/ROADMAP.md]] — added "In-site 'try this prompt'" entry
  under v3 with the three evaluated paths and the API-key-leak warning.
- [[prompt-library/index.html]] — nav update (privacy link).
- [[prompt-library/learn.html]] — nav update (privacy link).

### Supabase side

- Project `gclhidxujbifiuapypcs` on free tier, SarutobiSasuke8's Org.
- Publishable (anon) key captured and pasted into `supabase.js`.
- Schema applied via SQL Editor — "Success. No rows returned."
- Auth providers **not yet enabled** — blocks Phase 1 UI wiring.

## Follow-ups (next session)

Listed in priority order. Anything before Phase 1 UI requires user action
outside this session.

### Blocking (user must do)

1. **Enable Email provider** in Supabase → Authentication → Providers.
2. **Create [[GitHub OAuth app]]** (github.com → Settings → Developer
   settings → OAuth Apps → New), paste Client ID + Secret into Supabase's
   GitHub provider.
3. **Self-promote to admin** after first login, via SQL Editor:
   ```sql
   update public.profiles set is_admin = true
   where id = (select id from auth.users where email = 'thecrypticgamingguild@gmail.com');
   ```

### Phase 1 — Auth + likes (next Opus session)

1. Wire login/logout UI into `index.html` header — "Sign in" button →
   provider-pick modal (GitHub / email). Load `supabase.js` as
   `<script type="module">`.
2. Build first-login [[handle picker]] modal — validates shape, checks
   availability, blocks on [[reserved-handles]].
3. Wire heart-icon + like count onto each prompt card. Anon likes via
   `anonIpHash()`; user likes via `toggleLike()`.
4. Update [[prompt-library/CLAUDE.md]] — relax the "no external JS"
   constraint with a documented exception for Supabase, point to the new
   `supabase.js` and `supabase/schema.sql` as v2 entry points.

### Phase 2+ — reference only, do not build yet

- [[profile page]] with tabs (bio / submitted / liked-private-view)
- `contribute.html` submission form (replaces current GitHub-link behavior)
- `admin.html` moderation dashboard
- DB-rendered prompts with `prompts.js` fallback
- Rate-limit debugging (RLS insert policy on `submissions`)

### Housekeeping

- **Duplicate session logs** — this repo has two session-report locations:
  `sessions/` (current template, Obsidian-ready) and `logs/sessions/`
  (alternate format from an earlier Sonnet session). Recommend
  consolidating to `sessions/` and archiving `logs/sessions/`.
- **Repo-level standard practice** — root [[CLAUDE.md]] should note the
  session-recording convention so future sessions (Opus, Sonnet, or other)
  write to `sessions/` from the start. Update in this session.

## Notes / honest signals

- [[Row-Level Security]] is where most real-world Supabase bugs live.
  Policies written here have NOT been tested against actual auth requests
  yet — they compile but may behave unexpectedly (e.g. the rate-limit
  subquery in `submissions_insert`). Budget 1 focused day for RLS
  debugging once UI is wired.
- The [[Supabase JS SDK]] loaded from esm.sh is ~40KB gzipped. First real
  runtime dependency on the site. Acceptable trade but worth logging.
- User expressed in-the-moment enthusiasm for expanding scope (AI
  querying, profiles-right-now, domain purchase). Session held the scope
  to Phase 1 foundations; follow-ups capture rather than build everything.
