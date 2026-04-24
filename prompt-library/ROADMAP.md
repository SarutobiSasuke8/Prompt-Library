# Roadmap

This file parks ideas that aren't being built yet so they don't get lost.
Don't build anything in here until v1 has real users and real signal.

---

## Parked / revisit soon

Short-term items explicitly deferred during v1 polish. Revisit once the
bookmark + item-page standardisation work lands.

- **Collection bookmarks.** Collections are not part of the item taxonomy
  (see `CLAUDE.md` → Terminology). Decide whether collection cards should
  get a bookmark affordance and, if so, where bookmarked collections
  surface on the profile (My Collections tab vs. Bookmarks panel vs.
  dropped entirely).
- **Export collection as `.md`.** Per-collection "export .md" button
  producing a single markdown file with YAML frontmatter and a section
  per prompt. Originally scoped on the `profile-folders-export` branch.
  Spec for the Markdown/Obsidian format is still TBD — user will supply
  before implementation.
- **Profile `.md` export (full).** Obsidian-style dump of authored
  prompts / articles, bookmarked items, collections, and starred tools
  with `[[wikilinks]]`. Originally scoped on the same branch.
- **Wire ratings + comments to a backend.** The rating stars and comment
  threads on item detail pages (`prompt.html`, `article.html`, `tool.html`,
  `md.html`) are currently **UI-only, persisted per-browser via
  `localStorage`**. They render correctly and behave as if interactive but
  do not sync across users, devices, or sessions after cache clear. When
  v2 backend lands, replace the `pl_rating_<type>_<id>` and
  `pl_comments_<type>_<id>` localStorage reads/writes in `ratings.js`
  (and the equivalent inline code in `prompt.html`) with the real API.
  Keep the same key format so historical local data can be migrated if
  useful.

---

## v1 — static curated library (current)

Ship first. Everything after this depends on having users.

- [x] Dark, mobile-first UI
- [x] Search, category filter, complexity filter
- [x] Modal with full prompt + one-click copy
- [x] In-card copy button
- [x] `add-prompt.html` local capture utility
- [ ] 40+ production-ready prompts across all 9 categories
- [ ] GitHub Pages deploy
- [ ] Portfolio-grade README + CONTRIBUTING

---

## v2 — community / social

Everything below **requires a backend**. That means:

- A database (Supabase / Firebase / Turso / Postgres)
- Auth (email magic link / GitHub OAuth / wallet)
- A hosting tier that runs server code (Vercel / Netlify / Cloudflare Pages + Workers)
- Moderation tooling (reviews and ratings attract spam fast)
- Rate limits, abuse controls, a privacy policy

Do **not** start on these until v1 has users asking for them.

### Likes on prompts
- Anonymous (IP / fingerprint) or auth-gated
- Persisted server-side, shown per-card
- Sort-by-popular added as a filter option

### Basic user profiles
- Auth provider choice: GitHub OAuth is the lowest friction for this audience
- Profile page: handle, avatar, bio, list of submitted prompts, list of liked prompts
- Slug URLs: `/u/<handle>`

### Folders / collections
- Users create named folders of prompts ("my web3 stack", "ship-a-feature kit")
- Private by default, option to publish
- Share a folder via URL
- Import a folder into your own collection

### Ratings / reviews
- 1–5 star ratings with optional short review
- Aggregate score on the card
- Flag / report for spam
- Hide reviews until N received to avoid anchoring
- Trust score per reviewer (to down-weight drive-by 1-stars)

---

## v2.5 — tool track (parallel to social)

Decided 2026-04-23. Runs alongside the social v2 work, not instead of it. The
thesis: prompts are most valuable when they flow quickly into the AI tool the
user actually uses. Everything here reduces the friction from "good prompt"
to "running in Claude / ChatGPT / Cursor / etc."

### Tools page
- [x] `tools.html` — curated list of chat UIs, coding tools, infra
- [x] Nav + footer link site-wide
- [ ] Per-tool `deepLink` status updated as Phase B wires real URLs

### Deep-link "Use in X" buttons
- Per-prompt split button: primary = copy, secondary = pick target tool
- Supported (tier 1): ChatGPT, Perplexity, Claude, Gemini (verify live)
- Copy-only (tier 2): Claude Code, Cursor, Windsurf, Aider, Cline, etc.
- localStorage preference for last-used target tool (no auth needed)
- URL-length guard: >1500 chars falls back to copy with a toast explaining

### Variable slots in prompts
- Optional `variables: [{ key, label, placeholder, options? }]` on prompt
  schema. Backwards-compatible (no variables = current behavior).
- Quick-fill panel opens before "Use →" sends the prompt
- Retrofit 3–5 flagship prompts first, document pattern in CONTRIBUTING.md

### Direct-link prompt URLs
- `prompt-library.xyz/p/42` opens the library with that prompt's modal open
- Shareable links make the library quotable in docs, chats, tweets

### Personal collection (requires auth from social track)
- "Save to my library" button → per-user tagged list, Supabase-backed
- `/me` or tab in profile page listing saved prompts, reorderable
- Replaces the "follow/feed" social idea — individual utility over network

---

## v3 — possible further directions

Speculative. Park them; don't plan yet.

- Prompt versioning — track edits, diff history, let users "fork" a prompt
- Prompt chaining builder — visual flow to stitch prompts together
- Browser extension — right-click any input on Claude/ChatGPT/Gemini to paste
  a prompt from your library without switching tabs. The "killer app" version
  of the tool track; do once deep-links + variable slots have usage signal.
- CLI / API — `npx prompt-lib get token-research | pbcopy`. Unlocks dev
  workflows (Cursor, Claude Code users) that live in a terminal.
- In-site "try this prompt" — run a prompt against a free model without leaving the page.
  Viable paths: (a) Cloudflare Workers AI via a Worker proxy (free tier: 10k neurons/day,
  Llama 3.1 8B etc.) — best balance; (b) WebLLM / Transformers.js running fully in-browser
  (zero cost, 500MB+ first load); (c) Puter.js (user authenticates with Puter, they pay
  their own quota). Do NOT put an API key directly in frontend JS.
- Model benchmarks — same prompt, compared outputs across models
- API — `GET /api/prompts` so other tools can consume the library
- Browser extension — copy any prompt from the library into ChatGPT/Claude
- Paid tier — gated pro prompts, private folders, team workspaces

---

## Architecture shift triggers

Don't migrate off static + GitHub Pages until one of these is true:

- 100+ people are using the site weekly
- At least 3 users have asked for the same feature unprompted
- You have an opinion on the data model (backed by observed behaviour, not a guess)
- You're ready to spend on hosting + deal with moderation

Until then, every change stays inside `index.html` / `prompts.js` / `style.css`.
