# AGENTS.md — repo root

> Context pointer for Codex sessions opening this repo.

## What this repo contains

This repo is a shared workspace holding two unrelated things:

1. **`prompt-library/`** — the main active project. A static, dark-themed,
   mobile-first web app serving a curated library of production-ready system
   prompts. **All current development lives here.**

2. **Teneo CLI tooling** — `.agents/`, `.Codex/`, `skills-lock.json`. A set
   of Teneo Protocol agent skills and CLI integrations, pre-installed in this
   workspace. Not part of the prompt-library product; leave it alone unless
   the user explicitly asks about it.

## Where to go next

If the user is working on the web app (which is almost always the case),
**read `prompt-library/AGENTS.md`** first. It contains:

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

Development is on **`Codex/prompt-library-app-LQzGJ`**. The GitHub Pages
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
- `.github/workflows/deploy.yml` — Pages deploy (lives at repo root, not under prompt-library/)

## Current state at a glance

- Shipping on `main` via GitHub Pages.
- 54 prompts across all 9 categories. Launch content target met.
- Full v1 surface: prompts / articles / tools / agents / md repo / user
  profile, with standardised bookmarks and localStorage-backed ratings
  + comments on every detail page. Backend wire-up is parked in
  `prompt-library/ROADMAP.md`.
- Don't restate prompt counts or per-category distribution here — they
  go stale. Run the grep in `prompt-library/AGENTS.md` when you need
  the live number.

When in doubt, ask the user — and before adding a library/framework/backend,
check `prompt-library/ROADMAP.md`.

## Session recording — standard practice

Every working session on this repo MUST end with a comprehensive session report written to
`sessions/` at the repo root. This is how future Codex sessions (and
future-you) reconstruct what happened, why, and what's left.

**Rules:**

- One markdown file per session, named `YYYY-MM-DD-session-report-[project-slug].md`.
- **Copy `sessions/Session Report Template.md`** and fill all sections completely.
- YAML frontmatter MUST include comprehensive metadata:
  - `[[project]]`, `[[branch]]`, `[[date]]` as wikilinks
  - `llm:` (provider), `model:` (version), `agents_used:` (all agents that touched it)
  - `agent_instruction_files:` (AGENTS.md, AGENTS.md, CODEX.md, etc.)
  - `status:` one of `active`, `shipped`, `parked`, `blocked`, `aborted`
  - `confidence:` one of `low`, `medium`, `high`
  - `commits:` list of short-SHAs
  - `tags:`, `related_entities:`, `related_systems:`, `related_projects:` — all wikilinked
- Body sections in order: Executive Summary → Context → Work Completed → Decisions → Git Log → Validation → Tasks → Blockers → Handoff
- **Handoff section MUST include "Recommended startup sequence"** for the next agent to quickly resume work.
- Update the Index table in `sessions/README.md` with a new row.
- Use `[[wikilinks]]` extensively for entities, concepts, tools, dates, people.
- Do NOT write session logs anywhere else. Deprecated `logs/sessions/` folder should be ignored.

Sessions live at the repo root so the GitHub Pages deploy (which publishes
only `prompt-library/`) does not expose internal working notes.
