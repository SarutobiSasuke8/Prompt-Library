# CLAUDE.md — [Project Name]

> Project context for AI-assisted development sessions. Read this before making changes.

---

## What this project is

[One paragraph describing what this codebase does, who it's for, and what problem it solves. Be specific — vague descriptions produce vague assistance.]

It lives in `[repo]` and is deployed at `[url]`.

---

## Hard constraints

These were chosen deliberately. Do not "helpfully" violate them.

| Constraint | Rationale |
|---|---|
| [e.g. No frameworks] | [e.g. Anyone can fork and understand it in 20 minutes] |
| [e.g. No npm / package.json] | [e.g. Zero install, zero supply chain, zero rot] |
| [e.g. No build step] | [e.g. `file://` open works. CI is a single upload action] |
| [e.g. Static hosting only] | [e.g. GitHub Pages tier — no backend, no DB, no env vars] |

---

## File layout

```
[repo-root]/
├── [entry-point]      — [what it does]
├── [data-file]        — [what it contains]
├── [style-file]       — [scope of styles]
└── [config/docs]      — [purpose]
```

### Responsibility of each file

- **`[file]`** — [single-sentence responsibility]
- **`[file]`** — [single-sentence responsibility]

---

## Data schema

```js
{
  id: 1,                        // unique integer, never reuse
  [field]: "[value]",           // [description]
  [field]: "[value]"            // [description]
}
```

---

## Design system

### Colour tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0a0a0a` | Page background |
| `--text` | `#e6e6e6` | Primary text |
| `--accent` | `[hex]` | Primary accent — sparingly |

### Typography

- `[Font A]` — labels, chips, badges, code
- `[Font B]` — headings, body copy

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

Every working session MUST end with a log written to `sessions/` at the repo root. Name: `YYYY-MM-DD-kebab-description.md`.

Sections: **Context → Decisions → Changes → Follow-ups.**
