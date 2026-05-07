# Contributing

Thanks for considering a contribution. This library is curated, so the bar is
high — but the process is light. If you've built something that survived
contact with real work, we want it.

---

## TL;DR

1. Fork the repo
2. Open `add-prompt.html` in your browser (local file, no install)
3. Fill the form → click **Generate JSON** → copy the output
4. Paste into `prompts.js` inside the `PROMPTS` array, bump the `id`
5. Test locally by opening `index.html`
6. Open a PR

---

## Prompt schema

Every entry in `prompts.js` is a plain JavaScript object with these fields.
All fields are required unless marked otherwise.

| Field         | Type      | Description                                                                 |
|---------------|-----------|-----------------------------------------------------------------------------|
| `id`          | integer   | Unique. Next unused integer in the array.                                   |
| `title`       | string    | Short human-readable name. Under ~60 chars. No emoji, no marketing gloss.   |
| `category`    | string    | One of the keys in `CATEGORIES` (see top of `prompts.js`).                  |
| `complexity`  | string    | `beginner` \| `intermediate` \| `advanced`.                                 |
| `purpose`     | string    | One line, ~160 chars max, describing what the prompt *does*.                |
| `tags`        | string[]  | Lowercase, hyphenated. 2–5 tags. Searchable.                                |
| `models`      | string[]  | Models you've actually tested it on. See the capture form for valid values. |
| `temperature` | string    | Recommended temperature, e.g. `"0.3"`.                                      |
| `prompt`      | string    | The full system prompt, copy-paste ready. Multi-line is fine.               |
| `variables`   | object[]  | Optional quick-fill slots for `{{TOKEN}}` placeholders.                     |
| `chaining`    | string    | What to pipe this into next, or how it combines with other prompts. Can be empty. |
| `notes`       | string    | Caveats, tuning tips, known failure modes. Can be empty.                    |

### Variable slots

Use variables when a prompt has obvious reusable placeholders. Tokens in the
prompt body must use uppercase braces, e.g. `{{ASSET_NAME}}`, and the matching
schema lives beside the prompt:

```js
variables: [
  { key: "ASSET_NAME", label: "Token / project name", placeholder: "e.g. Uniswap" },
  {
    key: "OUTPUT_MODE",
    label: "Output mode",
    placeholder: "select one",
    options: ["brief", "standard", "deep-dive"]
  }
]
```

`options` is optional. When present, the UI renders a select menu; otherwise it
renders a text input. Keep variable labels short and useful, because they appear
inside the prompt detail quick-fill panel.

### New categories

Adding a new category is a two-line change:

1. Add a `"key": "Display Name"` entry to `CATEGORIES` at the top of `prompts.js`.
2. Add at least two prompts with that category so the filter button isn't lonely.

The filter UI is data-driven — no changes to `index.html` needed.

---

## Quality standards

Prompts are rejected if they:

- **Use shill language** — "revolutionary", "next-gen", "game-changing". Neutral, technical tone only.
- **Reference brands as endorsement** — no "as featured in TechCrunch".
- **Are derivative** — a reformatted "write me a blog post" prompt isn't useful. It has to do something specific.
- **Have no output structure** — good prompts define the shape of the answer.
- **Make claims the model can't deliver** — "always factually correct", "guaranteed to find bugs". Models hedge for a reason.
- **Contain private data** — no internal API keys, client data, or un-redacted examples.
- **Are untested** — if you haven't actually run it against at least one of the listed models, don't submit.

Prompts are accepted if they:

- Solve a specific, real problem someone actually has
- Produce structured, predictable output
- State their own limits (notes field)
- Work across at least one model without modification
- Could be shown to a sceptical senior engineer without embarrassment

Admission is curated. Not every PR will be merged. Don't take it personally —
we'd rather have 50 great prompts than 500 mediocre ones.

---

## Two ways to add a prompt

### A. Via `add-prompt.html` (recommended)

1. Open `prompt-library/add-prompt.html` in your browser. It's a local HTML
   file; no network, no install, no build step.
2. You'll see a red banner at the top — that's deliberate. It's a local
   utility, not the live site.
3. Fill every field. The `id` auto-increments after your first submission.
4. Click **Generate JSON**. A formatted object literal appears below.
5. Click **Copy**.
6. Open `prompts.js`, paste the object into the `PROMPTS` array (before the
   closing `];`), and make sure it has a trailing comma if it's not the last
   entry.
7. Save, then open `index.html` in your browser to verify the new card renders.

### B. By hand

Just edit `prompts.js` directly. Copy an existing entry as a template, swap
the fields, and bump the `id`. If you write the prompt across many lines, use
the `"line1\n" +\n"line2"` pattern shown in existing entries.

---

## Submitting a PR

1. Create a branch: `git checkout -b add-prompt-<short-name>`
2. Commit: `git commit -m "Add <prompt title> to <category>"` — one prompt per commit is ideal.
3. Push and open a PR against `main`.
4. In the PR description, tell us:
   - What problem the prompt solves
   - Which model(s) you tested it on
   - A link to an example output if possible (gist, screenshot, pastebin)
5. We'll review, maybe suggest edits, then merge. The live site redeploys automatically.

---

## Local testing

No build step. Open `prompt-library/index.html` directly in your browser
(double-click in most file managers, or `file://…` in the address bar).

Things to check before opening a PR:

- [ ] New card appears in the grid
- [ ] Category filter button shows the right count
- [ ] Search finds it by title, purpose, or tag
- [ ] Clicking the card opens the modal with the full prompt
- [ ] In-card copy button works
- [ ] Modal copy button works
- [ ] Mobile layout looks right (use your browser's responsive mode, 375px wide)

---

## Adding a new page

When creating a new `.html` page, use the structure below as your template. Copy it, swap the `<title>`, `<sub>` label, active nav link, and page content — everything else stays identical.

### Standard header

```html
<header class="site-header">
  <div class="inner">
    <a class="logo" href="index.html" style="text-decoration:none; color:inherit;">
      <span class="caret">&gt;</span>prompt-library
      <span class="tilde">~</span>
      <span class="sub"><!-- page label, e.g. tools --></span>
    </a>
    <nav style="display:flex; align-items:center; gap:18px; font-family:var(--mono); font-size:12px;">
      <a href="index.html" style="color:var(--text-dim); text-decoration:none;">library</a>
      <a href="learn.html" style="color:var(--text-dim); text-decoration:none;">methodology</a>
      <a href="tools.html" style="color:var(--text-dim); text-decoration:none;">tools</a>
      <!-- set color:var(--accent) on the link that matches the current page -->
    </nav>
    <div class="count-pill">
      <span class="num" id="count-num">0</span>
      <span class="label" id="count-label"><!-- e.g. tools --></span>
    </div>
    <a href="user.html?handle=SarutobiSasuke" class="avatar-chip" aria-label="Your profile">
      <span class="av-circle">S</span>
      <span class="av-handle">SarutobiSasuke</span>
    </a>
  </div>
</header>
```

### Standard footer

```html
<footer class="site-footer">
  <div class="inner">
    <div>&gt; built for people shipping with AI</div>
    <div style="display:flex; gap:14px; align-items:center; flex-wrap:wrap;">
      <a href="index.html">library</a>
      <a href="learn.html">methodology</a>
      <a href="tools.html">tools</a>
      <a href="privacy.html">privacy</a>
      <span style="color:var(--border-2);">|</span>
      <a href="https://github.com/SarutobiSasuke8/Prompt-Library" target="_blank" rel="noopener">github</a>
      <a class="cta social-x" href="#" target="_blank" rel="noopener" aria-label="Follow on X">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="vertical-align:-2px; margin-right:6px;"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        follow on X
      </a>
      <a class="cta" href="https://github.com/SarutobiSasuke8/Prompt-Library/blob/main/prompt-library/CONTRIBUTING.md" target="_blank" rel="noopener">contribute a prompt</a>
    </div>
  </div>
</footer>
```

### Rules
- The active nav link gets `color:var(--accent)` — all others use `color:var(--text-dim)`.
- The avatar chip always links to `user.html?handle=SarutobiSasuke` and sits after the count pill.
- The count pill is optional on pages with no filterable list — omit it if there's nothing to count.
- Never link to `add-prompt.html` from any page. It is a local utility only.
- Update the footer nav if new top-level pages are added (update all existing pages too).

---

## Code of conduct

Be the kind of contributor you'd want to work with. Disagreement is fine;
condescension is not. English isn't everyone's first language. Review the
prompt, not the person.
