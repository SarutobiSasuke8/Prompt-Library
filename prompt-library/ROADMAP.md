# Roadmap

This file parks ideas that aren't being built yet so they don't get lost.
Don't build anything in here until v1 has real users and real signal.

---

## External review actions — 2026-08-20

From a cynical outside review. These are ship-the-last-mile items, not new scope.

- [x] **Commit and push the pending working-tree changes.** ~850 lines of finished content work from the 2026-08-17 session (mds.js, prompts.js, three persona files, validator update) were sitting uncommitted. The session report recorded `commit_count: 0`. Pushed 2026-08-20.
- [x] **Surface the browser extension.** `extension/` is a real, working MV3 extension (// trigger overlay, contenteditable support, React input handling) and was mentioned nowhere: not in the README, not on the site. Linked from the site nav and root README 2026-08-20; see the "Browser extension" section below for the full v0.5+ scope.
- [ ] **Wire the extension to the library.** It currently stores snippets in `chrome.storage.sync` with zero connection to the 65 prompts in `prompts.js`. Ship a bundled seed set from `prompts.js` plus a "fetch latest" call against the Pages site. This is the most differentiated asset in the repo.
- [ ] **Cut the root README to ~150 lines.** It is 856 lines of narrative for a static site. Move "The bet" / "The endgame" / "Principles" into a single `VISION.md`.
- [ ] **Decide the fate of the fake interactions.** Ratings and comments are localStorage-only (already parked below). Either wire them to the existing `supabase/schema.sql` or remove the stars and comment threads; UI that pretends to persist is worse than no UI.
- [ ] **Resolve `agents.js`.** Two entries advertising a full directory. Fold into `tools.js` and delete `agents.html` / `agent.html`, per the existing build-out note.

---

## Browser extension — v0 shipped, v0.5+ scope

`extension/` (repo root, sibling of this folder) is a real, working MV3
extension, not a future item — the v2/v3 lists below and elsewhere in this
file described it as speculative before 2026-08-20; that was wrong and has
been corrected. What v0 does today: `//`-trigger and `Ctrl+Shift+P` picker
in any textarea/input/contenteditable, add/edit/delete/search items in the
popup, JSON import/export, tested against ChatGPT/claude.ai/Gemini. See
`extension/README.md` for the full v0 feature list and known limitations
(no icons yet, `chrome.storage.sync`'s 100KB cap, load-unpacked only — not
published to the Chrome Web Store).

Its only defect is that it is orphaned from the rest of the project: it
stores items independently in `chrome.storage.sync` with no connection to
the 64 prompts in `prompts.js`, and nothing on the site or in the root
README told anyone it existed until this section.

- [x] Link the extension from the site and root README (2026-08-20).
- [ ] **v0.5 — library sync.** Bundle a seed set exported from `prompts.js`
  at build time, plus a "refresh from prompt-library.xyz" action in the
  options page that re-fetches the current registry. This is the feature
  that turns it from a private snippet tool into an actual extension of
  the library.
- [ ] **v1 — icons + Chrome Web Store listing.** Currently load-unpacked
  only, which caps the audience at people willing to enable developer
  mode.
- [ ] **v1.5 — "Use in →" tier-1 targets from the site itself**, once the
  deep-link work in build-out opportunity #2 below is wired — the
  extension and the site's own "Use in ▾" control should end up sharing
  the same target list.

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

## Build-out opportunities — identified 2026-08-17

A content-addition pass surfaced gaps that are cheap to close and need no
backend. Ordered by ratio of value to effort. Every number below came from
`node scripts/validate-content.js` and the registry files; re-derive before
acting, don't trust the figure here.

### 1. `agents.js` is the thinnest surface on the site

Two entries (`openclaw`, `hermes`) fill three declared groups
(`framework`, `model`, `archetype`) and a full listing page + detail page.
Every other registry carries 10–60 entries. `agents.html` currently
advertises a directory that is nearly empty.

Either populate it to roughly a dozen — the framework and archetype groups
are the obvious holes — or fold agents into `tools.js` as a group and drop
the separate surface. Leaving it as-is is the worst of the three.

### 2. The "Use in X" deep-link feature is 3% wired

`deepLink` breakdown: 57 `none`, 3 `planned`, 2 `supported`. The tool track
in v2.5 assumes this works. Wiring the tier-1 targets (ChatGPT, Claude,
Perplexity, Gemini) is a per-tool URL template plus the length guard already
scoped below — no new architecture. Until then the "Use in ▾" control on
every prompt page is mostly a copy button with extra steps.

### 3. Variable slots exist but almost nothing uses them

4 of 64 prompts contain `{{VARIABLE}}` slots, though `playground.html`
renders them. Retrofitting the flagship prompts in each category is pure
content work and makes the playground meaningfully better. The v2.5 entry
below already specifies the schema — this is execution, not design.

### 4. A third of the library is unreachable by browsing

29 of 64 prompts belong to no collection, and `vibe-coding-generalist-template`
is a repo-type collection with zero prompts. Collections are the only
curated path into the library; search and category chips are the rest.
Two or three new packs (an evaluation/agent-QA pack, a
research-and-analysis pack) would cover most of the orphans.

### 5. Articles are single-type

All 11 articles are `articleType: "methodology"`, and the field exists to
distinguish types. Nothing in the schema is broken; the surface is just
narrower than it was designed for. Candidate second type: a short
case-study or teardown format that references specific prompt ids, which
also links the articles surface to the library surface.

### 6. Content checks now cover schema, not quality

`scripts/validate-content.js` caught nothing when a near-duplicate prompt
was added in this session (a second pre-mortem prompt alongside id 37) —
it validates shape, not overlap. A duplicate-title check landed on
2026-08-17; a tag-overlap or purpose-similarity warning is the natural next
step, and would have flagged all three duplicates found by hand.

### 7. Pages were never syntax-checked before deploy

`md.html` shipped an unescaped quote in its inline script that killed the
detail page for **every** MD doc. The registries validated clean the whole
time, because the data was fine. A parse check over every inline `<script>`
landed on 2026-08-17 and now runs in CI. Worth extending to a smoke check
that each detail page renders a known id — that class of failure is still
invisible to a parser.

### 8. `prompts.js` is 6k+ lines in one file

Not urgent, and splitting it conflicts with "browsable by hand". Noted only
so the next person who notices doesn't rediscover it as a surprise. If it
is ever split, split by category with an index file — and update
`add-prompt.html`, `validate-content.js`, and the CLAUDE.md schema section
together.

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

### Profile organisation & export
Builds on auth + folders. The profile page becomes the user's workspace
across every content type the site carries.

- Profile surfaces four content buckets: **prompts**, **markdown notes**,
  **tools**, **articles**
- Users can create multiple named folders inside each bucket (e.g. a
  "research" folder of prompts separate from a "shipping" folder)
- **Per-folder export as `.md`** — one file bundling every item in that
  folder, suitable for dropping into another vault or sharing
- **Full-profile export as Obsidian-formatted `.md`** — a single archive of
  every folder across every bucket, using Obsidian conventions
  (`[[wikilinks]]`, YAML frontmatter, folder-as-directory) so the export
  drops straight into an Obsidian vault with a working graph

#### Status
- [x] **Export tool shipped (provisional formatting).** `user.html` now has:
  - `export .md` button on every collection (prompt folder) → downloads
    a single markdown file with YAML frontmatter + per-prompt sections.
  - `export profile (.md)` button in the sidebar → downloads a single
    Obsidian-style markdown file bundling authored prompts, authored
    articles, liked prompts, collections, and starred tools, with a
    "prompt bodies" appendix. Cross-references use `[[wikilinks]]`.
  - See `exportCollection` / `exportProfileObsidian` helpers inside the
    `user.html` IIFE. Format is intentionally provisional.
- [ ] **Finalise formatting spec.** User will supply the canonical Markdown
  / Obsidian schema (frontmatter keys, wikilink targets, folder-as-directory
  layout, filename conventions). Current output is a working placeholder
  and should be replaced once that spec lands. Do not invent additional
  schema in the meantime.
- [ ] **Folder-per-bucket data model.** Today only the prompts bucket has
  user-defined folders (localStorage `promptLibrary.collections`). Articles,
  tools, and markdown notes are flat. Adding folders to the other buckets
  needs a schema (likely a single `folders` table keyed by `owner_id`,
  `bucket`, `name`) + per-bucket tables for the tools/notes content the
  user wants to save beyond starring.
- [ ] **Markdown notes bucket.** Not yet built. Requires a `notes` table
  (user-owned, folder-scoped) and a UI for creating/editing. Park until the
  above spec lands.

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
- CLI / API — `npx prompt-lib get token-research | pbcopy`. Unlocks dev
  workflows (Cursor, Claude Code users) that live in a terminal.
- In-site "try this prompt" — run a prompt against a free model without leaving the page.
  Viable paths: (a) Cloudflare Workers AI via a Worker proxy (free tier: 10k neurons/day,
  Llama 3.1 8B etc.) — best balance; (b) WebLLM / Transformers.js running fully in-browser
  (zero cost, 500MB+ first load); (c) Puter.js (user authenticates with Puter, they pay
  their own quota). Do NOT put an API key directly in frontend JS.
- Model benchmarks — same prompt, compared outputs across models
- API — `GET /api/prompts` so other tools can consume the library
- Paid tier — gated pro prompts, private folders, team workspaces

---

## Architecture shift triggers

Don't migrate off static + GitHub Pages until one of these is true:

- 100+ people are using the site weekly
- At least 3 users have asked for the same feature unprompted
- You have an opinion on the data model (backed by observed behaviour, not a guess)
- You're ready to spend on hosting + deal with moderation

Until then, every change stays inside `index.html` / `prompts.js` / `style.css`.
