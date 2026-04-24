// mds.js — MD template library data
// Each entry mirrors the file in mds/{file}.md
// `content` is the raw markdown (used for display + copy)
// `file` is the download path relative to the site root

/* global MDS */
var MDS = [
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
  }
];
