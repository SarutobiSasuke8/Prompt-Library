# CLAUDE.md — repo root

> Context pointer for Claude Code sessions opening this repo.

## What this repo contains

This repo is a shared workspace holding two unrelated things:

1. **`prompt-library/`** — the main active project. A static, dark-themed,
   mobile-first web app serving a curated library of production-ready system
   prompts. **All current development lives here.**

2. **Teneo CLI tooling** — `.agents/`, `.claude/`, `skills-lock.json`. A set
   of Teneo Protocol agent skills and CLI integrations, pre-installed in this
   workspace. Not part of the prompt-library product; leave it alone unless
   the user explicitly asks about it.

## Where to go next

If the user is working on the web app (which is almost always the case),
**read `prompt-library/CLAUDE.md`** first. It contains:

- Architectural constraints (no frameworks / no npm / no build) + rationale
- File layout and per-file responsibilities
- Full prompt schema and the 9 launch categories
- Design tokens (colours, typography, spacing)
- UI features implemented and keyboard shortcuts
- How to add a prompt (form or by hand) and how to add a category (one line)
- Deploy flow (GitHub Actions → Pages)
- Anti-patterns list — things not to do
- Testing checklist
- Session history of what's already been built

## Active branch

Development is on **`claude/prompt-library-app-LQzGJ`**. The GitHub Pages
deploy workflow triggers on pushes to `main`, so this branch needs to be
merged before the site goes live.

## Quick orientation

- `prompt-library/index.html`  — app shell + runtime JS
- `prompt-library/prompts.js`  — data (CATEGORIES + PROMPTS)
- `prompt-library/style.css`   — dark theme, mobile-first
- `prompt-library/add-prompt.html` — local capture utility (NOT linked from site)
- `prompt-library/README.md`   — public project doc
- `prompt-library/CONTRIBUTING.md` — schema + quality bar + PR flow
- `prompt-library/ROADMAP.md`  — v2 backend features parked here
- `prompt-library/.github/workflows/deploy.yml` — Pages deploy

## Current state at a glance

- 4 commits on the working branch (scaffold → framework → docs+deploy → CLAUDE+README)
- 7 web3 prompts seeded; categories 2–9 empty; 33+ prompts still needed
- UI + capture utility + deploy workflow + docs all done
- Waiting on: (a) merge to `main`, (b) one-time GitHub Pages UI toggle,
  (c) fill remaining 8 categories, (d) drop a real screenshot at
  `prompt-library/screenshot.png`

When in doubt, ask the user — and before adding a library/framework/backend,
check `prompt-library/ROADMAP.md`.
