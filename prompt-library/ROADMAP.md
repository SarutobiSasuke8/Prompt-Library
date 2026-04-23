# Roadmap

This file parks ideas that aren't being built yet so they don't get lost.
Don't build anything in here until v1 has real users and real signal.

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

## v3 — possible further directions

Speculative. Park them; don't plan yet.

- Prompt versioning — track edits, diff history, let users "fork" a prompt
- Prompt chaining builder — visual flow to stitch prompts together
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
