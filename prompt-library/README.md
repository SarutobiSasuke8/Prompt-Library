# prompt-library

> Production-ready prompts for people building with AI.

A fast, dark, searchable library of system prompts that have survived contact
with real workflows — across web3, AI agents, dev tooling, business, marketing,
PKM, strategy, gaming, and evaluation.

No frameworks. No npm. No build step. Just three files and a cold-launch
vibe. Hosted free on GitHub Pages.

---

## Live site

**→ https://sarutobisasuke8.github.io/testing/** *(active once GitHub Pages is enabled — see Deploy below)*

## Screenshot

![prompt-library screenshot](./screenshot.png) *(placeholder — add a real screenshot after first run)*

---

## What it is

A single-page static web app that renders a curated collection of prompts from
a plain JSON array. Users can:

- Search by title, purpose, or tag in real time
- Filter by one of nine categories (data-driven — add a category with one line)
- Filter by complexity: beginner, intermediate, advanced
- Click a card to see the full prompt with metadata
- Copy a prompt with one tap, either from the card or the modal
- Browse comfortably on a phone

## Why it exists

Every AI builder keeps a private scratchpad of prompts that actually work —
the ones they trust enough to use on a Monday morning. Those prompts rarely
leave the scratchpad. This is a place to publish the ones worth sharing,
with enough structure to make them findable, and enough curation to keep
the signal high.

Not a prompt marketplace. Not a content farm. A curated library.

---

## Categories

| Key            | Name                           |
|----------------|--------------------------------|
| `web3`         | Web3 & Crypto                  |
| `agents`       | AI Agents & Automation         |
| `vibe-coding`  | Software Dev & Vibe Coding     |
| `business`     | Business & BD                  |
| `marketing`    | Marketing & Content            |
| `pkm`          | Knowledge Management & PKM     |
| `strategy`     | Strategy & Decision Making     |
| `gaming`       | Gaming & GameFi                |
| `evaluation`   | Evaluation & Quality           |

Adding a new category is a two-line change. See [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## Tech stack

- `index.html` — app shell, ~380 lines with app logic
- `prompts.js` — the data, as a plain JS array
- `style.css` — dark theme, mobile-first
- `add-prompt.html` — local capture form that outputs schema-valid JS objects

Zero dependencies. No React, no Tailwind, no bundler. The point is that anyone
can fork it, open a file in a browser, and get it.

### Design

- `#0a0a0a` background
- `#00ff88` accent
- JetBrains Mono + Inter
- Sharp, technical, no purple AI-gradients

---

## Quickstart

```bash
git clone https://github.com/sarutobisasuke8/testing.git
cd testing/prompt-library
# Open index.html in your browser. That's it.
```

To add a prompt locally:

```bash
# Open add-prompt.html in your browser (it's a local utility — red banner).
# Fill the form, click Generate JSON, copy.
# Paste into prompts.js, bump the id.
# Refresh index.html to see it.
```

Full contribution workflow: [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## Deploy

The site ships via GitHub Actions to GitHub Pages. The workflow lives at
`.github/workflows/deploy.yml` and publishes the `prompt-library/`
subdirectory on every push to `main` that touches it.

One-time setup in the GitHub UI:

1. Push this branch, merge to `main`
2. Go to **Settings → Pages**
3. Under **Build and deployment → Source**, pick **GitHub Actions**
4. The workflow runs automatically; the URL appears on the Actions run

No manual build, no gh-pages branch.

---

## Roadmap

Likes, user profiles, folders, ratings — all good ideas, all require a
backend. Parked in [ROADMAP.md](./ROADMAP.md) until v1 has users asking
for them.

---

## Contributing

Yes please. The library is better with more eyes on it.

**[→ Read CONTRIBUTING.md](./CONTRIBUTING.md)** for the schema, quality bar,
and PR checklist.

---

## License

MIT — use, fork, remix. Attribution appreciated but not required.
