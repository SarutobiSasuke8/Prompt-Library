---
type: "[[Session Reports]]"
status: draft
created: "[[YYYY-MM-DD]]"
updated: "[[YYYY-MM-DD]]"
date: "[[YYYY-MM-DD]]"
session_window_start: "[[YYYY-MM-DD]]"
session_window_end: "[[YYYY-MM-DD]]"
project:
repo:
repo_slug:
repo_url:
branch:
workspace:
session_kind:
session_scope:
objective:
operator:
llm:
  - "[[ChatGPT]]"
model:
  - "[[GPT-5.4]]"
agents_used:
  - "[[Codex]]"
agent_instruction_files:
  - "[[AGENTS.md]]"
  - "[[CODEX.md]]"
related_entities:
related_systems:
  - "[[Github]]"
related_notes:
related_projects:
related_repos:
organizations:
products:
tags:
  - session-report
  - ai-workflow
  - coding-agents
commit_count:
files_changed:
tasks_completed:
tasks_remaining:
confidence: medium
---

# Session Report — [Project] — YYYY-MM-DD

> Templater note: replace `YYYY-MM-DD` fields with `<% tp.date.now("YYYY-MM-DD") %>` and the title line with `<% tp.file.title %>` if using Obsidian Templater.

## Naming Convention

- **Filename pattern:** `yyyy-mm-dd-session-report-[repo-or-project-slug].md`
- **Examples:**
  - `2026-04-24-session-report-my-app.md`
  - `2026-04-24-session-report-api-refactor.md`
- **Rule:** use lowercase, hyphens, no spaces, and stable slugs to stay aligned with vault-wide naming conventions in `AGENTS.md`, `CLAUDE.md`, and `CODEX.md`.

## Session Snapshot

- **Date:** [[YYYY-MM-DD]]
- **Project:** [[Project Name]]
- **Repository:** `repo-name`
- **Branch:** `main`
- **LLM:** [[ChatGPT]]
- **Model(s):** [[GPT-5.4]]
- **Agent(s):** [[Codex]]
- **Relevant org / system links:** [[Github]]
- **Session kind:** strategy | build | ingest | debugging | research | maintenance | documentation | mixed
- **Primary objective:** One clear sentence on what this session was trying to achieve.
- **Outcome status:** draft | active | complete | blocked

## Executive Summary

Write a concise but high-signal summary of the session:

- What was the mission?
- What materially changed?
- What decisions now matter going forward?
- What should a future coding agent understand in under 60 seconds?

## Context and Operating System

### Repo / vault context loaded

- Instruction files read: [[AGENTS.md]], [[CLAUDE.md]], [[CODEX.md]]
- Relevant project systems:
- Existing templates or workflows reused:
- Constraints or guardrails in force:

### Strategic frame

- Why this work mattered:
- What larger system, playbook, or workflow it connects to:
- What assumptions were in play:

## Work Completed

### Major outputs

- Output 1:
- Output 2:
- Output 3:

### Files created

- `path/to/file`

### Files modified

- `path/to/file`

### Systems, workflows, or patterns used

- [[Obsidian]]
- [[Github]]
- [[Codex]]
- [[Claude]]
- [[ChatGPT]]

Add or remove links generously. Prefer linked entities over bare text where possible.

## Decisions and Reasoning

### Key decisions

- Decision:
  Why it was chosen:
  Tradeoff accepted:

- Decision:
  Why it was chosen:
  Tradeoff accepted:

### Strategic insights

- Insight 1:
- Insight 2:
- Insight 3:

## Git and Delivery Log

### [[Github]] commits

- `hash` - Commit message
- `hash` - Commit message

### Branch / PR status

- Branch:
- PR:
- Push status:
- Deployment / release status:

## Validation

- Tests run:
- Lint / typecheck / build status:
- Manual QA performed:
- What remains unverified:

## Tasks

### Completed

- [x] Completed task 1 #task
- [x] Completed task 2 #task

### Open / remaining

- [ ] Remaining task 1 #task #inbox
- [ ] Remaining task 2 #task #inbox

### Immediate next actions

- [ ] Next action 1 #task #next
- [ ] Next action 2 #task #next

## Blockers and Risks

- Current blocker:
- Dependency on human input:
- External dependency:
- Risk to watch next session:

## Handoff for Future Agents

### What the next coding agent should know

- Current repo state:
- Highest-value next step:
- Files to read first:
- Known traps or anti-patterns:
- Safe assumptions:

### Recommended startup sequence

1. Read the relevant agent instruction file(s).
2. Read this session report.
3. Review the latest commits and changed files.
4. Verify open tasks and blockers before making changes.

## Linked Entities and Notes

- People:
- Companies:
- Models:
- Tools:
- Concepts:
- Notes worth opening next:

## Suggested Obsidian Links

- [[YYYY-MM-DD]]
- [[Github]]
- [[Codex]]
- [[Claude]]
- [[ChatGPT]]
- [[Project Name]]
- [[Repository Name]]

## Optional Metrics

| Metric | Value |
|---|---|
| Commit count | |
| Files changed | |
| Tasks completed | |
| Tasks remaining | |
| Tests run | |
| Session duration | |

## Notes on Use

- This template is designed for cross-repo reuse when working with coding agents such as [[Codex]], [[Claude]], and [[ChatGPT]].
- Prefer rich `[[wikilinks]]` over plain text when the note refers to an existing vault entity, project, company, tool, person, or date.
- Keep the executive summary concise, but make the decisions, tasks, blockers, and handoff sections detailed enough that a future agent can resume work without rereading the full conversation.
- If this session generated a durable workflow, methodology, or strategic insight, link it to the relevant canonical note instead of burying it only in the session report.
