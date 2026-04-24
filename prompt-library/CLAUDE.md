# CLAUDE.md — prompt-library

> Project context for future Claude sessions working in this folder.
> Read this before making changes.

---

## What this project is

A static, dark-themed, mobile-first web app that presents a curated library of
production-ready system prompts. Users search, filter, read, and copy. That's
the whole product.

It lives in `prompt-library/` inside the `sarutobisasuke8/testing` repo because
the repo is currently shared with unrelated tooling (Teneo CLI). If the project
ever moves to its own dedicated repo (`prompt-library`), the folder becomes the
repo root and `deploy.yml` needs one path change — see the note inside it.

---

## Hard architectural constraints

These were chosen deliberately. Do not "helpfully" violate them.

| Constraint                | Rationale                                             |
|---------------------------|-------------------------------------------------------|
| No frameworks             | Anyone can fork and understand the whole app in 20m.  |
| No npm / package.json     | Zero install. Zero supply chain. Zero rot.            |
| No build step             | `file://` open works. CI is a single upload action.   |
| No external JS at runtime | Fonts are the only network call. Everything else ships in-tree. |
| Data separate from UI     | `prompts.js` must stay browsable by hand.             |
| Static hosting only (v1)  | GitHub Pages tier. No backend. No DB. No env vars.    |

The first time you're tempted to add React / Tailwind / a bundler / Supabase —
don't. Read `ROADMAP.md`. Backend features are parked until v1 has users.

---

## Terminology — locked

These words have exact meanings. Use them consistently in code, UI copy,
commit messages, and docs.

- **Item** — a piece of content that has its own dedicated page. Every
  item has one of the five type keys below. Items can be bookmarked,
  rated, and commented on.
- **Card** — the *preview* of an item on a listing page. Clicking a card
  opens the item's dedicated page. A card is never the item itself; it
  is a summary rendering of one.
- **Collection** — an **aggregation of items**, not an item. Collections
  live on `collections.html` but are explicitly **not** part of the item
  taxonomy below. They have no bookmark / rating / comments affordances
  of their own (follow-up decision tracked in `ROADMAP.md`).

### Item taxonomy

Every item is one of five types. All tooling (bookmarks, ratings, comments,
profile surfacing) must use these exact type keys.

| Type key  | Display name | Listing page   | Detail page            | Data source    |
|-----------|--------------|----------------|------------------------|----------------|
| `prompt`  | Prompt       | `index.html`   | `prompt.html?id=`      | `prompts.js`   |
| `article` | Article      | `learn.html`   | `article.html?id=`     | `articles.js`  |
| `tool`    | Tool         | `tools.html`   | `tool.html?id=`        | inline in page |
| `agent`   | Agent        | `agents.html`  | inline (no detail yet) | inline         |
| `doc`     | MD doc       | `mdrepo.html`  | `md.html?id=`          | `mds.js`       |

### Bookmark behaviour per item type

- `prompt`, `article`, `agent`, `doc` → bookmarked items surface in the
  **Bookmarks panel** on `user.html`.
- `tool` → bookmarked tools surface in the **My Tools** tab on `user.html`
  (intentionally separate; tools are treated as a personal toolkit, not a
  save-for-later list).

### Bookmark button standard

Every item card renders the bookmark button in the same visual position:
**top-right of the card-head row**, next to the badge/complexity indicator.

```html
<button class="bookmark-btn [position-class]" type="button"
        aria-label="Save [Name]" aria-pressed="false">
  <!-- BM_OUTLINE when unsaved, BM_FILLED when saved -->
</button>
```

- Base class `.bookmark-btn` lives in `style.css` and owns visuals.
- Per-page position class (e.g. `.card-bookmark`, `.tool-bookmark`,
  `.agent-bm`, `.article-bm`, `.doc-bm`) provides **positioning only**.
- Toggle via `window.PL_BOOKMARKS.toggle(type, id)`.
- The bookmark SVG strings (`BM_OUTLINE` / `BM_FILLED`) are byte-identical
  across all pages. If one drifts, align it back before anything else.

---

## File layout

```
<repo root>/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Pages deploy on push to main (must live at repo root)
└── prompt-library/
    ├── index.html          # app shell + all runtime JS (inline)
    ├── learn.html          # methodology / articles listing
    ├── article.html        # single article view (driven by articles.js)
    ├── collections.html    # curated prompt packs
    ├── tools.html          # AI tools directory
    ├── about.html          # project mission, quality bar, tech specs
    ├── user.html           # user profile page
    ├── privacy.html        # privacy policy
    ├── prompts.js          # CATEGORIES map + PROMPTS array — the data
    ├── articles.js         # ARTICLES array — methodology content
    ├── style.css           # all styles; dark theme, mobile-first
    ├── theme.js            # light/dark toggle (shared across pages)
    ├── add-prompt.html     # LOCAL capture utility, not linked from site
    ├── CLAUDE.md           # this file
    ├── README.md           # public-facing project doc
    ├── CONTRIBUTING.md     # schema, quality bar, PR flow + page template
    └── ROADMAP.md          # v1 checklist + v2 parking lot
```

### Responsibility of each file

- **`prompts.js`** is the source of truth. Everything else is rendering.
- **`index.html`** never hardcodes a category. Chips are generated from
  `CATEGORIES`. Adding a category = one key-value in `CATEGORIES` + at least
  one prompt using it. The UI absorbs it.
- **`style.css`** holds all styling. `add-prompt.html` currently inlines its
  own styles to stay fully self-contained for local use — that is deliberate.
- **`add-prompt.html`** is **not** linked from `index.html`. It carries a red
  banner so it's never confused with the live site.

---

## Data schema (prompts.js)

Each entry is a plain JS object:

```js
{
  id: 1,                                   // unique integer, next unused
  title: "Token Research Analyst",         // short name, no emoji, no hype
  category: "web3",                        // must be a key in CATEGORIES
  complexity: "intermediate",              // beginner | intermediate | advanced
  purpose: "One-line description of what the prompt does.",
  tags: ["research", "due-diligence"],     // lowercase, hyphenated, 2–5
  models: ["claude", "gpt-4o"],            // models actually tested
  temperature: "0.3",                      // string, not number
  prompt: "You are a ...",                 // full system prompt, multi-line OK
  chaining: "Pair with X ...",             // can be empty string
  notes: "Works best when ..."             // can be empty string
}
```

### The nine launch categories

Defined in `CATEGORIES` at the top of `prompts.js`:

| Key           | Display name                      |
|---------------|-----------------------------------|
| `web3`        | Web3 & Crypto                     |
| `agents`      | AI Agents & Automation            |
| `vibe-coding` | Software Dev & Vibe Coding        |
| `business`    | Business & BD                     |
| `marketing`   | Marketing & Content               |
| `pkm`         | Knowledge Management & PKM        |
| `strategy`    | Strategy & Decision Making        |
| `gaming`      | Gaming & GameFi                   |
| `evaluation`  | Evaluation & Quality              |

### Current state

- **7 prompts** — all in `web3`.
- **33+ remaining** to hit the "40+ across 9 categories" launch target.
- Categories `agents`, `vibe-coding`, `business`, `marketing`, `pkm`,
  `strategy`, `gaming`, `evaluation` are **empty** and need content.

### Tone bar for prompt content

These rules apply when authoring prompt text, not just reviewing it:

- **No shill language.** Banned: "revolutionary", "next-gen", "game-changing",
  "cutting-edge", emoji used decoratively.
- **No price predictions** or investment recommendations.
- **Structured output expected.** Good prompts define the shape of the answer.
- **State limits.** The `notes` field names failure modes, not just tips.
- **Neutral, analytical register.** The target reader is a sceptical senior
  engineer or analyst, not a newsletter subscriber.
- **Tested, not imagined.** The `models` array means *actually ran it*.

---

## Design system

### Colour tokens (see `style.css` `:root`)

| Token             | Hex       | Use                                   |
|-------------------|-----------|---------------------------------------|
| `--bg`            | `#0a0a0a` | Page background                       |
| `--bg-1 / 2 / 3`  | `#101010`/`#161616`/`#1c1c1c` | Card / modal / nested surfaces |
| `--text`          | `#e6e6e6` | Primary text                          |
| `--text-dim`      | `#9a9a9a` | Secondary text                        |
| `--text-faint`    | `#5a5a5a` | Labels, placeholders                  |
| `--accent`        | `#00ff88` | Primary accent — sparingly            |
| `--accent-dim`    | `#00cc6e` | Accent hover                          |
| `--danger`        | `#ff3b3b` | Local-utility warning banner          |
| `--warn`          | `#ffb020` | Intermediate complexity badge         |

**No gradients.** Especially no purple/blue AI gradients. Keep it sharp.

### Typography

- `JetBrains Mono` — logo, labels, chips, badges, code blocks
- `Inter` — hero, card titles, body copy
- Loaded via Google Fonts `<link>` in `index.html`

### Shape

- `--radius: 2px` — nearly-square corners throughout. Technical aesthetic.
- Borders over shadows. `1px solid var(--border)` everywhere.

### Mobile first

- Base styles target phones (single-column grid, 18px padding, 15px type).
- `@media (min-width: 640px)` — 2-column grid.
- `@media (min-width: 1000px)` — 3-column grid.
- `@media (min-width: 720px)` — hero type grows.
- Always test at 375px wide before shipping.

---

## UI features implemented

- **Sticky header** with logo + live count of filtered prompts
- **Hero** with tagline
- **Live search** — filters title, purpose, tags in real time
- **Category chips** — data-driven from `CATEGORIES`, per-chip counts
- **Complexity chips** — all / beginner / intermediate / advanced
- **Card grid** — responsive 1 → 2 → 3 cols
- **In-card copy button** — clipboard icon, bottom-right of card, copies
  prompt without opening modal (uses `e.stopPropagation()`)
- **Modal** — full prompt, metadata grid, chaining, notes, dedicated copy
  button, close on Esc / backdrop click
- **Toast** — bottom-centre copy confirmation
- **Keyboard shortcuts** — `/` focuses search; `Esc` closes modal;
  Enter/Space on a card opens modal
- **Empty state** — when no results match filters + query
- **Accessibility** — `role`, `aria-label`, `aria-live`, focus-visible
  outlines, tap targets ≥ 28px

### Card markup anatomy

The card is a `<div role="button" tabindex="0">` (not a native `<button>`)
because it contains a nested copy `<button>` — nested buttons are invalid
HTML. The div handles click + keydown for accessibility.

---

## `add-prompt.html` — local capture utility

Purpose: take the friction out of adding a prompt. Target: 2 minutes per
entry.

- Opens as a local file (`file://`) — no hosting, no internet needed.
- Red `⚠ Local utility` banner at the top so it's unmistakably not the live
  site.
- Autoincrements `id` via `localStorage` (`promptLibrary.lastId`).
- Outputs a JS object literal in the same hand-authored style as the rest of
  `prompts.js` (unquoted keys, double-quoted strings, multi-line prompts
  split across `+`-joined lines).
- Copy button uses `navigator.clipboard` with `execCommand` fallback.

### Do not

- Do not link to it from `index.html`.
- Do not remove the warning banner.
- Do not change the output format without also updating existing entries —
  the file is hand-editable and consistency matters.

---

## Page template standard

Every `.html` page **must** use the shared `nav.js` + `footer.js` mount
helpers. The full markup is in `CONTRIBUTING.md` under "Adding a new page".

### Mount-div contract

Pages declare two empty mount divs. On DOMContentLoaded the helpers replace
each div's `outerHTML` with the canonical header/footer markup. The mount
div's `innerHTML` is preserved as a slot.

**Header — `<div id="site-nav" data-active="<key>" data-sub="<label>">…pill slot…</div>`**
- `data-active`: one of `library`, `methodology`, `collections`, `tools`,
  `agents`, `playground`, `about`. Use `""` (empty) on pages with no
  top-level nav highlight (`user`, `privacy`).
- `data-sub`: short string shown after the logo in `<span class="sub">`
  (e.g. `curated`, `learn`, `tools`).
- `innerHTML`: optional pill markup (a `.count-pill`, read-time pill, etc.)
  rendered inline in the header. Omit the div's innerHTML to render no pill.

**Footer — `<div id="site-footer">…extras slot…</div>`**
- `innerHTML`: optional extra links appended after "contribute a prompt"
  (e.g. `download json` / `download csv` on index). Omit for the default.

### Canonical nav links (order)
```
library · methodology · collections · tools · agents · playground · about
```
Active page link uses `color:var(--accent)`. All others use `color:var(--text-dim)`.

### Canonical footer link order
```
library · methodology · collections · tools · agents · playground · about · privacy  |  github · [X button]  [extras slot]  [contribute a prompt]
© 2025 prompt-library · MIT license
```

### Script ordering (required, on every page)

The hard rule: **`nav.js` and `footer.js` must run before any inline script
that queries a `nav.js`/`footer.js`-injected element** (`#nav-sub`,
`#theme-toggle`, `#count-num`, `#count-label`, `#header-count`,
`#header-pill`, `#nav-burger`, etc.). The pill slot IDs also count — they
live inside the mount div until `nav.js` rewrites it, then land in the
injected header with their IDs intact.

Canonical ordering for a page with no page-specific inline script:

```html
<!-- optional data scripts first: prompts.js, articles.js -->
<script src="nav.js"></script>
<script src="footer.js"></script>
<script src="theme.js"></script>
<script defer src="shortcuts.js"></script>
```

For pages with an inline IIFE that touches injected elements (`user.html`,
`collections.html`, `tools.html`, `article.html`, `learn.html`,
`index.html`, `playground.html`), `nav.js` + `footer.js` must be placed
**immediately before** that inline script, not at the end of the body:

```html
<script src="prompts.js"></script>
<script src="nav.js"></script>      <!-- before the inline script -->
<script src="footer.js"></script>
<script>(function () { /* touches #count-num, #nav-sub, etc. */ })();</script>
<script src="theme.js"></script>
<script defer src="shortcuts.js"></script>
```

`theme.js` binds to `#theme-toggle` so it must run after `nav.js`.
`shortcuts.js` is `defer`, so its position is cosmetic.

### Do not
- Hardcode a `<header class="site-header">` or `<footer class="site-footer">`
  inline on any page. The only canonical headers/footers live in
  `nav.js` / `footer.js`. Drift = bug.
- Add "profile" as a nav link — the avatar chip (injected by `nav.js`)
  handles that.
- Reorder the bottom scripts. Changing ordering without updating this
  section is not allowed.
- Add a new nav link by editing individual pages. Add it to the `LINKS`
  array in `nav.js` (and `footer.js`) once; all pages pick it up.

---

## Adding a new prompt

### Via the form (preferred)

1. Open `add-prompt.html` locally.
2. Fill every field. Confirm `id` is the next unused integer.
3. Click **Generate JSON** → **Copy**.
4. Paste into `prompts.js` inside the `PROMPTS` array, before the closing
   `];`. Ensure a trailing comma if not the last entry.
5. Open `index.html` and verify the card renders, filters count correctly,
   modal opens, copy works.

### By hand

Clone an existing object as a template. Bump the `id`. Ensure `category` is
a real key in `CATEGORIES`. Keep the multi-line prompt formatting consistent
with neighbours.

---

## Adding a new category

Three steps, and only one touches the UI — in `prompts.js`:

1. Add `"key": "Display Name"` to the `CATEGORIES` object.
2. Add at least two prompts with `category: "key"`.
3. Optionally update `CONTRIBUTING.md` / `README.md` / `CLAUDE.md` category
   tables.

The filter chip auto-appears. No changes to `index.html` are needed.

---

## Deploying

GitHub Actions workflow: `.github/workflows/deploy.yml` — located at the
**repo root**, not inside `prompt-library/`. GitHub Actions only recognizes
workflow files at `<repo-root>/.github/workflows/`.

- Trigger: push to `main` touching `prompt-library/**` or the workflow itself
- Also has `workflow_dispatch` for manual runs
- Publishes the `prompt-library/` subdirectory (not the repo root)
- Uses `actions/configure-pages@v5`, `upload-pages-artifact@v3`,
  `deploy-pages@v4`

### One-time repo setup (GitHub UI only — cannot be automated)

1. Repo → **Settings → Pages**
2. **Build and deployment → Source:** `GitHub Actions`
3. First push to `main` triggers the deploy; URL appears in Actions run logs

### URL

While living inside the `testing` repo, the deploy URL is:
`https://sarutobisasuke8.github.io/testing/`

When moved to a dedicated `prompt-library` repo, change `path: ./prompt-library`
to `path: .` in `deploy.yml`. URL becomes
`https://sarutobisasuke8.github.io/prompt-library/`.

---

## Roadmap summary

See `ROADMAP.md` for full detail. Short version:

- **v1 (now):** static curated library → ship → get users
- **v2 (parked):** likes, user profiles, folders, ratings — all require a
  **backend** (DB + auth + server runtime + moderation). Do not start until
  at least one of these is true: 100+ weekly users, 3+ users asking for the
  same feature, or a concrete data-model opinion backed by usage data.
- **v3 (speculative):** prompt versioning, chaining builder, model
  benchmarks, API, browser extension, paid tier.

---

## Common anti-patterns — don't

- **Don't add a framework "just for this one thing".** If the task seems to
  need one, the task is wrong.
- **Don't persist anything to `localStorage` in the live site.** The one
  exception is `add-prompt.html`'s id tracker, which is local-utility only.
- **Don't couple the UI to a specific set of categories.** Read `CATEGORIES`.
- **Don't add analytics scripts, tracker pixels, or third-party embeds.**
- **Don't add a backend stub "so it's ready later".** You'll build the wrong
  stub. `ROADMAP.md` exists precisely to stop this.
- **Don't reformat `prompts.js` with a prettifier.** The multi-line string
  layout is intentional and hand-edit-friendly.
- **Don't regenerate IDs.** They're stable identifiers; external links may
  one day reference them.

---

## Testing checklist

Run these locally (open `index.html` in a browser) before any PR:

- [ ] All cards render
- [ ] Count in the header pill reflects current filter set
- [ ] Category filter counts match the underlying data
- [ ] Complexity filter works for all 3 levels
- [ ] Search finds prompts by title, purpose, and tag (try "airdrop")
- [ ] Clicking a card opens the modal with correct content
- [ ] In-card copy button works without opening the modal
- [ ] Modal copy button works
- [ ] Toast appears briefly on copy
- [ ] Esc closes the modal
- [ ] `/` focuses the search input
- [ ] Mobile (browser devtools @ 375px) — grid single-column, all text
      readable, tap targets usable
- [ ] New prompts from `add-prompt.html` paste cleanly and render

---

## Session history (what Claude has built so far)

1. **Phase 1** — scaffolding: folder + 7 empty files committed
2. **Phase 2 (partial)** — 7 web3 prompts in `prompts.js` (token research,
   whitepaper summarizer, tokenomics, airdrop farmer detector, sentiment,
   ecosystem health, wallet scorer). Categories 2–9 still empty.
3. **Phase 3 + 4** — `index.html` + `style.css` + `add-prompt.html` built,
   data-driven category chips, keyboard shortcuts, modal, clipboard.
4. **Phase 5** — deploy workflow, CONTRIBUTING, README, ROADMAP. In-card
   copy button added. CLAUDE.md (this file) added.

### Work branch

All development has happened on `claude/prompt-library-app-LQzGJ`. Merge to
`main` to trigger the Pages deploy.

---

## When in doubt

- **Product questions** → consult the user. Tone, categories, scope.
- **Scope creep** → point at `ROADMAP.md` before building.
- **"Should I add a library for this?"** → no.
- **"Is this prompt good enough?"** → read `CONTRIBUTING.md` quality bar;
  if still unsure, flag it in the PR rather than silently accepting.
