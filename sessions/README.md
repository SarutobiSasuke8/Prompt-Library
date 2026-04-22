---
kind: index
project: [[prompt-library]]
repo: [[sarutobisasuke8/testing]]
created: 2026-04-22
updated: 2026-04-22
tags: [sessions, index, log, moc]
---

# Sessions — MOC

> Map of content for every Claude Code working session on this repo.
> Each session has its own note with YAML frontmatter and an Obsidian-style
> wiki-linked write-up. Link freely with `[[ ]]`.

## How this system works

- One `.md` per session, named `YYYY-MM-DD-kebab-name.md`.
- Every session file begins with [[YAML frontmatter]] that captures
  machine-readable metadata (date, agent, branch, commits, files, status).
- The body is a human-readable log with headings, decisions, and
  `[[wikilinks]]` to [[concepts]], [[files]], [[branches]], and other
  [[sessions]]. This makes the folder graph-ready in Obsidian.
- This `README.md` is the root [[MOC]] (Map of Content). Update the
  **Index** table below whenever a new session file lands.
- These notes live at the **repo root** (`sessions/`), not inside
  `prompt-library/`, so the [[GitHub Pages deploy]] does not publish them.

## Conventions

- Dates in frontmatter are ISO-8601 (`YYYY-MM-DD`).
- `status:` is one of `active`, `shipped`, `parked`, `aborted`.
- `tags:` are lowercase, kebab-case, plural where it makes sense.
- Use `[[wikilinks]]` freely — they don't need to resolve in GitHub's
  renderer. They're for [[Obsidian]] graph navigation and future-you.
- Prefer `[[double-brackets]]` over inline paths. Paths rot; concepts don't.
- When referencing code locations, use `path:line` (e.g. `prompt-library/index.html:254`).
- When referencing commits, short-SHA the commit (e.g. `6656f1e`).

## Canonical concepts (link anchors)

These are the recurring `[[ ]]` targets across session notes. They are
virtual — most don't have their own file yet. Create files when a concept
deserves its own note.

- [[prompt-library]] — the product
- [[design-system]] — tokens, typography, aesthetic
- [[data-schema]] — the `prompts.js` object shape
- [[CATEGORIES]] — the 9 launch categories
- [[PROMPTS]] — the prompt array
- [[deploy-workflow]] — `.github/workflows/deploy.yml`
- [[GitHub Pages deploy]] — the live site pipeline
- [[add-prompt.html]] — the local capture utility
- [[Teneo CLI]] — unrelated tooling also in this repo
- [[ROADMAP]] — v2 parking lot
- [[CONTRIBUTING]] — schema + quality bar
- [[CLAUDE.md]] — project rules for Claude
- [[Obsidian]] — the intended reader for these notes
- [[YAML frontmatter]] — the metadata block
- [[MOC]] — Map of Content pattern
- [[wikilinks]] — `[[ ]]` linking
- [[branches]] — git branches in play

## Index

| Date       | Session                                                                            | Branch                                     | Status  |
|------------|------------------------------------------------------------------------------------|--------------------------------------------|---------|
| 2026-04-22 | [[2026-04-22-frontend-visual-refresh\|frontend visual refresh + sessions system]]  | `claude/create-frontend-html-bnbEu`        | shipped |

## Past work — reconstructed from git log

Earlier work happened before this session system existed. Captured here as
stub links so the graph isn't missing history. Full notes can be backfilled
on request.

| Approx date | Work                                                        | Commit     | Status    |
|-------------|-------------------------------------------------------------|------------|-----------|
| pre-2026-04 | [[phase-1-scaffold\|Phase 1 — scaffold folder structure]]   | `a43f98b`  | shipped   |
| pre-2026-04 | [[phase-2-web3-prompts\|Phase 2 — 7 web3 prompts]]          | `17fc80b`  | shipped   |
| pre-2026-04 | [[phase-3-4-frontend\|Phase 3+4 — frontend + capture util]] | `6656f1e`  | shipped   |
| pre-2026-04 | [[phase-5-deploy-docs\|Phase 5 — deploy workflow + docs]]   | `a5b6550`  | shipped   |
| pre-2026-04 | [[deploy-workflow-relocation]]                              | `258e6a2`  | shipped   |
| pre-2026-04 | [[repo-root-docs]]                                          | `ceb2b7f`  | shipped   |
| pre-2026-04 | [[agents-prompts]]                                          | `372c597`  | shipped   |
| pre-2026-04 | [[vibe-coding-prompts]]                                     | `9ddb411`  | shipped   |
| pre-2026-04 | [[business-prompts]]                                        | `4476366`  | shipped   |
| pre-2026-04 | [[marketing-prompts]]                                       | `d344a1e`  | shipped   |
| pre-2026-04 | [[pkm-prompts]]                                             | `cb30b00`  | shipped   |

## Template

A new session file should start from this shape. Copy, rename, fill in.

```markdown
---
id: YYYY-MM-DD-kebab-name
date: YYYY-MM-DD
project: [[prompt-library]]
branch: claude/your-branch-name
agent: Claude Code (Opus 4.7)
status: active              # active | shipped | parked | aborted
tags: [frontend, design, ...]
touches:
  - path/to/file.ext
commits: []
related:
  - [[previous-session]]
---

# YYYY-MM-DD — Session title

## Context
…why we're doing this, what triggered it…

## Decisions
…the calls made, the trade-offs taken…

## Changes
…what actually got written…

## Follow-ups
…what's left, what blocked us…
```
