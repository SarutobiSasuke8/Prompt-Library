---
id: 2026-04-23-nav-agents-markdown-library
date: 2026-04-23
project: [[prompt-library]]
branch: main
agent: [[Claude Sonnet 4.6]]
status: shipped
tags: [nav, agents, markdown-library, tools, frontend, dropdown]
touches:
  - prompt-library/agents.html
  - prompt-library/docs.html
  - prompt-library/docs.js
  - prompt-library/nav.js
  - prompt-library/style.css
  - prompt-library/tools.html
  - prompt-library/index.html
  - prompt-library/agents/openclaw.md
  - prompt-library/agents/hermes.md
commits: [b76b111]
related:
  - [[2026-04-23-supabase-backend-scaffold]]
  - [[2026-04-22-frontend-visual-refresh]]
---

# 2026-04-23 — Nav restructure, agents page, markdown library

## Context

Session started with a goal to add agent-centric content to the site. The
conversation evolved through several clarifications before landing on a clear
architecture: a dedicated [[agents.html]] patterns reference page, a separate
[[docs.html]] markdown file library (renamed "md repo" in nav), and a nav
restructure to accommodate both without crowding the top bar.

The nav was already centralised in [[nav.js]] — discovered mid-session — which
made the dropdown change a single-file update rather than editing every page.

## Decisions

**agents.html as a standalone reference page** — patterns, design principles,
and a glossary for AI agent builders. Not merged into [[tools.html]] because
the content type is different (reference prose vs. tool cards). Placed in the
`explore ▾` dropdown to keep the top nav clean.

**Markdown library called "md repo" not "docs"** — "docs" was ambiguous (could
mean project docs, API docs, anything). "md repo" is explicit about what it is.
Page file stays `docs.html`; only the nav label changed.

**MD files live in `agents/`** — the initial folder was `docs/` but the content
(OpenClaw, Hermes) is agent-specific. Moved to `prompt-library/agents/` to
match the subject matter. `docs.html` fetches from `agents/` via `fetch()`.

**Dropdown opens on hover (pointer devices) + click (all devices)** — CSS
`@media (hover: hover)` handles hover with no JS; the existing JS click toggle
handles keyboards and touch. No duplicate state.

**Agents added as a tools category** — 5 entries: LangChain, LangGraph, CrewAI,
AutoGPT, AgentOps. Keeps agent infrastructure discoverable alongside the
patterns page and the MD library.

**Nav final structure:**
```
library  |  md repo  |  tools  |  explore ▾  |  about
                                    └ agents
                                    └ collections
                                    └ playground
                                    └ methodology
```

## Changes

### New files
- `prompt-library/agents.html` — agent patterns page (6 pattern cards,
  6 design principles, 8-term glossary, CTA strip to library)
- `prompt-library/docs.html` — markdown library page; card grid driven by
  `docs.js`; modal with raw MD preview, copy button, `↓ download` link
- `prompt-library/docs.js` — data file for MD entries; schema matches
  `prompts.js` pattern (id, title, category, description, filename, tags, url)
- `prompt-library/agents/openclaw.md` — stub, replace with real content
- `prompt-library/agents/hermes.md` — stub, replace with real content

### Modified files
- `prompt-library/nav.js` — full rewrite to support `explore ▾` dropdown;
  LINKS array drives both desktop nav and mobile drawer; adding a page is
  one line; dropdown renders inline for desktop, flattened with group label
  for mobile drawer
- `prompt-library/style.css` — nav breakpoint (`display:none` below 860px,
  `display:flex` above); dropdown CSS (`.nav-dropdown`, `.nav-dd-menu`,
  `.nav-dd-item`); hover autopop via `@media (hover: hover)`; mobile drawer
  group label (`.drawer-group-label`)
- `prompt-library/tools.html` — `agents` category chip added to filter row;
  5 agent tool entries appended to TOOLS array (LangChain, LangGraph, CrewAI,
  AutoGPT, AgentOps)
- `prompt-library/index.html` — `agents` nav link added (later superseded by
  nav.js centralisation)

### Removed
- `prompt-library/docs/` folder and stub files (content moved to `agents/`)

## Follow-ups

- **Fill `agents/openclaw.md` and `agents/hermes.md`** with real content from
  the respective sites. The modal will render the raw markdown as plain text.
- **Add more MD entries to `docs.js`** as the agent ecosystem grows — one
  object per file, filename points to `agents/*.md`.
- **Add more agent tools to tools.html** — candidates: Composio, Pydantic AI,
  Semantic Kernel, AgentBench.
- **agents.html** content is preserved but not yet linked from anywhere
  prominent other than the explore dropdown. Consider a cross-link from the
  tools agents section.
- **Consider a markdown renderer** — currently MD renders as raw text in a
  `<pre>` block. If the files grow complex (tables, code blocks), bundling
  `marked.js` in-tree would be worthwhile. Parked until content volume
  justifies it.
- **Commit this work** — nothing on this branch is committed yet.
