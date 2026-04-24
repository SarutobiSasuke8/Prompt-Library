// mds.js — MD template library data
// Each entry mirrors the file in mds/{file}.md
// `content` is the raw markdown (used for display + copy)
// `file` is the download path relative to the site root
// Bundle entries also have `version` (date string) and `files[]` (per-file copy/download)

/* global MDS */
var MDS = [
  {
    id: "andrej-karpathy-skills",
    title: "andrej-karpathy-skills",
    purpose: "Four principles derived from Andrej Karpathy's observations on LLM coding pitfalls — Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution. Drop into any project as a CLAUDE.md.",
    tags: ["claude-code", "karpathy", "best-practices", "ai-guidelines", "developer-tooling"],
    file: "mds/andrej-karpathy-skills-readme.md",
    added: "2026-04-24",
    version: "2026-04-24",
    files: [
      {
        label: "CLAUDE.md",
        filename: "andrej-karpathy-skills-claude.md",
        file: "mds/andrej-karpathy-skills-claude.md",
        content: `# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
\`\`\`
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
\`\`\`

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.`
      },
      {
        label: "EXAMPLES.md",
        filename: "andrej-karpathy-skills-examples.md",
        file: "mds/andrej-karpathy-skills-examples.md",
        content: `# Examples

Real-world code examples demonstrating the four principles. Each example shows what LLMs commonly do wrong and how to fix it.

---

## 1. Think Before Coding

### Example: Hidden Assumptions

**User Request:** "Add a feature to export user data"

**❌ What LLMs Do (Wrong Assumptions)**

Immediately writes \`export_users()\` that dumps all users to a hardcoded file path, assumes JSON/CSV formats, picks field names without checking the schema.

**Problems:**
- Assumed it should export ALL users (what about pagination? privacy?)
- Assumed file location without asking
- Assumed which fields to include

**✅ What Should Happen (Surface Assumptions)**

\`\`\`
Before implementing, I need to clarify:

1. Scope: Export all users or filtered subset? (privacy implications)
2. Format: Did you mean download file in browser, background job, or API endpoint?
3. Fields: Which user fields? (some might be sensitive)
4. Volume: How many users typically? (affects approach)

Simplest approach: Add an API endpoint returning paginated JSON.
What's your preference?
\`\`\`

---

## 2. Simplicity First

### Example: Over-abstraction

**User Request:** "Add a function to calculate discount"

**❌ What LLMs Do (Overengineered)**

\`\`\`python
class DiscountStrategy(ABC):
    @abstractmethod
    def calculate(self, amount: float) -> float: ...
# ... 80 more lines for a single calculation
\`\`\`

**✅ What Should Happen (Simple)**

\`\`\`python
def calculate_discount(amount: float, percent: float) -> float:
    """Calculate discount amount. percent should be 0-100."""
    return amount * (percent / 100)
\`\`\`

---

## 3. Surgical Changes

### Example: Drive-by Refactoring

**User Request:** "Fix the bug where empty emails crash the validator"

**✅ What Should Happen (Surgical)**

\`\`\`diff
  def validate_user(user_data):
      # Check email format
-     if not user_data.get('email'):
+     email = user_data.get('email', '')
+     if not email or not email.strip():
          raise ValueError("Email required")
-     if '@' not in user_data['email']:
+     if '@' not in email:
          raise ValueError("Invalid email")
      if not user_data.get('username'):
          raise ValueError("Username required")
      return True
\`\`\`

Only changed: the specific lines that fix empty email handling.

---

## 4. Goal-Driven Execution

### Example: Vague vs. Verifiable

**User Request:** "Fix the authentication system"

**✅ What Should Happen (Verifiable Goals)**

\`\`\`
Plan:
1. Write test: Change password → verify old session invalidated
   Verify: Test fails (reproduces bug)
2. Implement: Invalidate sessions on password change
   Verify: Test passes
3. Verify no regression: Existing auth tests still pass
   Verify: Full test suite green
\`\`\`

---

## Anti-Patterns Summary

| Principle | Anti-Pattern | Fix |
|-----------|-------------|-----|
| Think Before Coding | Silently assumes file format, fields, scope | List assumptions explicitly, ask for clarification |
| Simplicity First | Strategy pattern for single discount calculation | One function until complexity is actually needed |
| Surgical Changes | Reformats quotes, adds type hints while fixing bug | Only change lines that fix the reported issue |
| Goal-Driven | "I'll review and improve the code" | "Write test for bug X → make it pass → verify no regressions" |

**Good code is code that solves today's problem simply, not tomorrow's problem prematurely.**`
      },
      {
        label: "README.md",
        filename: "andrej-karpathy-skills-readme.md",
        file: "mds/andrej-karpathy-skills-readme.md",
        content: `# Karpathy-Inspired Claude Code Guidelines

A single \`CLAUDE.md\` file to improve Claude Code behavior, derived from Andrej Karpathy's observations on LLM coding pitfalls.

## The Problems

From Andrej's post:

> "The models make wrong assumptions on your behalf and just run along with them without checking."

> "They really like to overcomplicate code and APIs, bloat abstractions, don't clean up dead code."

> "They still sometimes change/remove comments and code they don't sufficiently understand as side effects."

## The Solution

Four principles in one file:

| Principle | Addresses |
|-----------|-----------|
| **Think Before Coding** | Wrong assumptions, hidden confusion, missing tradeoffs |
| **Simplicity First** | Overcomplication, bloated abstractions |
| **Surgical Changes** | Orthogonal edits, touching code you shouldn't |
| **Goal-Driven Execution** | Leverage through tests-first, verifiable success criteria |

## Install

**Option A: Claude Code Plugin (recommended)**

\`\`\`
/plugin marketplace add forrestchang/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills
\`\`\`

**Option B: CLAUDE.md (per-project)**

\`\`\`bash
curl -o CLAUDE.md https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md
\`\`\`

## Key Insight

From Andrej: "LLMs are exceptionally good at looping until they meet specific goals... Don't tell it what to do, give it success criteria and watch it go."

## License

MIT`
      }
    ],
    content: `# Karpathy-Inspired Claude Code Guidelines

A single \`CLAUDE.md\` file to improve Claude Code behavior, derived from [Andrej Karpathy's observations](https://x.com/karpathy/status/2015883857489522876) on LLM coding pitfalls.

## The Problems

From Andrej's post:

> "The models make wrong assumptions on your behalf and just run along with them without checking. They don't manage their confusion, don't seek clarifications, don't surface inconsistencies, don't present tradeoffs, don't push back when they should."

> "They really like to overcomplicate code and APIs, bloat abstractions, don't clean up dead code... implement a bloated construction over 1000 lines when 100 would do."

> "They still sometimes change/remove comments and code they don't sufficiently understand as side effects, even if orthogonal to the task."

## The Solution

Four principles in one file that directly address these issues:

| Principle | Addresses |
|-----------|-----------|
| **Think Before Coding** | Wrong assumptions, hidden confusion, missing tradeoffs |
| **Simplicity First** | Overcomplication, bloated abstractions |
| **Surgical Changes** | Orthogonal edits, touching code you shouldn't |
| **Goal-Driven Execution** | Leverage through tests-first, verifiable success criteria |

## The Four Principles in Detail

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

LLMs often pick an interpretation silently and run with it. This principle forces explicit reasoning:

- **State assumptions explicitly** — If uncertain, ask rather than guess
- **Present multiple interpretations** — Don't pick silently when ambiguity exists
- **Push back when warranted** — If a simpler approach exists, say so
- **Stop when confused** — Name what's unclear and ask for clarification

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

Combat the tendency toward overengineering:

- No features beyond what was asked
- No abstractions for single-use code
- No "flexibility" or "configurability" that wasn't requested
- No error handling for impossible scenarios
- If 200 lines could be 50, rewrite it

**The test:** Would a senior engineer say this is overcomplicated? If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting
- Don't refactor things that aren't broken
- Match existing style, even if you'd do it differently
- If you notice unrelated dead code, mention it — don't delete it

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused
- Don't remove pre-existing dead code unless asked

**The test:** Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform imperative tasks into verifiable goals:

| Instead of... | Transform to... |
|--------------|-----------------|
| "Add validation" | "Write tests for invalid inputs, then make them pass" |
| "Fix the bug" | "Write a test that reproduces it, then make it pass" |
| "Refactor X" | "Ensure tests pass before and after" |

For multi-step tasks, state a brief plan:

\`\`\`
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
\`\`\`

Strong success criteria let the LLM loop independently. Weak criteria ("make it work") require constant clarification.

## Install

**Option A: Claude Code Plugin (recommended)**

\`\`\`
/plugin marketplace add forrestchang/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills
\`\`\`

**Option B: CLAUDE.md (per-project)**

\`\`\`bash
curl -o CLAUDE.md https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md
\`\`\`

## Key Insight

From Andrej:

> "LLMs are exceptionally good at looping until they meet specific goals... Don't tell it what to do, give it success criteria and watch it go."

## How to Know It's Working

These guidelines are working if you see:

- **Fewer unnecessary changes in diffs** — Only requested changes appear
- **Fewer rewrites due to overcomplication** — Code is simple the first time
- **Clarifying questions come before implementation** — Not after mistakes
- **Clean, minimal PRs** — No drive-by refactoring or "improvements"

## Customization

These guidelines are designed to be merged with project-specific instructions. Add them to your existing \`CLAUDE.md\` or create a new one.

## Tradeoff Note

These guidelines bias toward **caution over speed**. For trivial tasks (simple typo fixes, obvious one-liners), use judgment — not every change needs the full rigor.

## License

MIT`
  },

  {
    id: "claude-md",
    title: "CLAUDE.md",
    purpose: "Project context template for Claude Code sessions — covers constraints, file layout, conventions, anti-patterns, and testing checklist.",
    tags: ["claude-code", "project-context", "developer-tooling", "ai-assisted-dev"],
    file: "mds/claude.md",
    added: "2026-04-24",
    content: `# CLAUDE.md — [Project Name]

> Project context for AI-assisted development sessions. Read this before making changes.

---

## What this project is

[One paragraph describing what this codebase does, who it's for, and what problem it solves. Be specific — vague descriptions produce vague assistance.]

It lives in \`[repo]\` and is deployed at \`[url]\`.

---

## Hard constraints

These were chosen deliberately. Do not "helpfully" violate them.

| Constraint | Rationale |
|---|---|
| [e.g. No frameworks] | [e.g. Anyone can fork and understand it in 20 minutes] |
| [e.g. No npm / package.json] | [e.g. Zero install, zero supply chain, zero rot] |
| [e.g. No build step] | [e.g. \`file://\` open works. CI is a single upload action] |
| [e.g. Static hosting only] | [e.g. GitHub Pages tier — no backend, no DB, no env vars] |

---

## File layout

\`\`\`
[repo-root]/
├── [entry-point]      — [what it does]
├── [data-file]        — [what it contains]
├── [style-file]       — [scope of styles]
└── [config/docs]      — [purpose]
\`\`\`

### Responsibility of each file

- **\`[file]\`** — [single-sentence responsibility]
- **\`[file]\`** — [single-sentence responsibility]

---

## Data schema

\`\`\`js
{
  id: 1,                        // unique integer, never reuse
  [field]: "[value]",           // [description]
  [field]: "[value]"            // [description]
}
\`\`\`

---

## Design system

### Colour tokens

| Token | Value | Use |
|---|---|---|
| \`--bg\` | \`#0a0a0a\` | Page background |
| \`--text\` | \`#e6e6e6\` | Primary text |
| \`--accent\` | \`[hex]\` | Primary accent — sparingly |

### Typography

- \`[Font A]\` — labels, chips, badges, code
- \`[Font B]\` — headings, body copy

---

## Conventions

- [Convention 1 — be specific]
- [Convention 2 — be specific]
- [Convention 3 — be specific]

---

## Common anti-patterns — don't

- **Don't [X].** [Why not. What to do instead.]
- **Don't [Y].** [Why not.]
- **Don't [Z].** [Why not.]

---

## Testing checklist

Run these before any PR:

- [ ] [Test 1 — specific, checkable]
- [ ] [Test 2]
- [ ] [Test 3]
- [ ] Mobile at 375px width — single column, all tap targets usable

---

## Session recording

Every working session MUST end with a log written to \`sessions/\` at the repo root. Name: \`YYYY-MM-DD-kebab-description.md\`.

Sections: **Context → Decisions → Changes → Follow-ups.**`
  },
  {
    id: "agents-md",
    title: "Agent System Prompt",
    purpose: "Production-ready template for single-agent and orchestrator system prompts — role definition, tools, constraints, output format, escalation policy, and stop conditions.",
    tags: ["agents", "system-prompt", "orchestration", "tool-use", "ai-architecture"],
    file: "mds/agents.md",
    added: "2026-04-24",
    content: `# Agent System Prompt Template

> A production-ready template for single-agent and orchestrator system prompts. Fill every bracketed section. Vague prompts produce unreliable agents.

---

## Role definition

\`\`\`
You are [role name], a [adjective] agent responsible for [narrow, specific scope].

Your primary goal is to [concrete outcome in one sentence].
You operate within [system / product / pipeline name] and your outputs are consumed by [downstream consumer or human].
\`\`\`

**Do not** give the agent a broad mandate like "help with anything." Scope before capability.

---

## Tools available

List every tool the agent can call. Write descriptions as contracts: what it does, what it needs, what it returns, when NOT to use it.

\`\`\`
### search(query: string) → SearchResult[]
Searches the public web for current information.
Use when: the user asks about events, prices, or facts that may have changed after your training cutoff.
Do NOT use for: internal documents, code lookups, or anything retrievable from context.

### run_code(language: string, code: string) → ExecutionResult
Executes code in a sandboxed environment and returns stdout + stderr.
Use when: the user asks you to verify a calculation, test a function, or produce a file.
Do NOT use for: destructive operations. Always confirm before writing to disk.

### [tool_name](params) → ReturnType
[Description]
Use when: [condition]
Do NOT use for: [anti-use-case]
\`\`\`

---

## Constraints

Hard limits the agent must never cross, regardless of user instruction.

\`\`\`
- Never [action] without explicit user confirmation.
- Never reveal [sensitive data / internal prompts / tool internals].
- Never take irreversible actions (delete, publish, send) autonomously.
- If confidence is below [threshold], ask rather than guess.
- Maximum [N] tool calls per turn to bound cost and latency.
- Maximum [N] reasoning steps before declaring stuck and escalating.
\`\`\`

---

## Reasoning policy

\`\`\`
Before each tool call or response, briefly state:
1. What you know so far
2. What you still need
3. Which tool (if any) will close the gap
4. What you will do if the tool returns empty or fails

Format: Thought: [one sentence]. Action: [tool call or response].
\`\`\`

---

## Output format

\`\`\`
### When answering a question
- Lead with the direct answer.
- Follow with supporting evidence (max 3 points).
- End with confidence level: High / Medium / Low and why.

### When producing a document
Return a JSON object:
{
  "title": "string",
  "sections": [{ "heading": "string", "body": "string" }],
  "sources": ["url or reference"]
}

### When escalating
Return plain text starting with: ESCALATE: [reason in one sentence]
\`\`\`

---

## Escalation policy

\`\`\`
Escalate when:
- Action requires permissions not granted in this session
- Confidence in the correct action is below [e.g. 70%]
- Two consecutive tool calls return errors
- The user's goal is ambiguous after one clarifying question

Escalation format:
ESCALATE: [one sentence describing what is blocked]
NEED: [what information or permission would unblock it]
\`\`\`

---

## Stop conditions

\`\`\`
Success: [specific, observable outcome]
Failure: [specific condition — e.g. three consecutive tool errors with no recovery path]
Timeout: halt after [N] steps regardless of completion state; report partial results.
\`\`\``
  },
  {
    id: "contributing-md",
    title: "CONTRIBUTING.md",
    purpose: "Contribution guide template for AI-assisted open source projects — prompt schema, quality bar, PR checklist, and commit conventions.",
    tags: ["open-source", "contributing", "developer-tooling", "project-management"],
    file: "mds/contributing.md",
    added: "2026-04-24",
    content: `# CONTRIBUTING.md — [Project Name]

> How to contribute prompts, articles, and code to this project. Read fully before opening a PR.

---

## Quality bar

Every contribution must clear all of the following:

- **Tested, not imagined.** If it's a prompt, you ran it on the model listed. If it's code, you opened it in a browser.
- **Specific, not vague.** Prompts define the shape of the output. Code does one thing well.
- **No shill language.** Banned: "revolutionary", "next-gen", "game-changing", decorative emoji.
- **No price predictions** or investment recommendations in prompt content.
- **Neutral register.** Write for a sceptical senior engineer, not a newsletter subscriber.

---

## Adding a prompt

### Schema

\`\`\`js
{
  id: [next unused integer],
  title: "Short Name",
  category: "web3",
  complexity: "intermediate",     // beginner | intermediate | advanced
  purpose: "One-line description.",
  tags: ["tag-one", "tag-two"],   // 2–5, lowercase, hyphenated
  models: ["claude", "gpt-4o"],   // actually tested
  temperature: "0.3",
  prompt: "You are a ...",
  chaining: "",
  notes: ""
}
\`\`\`

### Steps

1. Open \`add-prompt.html\` locally and fill every field.
2. Click **Generate JSON → Copy**.
3. Paste into \`prompts.js\` inside the \`PROMPTS\` array.
4. Verify in \`index.html\`: card renders, filters work, modal opens, copy works.
5. Open a PR: \`prompt: [title] — [category]\`

---

## Code standards

- No frameworks. No npm. No build step.
- CSS in \`style.css\`. Per-page overrides in a \`<style>\` block.
- No \`console.log\` in merged code.
- Format: 2-space indent, single quotes in JS, double quotes in HTML attributes.

### PR checklist

- [ ] \`index.html\` opens and core flow works
- [ ] Tested at 375px width
- [ ] No new runtime dependencies
- [ ] Session log written to \`sessions/YYYY-MM-DD-description.md\`

### Commit convention

\`\`\`
type: short description

Types: prompt | article | md | feat | fix | style | refactor | docs | chore
\`\`\``
  },
  {
    id: "session-report-template",
    title: "Session Report Template",
    purpose: "Structured session report for AI-assisted coding and research work — captures objectives, decisions, git log, tasks, blockers, and a handoff for the next agent. Obsidian-native with wikilinks.",
    tags: ["claude-code", "session-log", "obsidian", "coding-agents", "ai-workflow"],
    file: "mds/session-report-template.md",
    added: "2026-04-24",
    content: `---
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

> Templater note: replace \`YYYY-MM-DD\` fields with \`<% tp.date.now("YYYY-MM-DD") %>\` and the title line with \`<% tp.file.title %>\` if using Obsidian Templater.

## Naming Convention

- **Filename pattern:** \`yyyy-mm-dd-session-report-[repo-or-project-slug].md\`
- **Examples:**
  - \`2026-04-24-session-report-my-app.md\`
  - \`2026-04-24-session-report-api-refactor.md\`
- **Rule:** use lowercase, hyphens, no spaces, and stable slugs to stay aligned with vault-wide naming conventions in \`AGENTS.md\`, \`CLAUDE.md\`, and \`CODEX.md\`.

## Session Snapshot

- **Date:** [[YYYY-MM-DD]]
- **Project:** [[Project Name]]
- **Repository:** \`repo-name\`
- **Branch:** \`main\`
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

- \`path/to/file\`

### Files modified

- \`path/to/file\`

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

- \`hash\` - Commit message
- \`hash\` - Commit message

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
- Prefer rich \`[[wikilinks]]\` over plain text when the note refers to an existing vault entity, project, company, tool, person, or date.
- Keep the executive summary concise, but make the decisions, tasks, blockers, and handoff sections detailed enough that a future agent can resume work without rereading the full conversation.
- If this session generated a durable workflow, methodology, or strategic insight, link it to the relevant canonical note instead of burying it only in the session report.`
  }
];
