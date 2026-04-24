# CONTRIBUTING.md — [Project Name]

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

```js
{
  id: [next unused integer],      // never reuse a retired id
  title: "Short Name",            // no emoji, no hype, max ~40 chars
  category: "web3",               // must be a key in CATEGORIES
  complexity: "intermediate",     // beginner | intermediate | advanced
  purpose: "One-line description.", // what it produces, not what it is
  tags: ["tag-one", "tag-two"],   // 2–5, lowercase, hyphenated
  models: ["claude", "gpt-4o"],   // actually tested — don't guess
  temperature: "0.3",             // string
  prompt: "You are a ...",        // full system prompt
  chaining: "",                   // how to pair with other prompts (or "")
  notes: ""                       // failure modes, edge cases (or "")
}
```

### Steps

1. Open `add-prompt.html` locally and fill every field.
2. Click **Generate JSON → Copy**.
3. Paste into `prompts.js` inside the `PROMPTS` array. Trailing comma if not the last entry.
4. Verify in `index.html`: card renders, filters count correctly, modal opens, copy works.
5. Open a PR with title: `prompt: [title] — [category]`.

### What gets rejected

- Prompts with `models: []` (untested).
- Prompts with `purpose` longer than one sentence.
- Prompts that reproduce content from other libraries without attribution.
- Any prompt that gives financial, legal, or medical advice without explicit caveats.

---

## Adding an article

Articles live in `articles.js` as objects in the `ARTICLES` array.

```js
{
  id: [next unused integer],
  title: "Title of the Article",
  articleType: "guide",           // guide | case-study | reference | deep-dive
  summary: "One or two sentences.",
  readTime: "8 min",
  tags: ["tag-one", "tag-two"],
  author: "handle",
  content: `...markdown string...`
}
```

Articles should be 600–2000 words. They explain *why* or *how*, not just *what*.

---

## Adding an MD template

MD templates live in `mds.js` and as files in `mds/`.

1. Write the actual `.md` file in `mds/[slug].md`.
2. Add an entry to `MDS` in `mds.js` with the same `file` path and embedded `content`.
3. The card will appear automatically in `docs.html`.

---

## Code contributions

### Before you start

Check `ROADMAP.md`. If your idea is in the v2 or v3 parking lot, it needs a backend. Don't stub one.

### Standards

- No frameworks. No npm. No build step. One HTML file must be openable with `file://`.
- CSS goes in `style.css`. Per-page overrides go in a `<style>` block at the top of that page.
- JS goes inline in `<script>` tags or in a dedicated `*.js` file for shared utilities.
- No `console.log` left in merged code.
- Format: 2-space indent, single quotes in JS, double quotes in HTML attributes.

### PR checklist

Before opening a PR, confirm:

- [ ] Opened `index.html` locally and verified the core flow still works
- [ ] Tested at 375px width (Chrome DevTools)
- [ ] No new external JS dependencies added at runtime
- [ ] `localStorage` only touched in utilities that already use it (`bookmarks.js`, `add-prompt.html`)
- [ ] Session log written to `sessions/YYYY-MM-DD-description.md`

### Commit convention

```
type: short description

Types: prompt | article | md | feat | fix | style | refactor | docs | chore
```

Examples:
```
prompt: Token Research Analyst — web3
feat: add bookmark system to prompt cards
fix: modal close on Esc not firing in Firefox
```

---

## Code of conduct

- Be direct and technically precise in reviews.
- Critique the contribution, not the contributor.
- No low-effort "+1" comments — if you agree, react with 👍.
- Maintainers have final say on scope. If your PR is out of scope, it's not a rejection of you.
