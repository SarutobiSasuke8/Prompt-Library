---
type: "[[Session Reports]]"
status: active
created: "[[2026-10-16]]"
updated: "[[2026-10-16]]"
date: "[[2026-10-16]]"
session_window_start: "[[2026-10-16]]"
session_window_end: "[[2026-10-16]]"
project: "[[prompt-library]]"
repo: "[[Prompt-Library]]"
repo_slug: SarutobiSasuke8/Prompt-Library
repo_url: https://github.com/SarutobiSasuke8/Prompt-Library
branch: "[[claude/prompt-library-checks-20261016]]"
workspace: "C:/Dev/Projects/_wt/prompt-library-checks"
session_kind: build
session_scope: ci-checks + defect-fix
objective: Add dev-only HTML, link, prompt-entry and accessibility checks and run them in CI on pull requests and pushes to main.
operator: "[[SarutobiSasuke8]]"
llm:
  - "[[Claude]]"
model:
  - "[[Claude Opus 5.5]]"
agents_used:
  - "[[Claude Code]]"
agent_instruction_files:
  - "[[CLAUDE.md]]"
  - "[[prompt-library/CLAUDE.md]]"
related_entities:
  - "[[html-validate]]"
  - "[[axe-core]]"
  - "[[Playwright]]"
related_systems:
  - "[[Github]]"
  - "[[GitHub Actions]]"
  - "[[GitHub Pages]]"
related_notes:
  - "[[2026-08-17-session-report-prompt-library]]"
related_projects:
  - "[[prompt-library]]"
tags:
  - session-report
  - ci
  - accessibility
commits: []
confidence: high
---

# 2026-10-16 — Session Report — prompt-library checks

## Executive Summary

Ticket b6-09. The site had a registry validator that ran only before deploy, and no
HTML, link or accessibility checks. This session adds a dev-only `tests/` folder
(its own pinned `package.json`, nothing under `prompt-library/` depends on it) and a
`Checks` workflow that runs on every pull request and on push to `main`.

The new link check found one real defect, fixed here: the prompt rows on
`collections.html` and on the profile page in `user.html` linked to
`index.html#prompt-<id>`, but `index.html` has no hash handling, so they landed
on the top of the library. Both now go to `prompt.html?id=<id>`, the canonical
prompt detail page.

## Context and Operating System

- Read [[CLAUDE.md]] and `prompt-library/CLAUDE.md`.
- Constraint "no npm / package.json" applies to the shipped site. The dev
  dependencies live in `tests/` at the repo root, outside the Pages upload path
  (`./prompt-library`), so the site stays zero-install.
- `deploy.yml` is untouched; its trigger paths do not include `tests/` or the new
  workflow.

## Work Completed

- `tests/check-site.mjs`: html-validate (`html-validate:standard`) over all 16 pages;
  internal link and anchor resolution (static markup, `nav.js`, `footer.js`, inline
  scripts including string-built href prefixes, `?cat=` keys, `sitemap.xml`);
  prompt entries have `title`, `category`, `prompt` and unique integer ids.
- `tests/a11y-smoke.mjs`: axe-core WCAG 2.0/2.1 A and AA on `index.html` at 375px
  and 1280px in headless Chromium, with third-party requests blocked.
- `.github/workflows/checks.yml`: two jobs, actions pinned to full SHAs.
- `.htmlvalidate.json` at the repo root (not shipped).
- Fix: `collections.html` and `user.html` prompt links to `prompt.html?id=`.

## Decisions and Reasoning

- `html-validate:standard` rather than `recommended`: `recommended` adds style
  rules (`void-style`, `no-inline-style`) that would force a restyle of every page.
- `nested-interactive` on the prompt cards is accepted with a scoped exclusion.
  The card is `div[role=button]` with copy and bookmark buttons inside, a documented
  design choice. Changing it is a design call for Alexei.
- Colour contrast is reported, not enforced: the body dot grid stops axe working
  out backgrounds. With it stripped, `--text-faint` (#5a5a5a on #0a0a0a, 2.87:1)
  fails AA on the hero eyebrow and small labels.

## Git and Delivery Log

- Branch `claude/prompt-library-checks-20261016`, one pull request, not merged.

## Validation

- `npm run test:content`, `npm run test:site`, `npm run test:a11y` pass locally.
- Mutation check: a duplicate prompt id, a missing page, a missing anchor and a
  bad `?cat=` were each reported, then reverted.

## Tasks

- [ ] Alexei: decide the card structure (`nested-interactive`).
- [ ] Alexei: decide whether `--text-faint` should meet 4.5:1.

## Blockers and Risks

- None blocking. The a11y job needs a Chromium download in CI (headless shell only).

## Handoff for Future Agents

### Recommended startup sequence

1. Read root `CLAUDE.md`, then `prompt-library/CLAUDE.md`.
2. `cd tests && npm ci && npm test` for content, HTML, links and prompts.
3. `npx playwright install chromium && npm run test:a11y` for the axe smoke.
4. To accept a new a11y finding, add a scoped entry to `KNOWN_EXCLUSIONS` in
   `tests/a11y-smoke.mjs` with a reason; do not disable the rule outright.

## Linked Entities and Notes

- [[prompt-library]], [[GitHub Actions]], [[2026-08-17-session-report-prompt-library]]
