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
> Each session has its own comprehensive report with detailed YAML frontmatter and an Obsidian-style
> wiki-linked write-up. Link freely with `[[ ]]`.
> 
> **Migration (2026-04-24):** System upgraded from lightweight format (Context/Decisions/Changes/Follow-ups) to comprehensive template. Legacy sessions below retained for context; new sessions use full template format.

## How this system works

- One `.md` per session, named `YYYY-MM-DD-session-report-[project-slug].md`.
- Every session file begins with comprehensive [[YAML frontmatter]] capturing metadata (date, agent, llm, model, agents_used, commits, status, confidence, etc.).
- Body structured in sections: Executive Summary → Context → Work Completed → Decisions → Git Log → Validation → Tasks → Blockers → Handoff.
- Heavy use of `[[wikilinks]]` to [[concepts]], [[files]], [[branches]], [[entities]], and other [[sessions]]. Fully graph-ready for [[Obsidian]].
- Dedicated **"Recommended startup sequence"** for the next coding agent to quickly resume work.
- This `README.md` is the root [[MOC]] (Map of Content). Update the **Index** table below whenever a new session file lands.
- These notes live at the **repo root** (`sessions/`), not inside `prompt-library/`, so the [[GitHub Pages deploy]] does not publish them.

## Conventions

**Naming:**
- Filename: `YYYY-MM-DD-session-report-[project-slug].md` (e.g. `2026-04-24-session-report-prompt-library.md`)
- Use lowercase, hyphens, no spaces; stable project slugs (see `AGENTS.md`, `CLAUDE.md`, `CODEX.md`)

**Metadata:**
- Dates in frontmatter are ISO-8601 (`YYYY-MM-DD`)
- `status:` is one of `active`, `shipped`, `parked`, `blocked`, `aborted`
- `confidence:` is one of `low`, `medium`, `high`
- `llm:` list LLM providers (e.g. `[[Claude]]`, `[[ChatGPT]]`, `[[Codex]]`)
- `model:` list specific models (e.g. `[[Claude Opus 4.7]]`, `[[GPT-4o]]`)
- `agents_used:` list agent names (e.g. `[[Claude Code]]`, `[[Codex]]`)
- `tags:` lowercase, kebab-case, plural where it makes sense

**Linking:**
- Use `[[wikilinks]]` freely — they don't need to resolve in GitHub. They're for [[Obsidian]] graph navigation.
- Prefer `[[double-brackets]]` over inline paths. Paths rot; concepts don't.
- When referencing code: `path:line` (e.g. `prompt-library/index.html:254`)
- When referencing commits: short-SHA (e.g. `6656f1e`)
- When referencing dates, entities, people: always use `[[wikilinks]]`

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
| 2026-04-22 | [[2026-04-22-prompt-library-build\|prompt-library build day (Sonnet 4.6)]]         | `claude/plan-user-accounts-zlhey`          | shipped |
| 2026-04-22 | [[2026-04-22-frontend-visual-refresh\|frontend visual refresh + sessions system]]  | `claude/create-frontend-html-bnbEu`        | shipped |
| 2026-04-23 | [[2026-04-23-supabase-backend-scaffold\|Supabase backend scaffold (v2 user mgmt)]] | `main`                                     | active  |
| 2026-04-23 | [[2026-04-23-nav-agents-markdown-library\|Nav dropdown, agents page, md repo]]     | `main`                                     | shipped |

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

**See `Session Report Template.md` for the canonical template.** 

New sessions should:
1. Copy `Session Report Template.md` and rename to `YYYY-MM-DD-session-report-[project-slug].md`
2. Fill **all** YAML frontmatter fields (llm, model, agents_used, agent_instruction_files, etc.)
3. Complete body sections in order:
   - **Executive Summary** — 60-second mission overview
   - **Context and Operating System** — what instruction files loaded, constraints, strategic frame
   - **Work Completed** — outputs, files created/modified, systems used
   - **Decisions and Reasoning** — key decisions + tradeoffs, strategic insights
   - **Git and Delivery Log** — commits, branch/PR status, deployment status
   - **Validation** — tests run, linting, manual QA, what remains unverified
   - **Tasks** — completed, open, immediate next actions
   - **Blockers and Risks** — current blockers, dependencies, risks to watch
   - **Handoff for Future Agents** — startup sequence, files to read, traps, safe assumptions
4. Use `[[wikilinks]]` extensively for entities, concepts, files, dates, people, tools
5. Include `## Linked Entities and Notes` section
6. Update the **Index** table below with new session entry
