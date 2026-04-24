<div align="center">

# prompt-library

**The home base for people building seriously with AI.**

A curated resource hub — production-ready prompts, an honest AI tools directory,
an agents catalogue, methodology for thinking clearly about AI-assisted work,
and the markdown infrastructure to set up your dev environment correctly.
Zero dependencies. Zero build step. Opens in a browser tab.

[**→ Live site**](https://sarutobisasuke8.github.io/testing/)

</div>

---

## Table of contents

- [The problem](#the-problem)
- [The vision](#the-vision)
- [What's in the library](#whats-in-the-library)
- [Item taxonomy](#item-taxonomy)
- [Surface area](#surface-area)
- [Personal workspace](#personal-workspace)
- [Philosophy](#philosophy)
- [Where it's going](#where-its-going)
- [Tech stack](#tech-stack)
- [Design](#design)
- [Keyboard shortcuts](#keyboard-shortcuts)
- [Quickstart](#quickstart)
- [Adding a prompt](#adding-a-prompt)
- [Prompt schema](#prompt-schema)
- [Quality bar](#quality-bar)
- [Deploy](#deploy)
- [Project docs](#project-docs)
- [Contributing](#contributing)
- [FAQ](#faq)
- [License](#license)

---

## The problem

Most "prompt libraries" are content farms. Thousands of entries, zero curation,
and every prompt is some variation of *"act as a helpful assistant and write me
a blog post."* The signal-to-noise ratio approaches zero quickly.

The tools space is worse. Hundreds of AI tools launch every week. Most are
abandoned within six months. The coverage you find online is either breathless
hype or generic feature comparisons with no opinion on what anything is
actually good for.

The agents space is a third variant of the same problem. Every week a new
framework claims to solve autonomy; almost none are load-bearing in real work.
Separating "got 20k stars in a launch week" from "you can actually ship an
agent on top of this" takes time most people don't have.

And the methodology for using AI well — the mental models, the patterns, the
hard-won observations from people doing real work with these tools — that
knowledge is scattered across X threads, Substack posts, and private Slack
groups. None of it is findable.

This project exists because none of the above is good enough for people who
are actually building.

---

## The vision

A **high-signal resource hub** for the serious AI practitioner.

Not a marketplace. Not an aggregator. Not a directory of everything. A library
— in the old sense. Curated, opinionated, maintained by people who use these
things in real work.

### Who this is built for

- Builders shipping products, agents, or workflows with LLMs
- People who've already used ChatGPT and Claude for months — they know how to
  prompt, they want the *good* prompts
- Engineers who want honest opinions on tools, not feature tables
- Practitioners setting up Claude Code, Cursor, or an agentic pipeline who
  want the configuration files to be right from day one
- Readers deep enough to care about Karpathy's principles on LLM coding
  behaviour, Sutton's bitter lesson, and what those imply for how you work

If that's not you yet, it will be.

### The thesis

Four beliefs drive the shape of this project:

1. **Curation beats aggregation.** A library maintained by humans with taste
   is worth more than any scraped corpus — especially now that generative AI
   is flooding the commons with plausible-but-useless content.
2. **Structure beats prose.** A prompt that defines the shape of its output
   is a tool. A prompt that waves at a vibe is a wish. The same applies to
   tool write-ups, article summaries, and agent documentation.
3. **Failure modes are content.** Where a prompt breaks, where a tool falls
   short, where an agent framework leaks abstractions — those are the most
   valuable things we can tell a reader. Incomplete honesty is not useful.
4. **The substrate should be boring.** Vanilla HTML, a few JS files, static
   hosting. No framework churn. No supply chain. Outlives the fashion cycle
   so the content can keep accumulating value.

---

## What's in the library

### Prompts — 54 across 9 categories

The core of the project. Every prompt in this library:

- Solves a **specific, real problem** — not a vague task category
- Produces **structured, predictable output** — defines the shape of the answer
- Has been **tested** against at least one listed model
- States its own **failure modes** in the notes field
- Could be shown to a sceptical senior engineer without embarrassment

| Category | Focus |
|---|---|
| **Web3 & Crypto** | Token research, tokenomics analysis, sybil detection, wallet analysis |
| **AI Agents & Automation** | Research agents, RAG optimization, tool-use scaffolding, memory patterns |
| **Software Dev & Vibe Coding** | Debugging, code review, refactoring, scope definition, documentation |
| **Business & BD** | Partnership outreach, cold email, competitor analysis, stakeholder updates |
| **Marketing & Content** | X threads, newsletters, announcement copy, brand voice, contrarian takes |
| **Knowledge Management** | Obsidian notes, meeting → actions, second-brain queries, synthesis |
| **Strategy & Decision Making** | Decision frameworks, investment memos, scenario planning |
| **Gaming & GameFi** | Guild management, player scoring, economy design |
| **Evaluation & Quality** | Output scoring, hallucination detection, red-teaming |

Each prompt has: title, purpose, full system prompt, complexity level, model
recommendations, temperature, chaining suggestions, notes on where it breaks
down, and an author attribution line. Each prompt has its own permalink at
`prompt.html?id=<n>` with share button and an inline rating + comments thread.

### AI Tools Directory — 51 tools

Not a feature table. Each tool gets a real description: what it's actually
good for, when to use it over the alternatives, and where it falls short.

Groups:

- **Chat UIs** — Claude, ChatGPT, Gemini, Grok, Perplexity, Le Chat, DeepSeek
- **Coding** — Claude Code, Cursor, Windsurf, Cline, Aider, Copilot, Zed AI
- **Creative AI** — Suno, Kling AI, Higgsfield, Runway, Midjourney, ElevenLabs, Luma AI
- **Infra** — OpenRouter, Groq, Hugging Face, Replicate, Google AI Studio, Anthropic Console
- **Local / Self-host** — Ollama, LM Studio, Jan, LocalAI, GPT4All
- **Knowledge** — Obsidian, Logseq, Notion
- **Agents** — LangChain, LangGraph, CrewAI, AutoGPT, AgentOps, Composio

Every tool card links to a full detail page with logo (pulled live from Simple
Icons / Clearbit / GitHub org avatars with monogram fallback), description,
homepage, GitHub, X, pricing where relevant — no dead ends.

### Agents catalogue

A dedicated section for agent frameworks, fine-tuned models optimised for
agentic behaviour, and archetypal patterns worth studying. Each entry gets
its own detail page at `agent.html?id=<slug>` with the same rigour as tools:
context, tradeoffs, links, tags, and the same rating + comments surface.

Seed entries: **OpenClaw** (open-source framework), **Hermes** (Nous Research
fine-tuned series). Growing as the space stabilises.

### Methodology articles

The reading list for thinking seriously about AI-assisted work. Articles
covering:

- How to structure a system prompt that doesn't collapse on edge cases
- When to reach for an agent vs. a simple prompt chain
- Practical patterns for PKM with LLMs
- How professional builders are actually using these tools
- Classification via an `articleType` field so the same surface can host
  methodology, tutorials, and deeper essays without blurring

Not content-farm output. Tested thinking.

### MD Repo — developer markdown templates

A library of idealised markdown templates for AI-assisted development.
Templates you drop into your project rather than write from scratch:

- **CLAUDE.md** — project context template for Claude Code sessions
- **AGENTS.md** — production system prompt template for single agents and
  orchestrators
- **CONTRIBUTING.md** — contribution guide template for AI-assisted projects
- **Session Report Template** — the comprehensive template used for
  `sessions/` session-log files in this repo

Plus curated skill bundles:

- **andrej-karpathy-skills** — four principles derived from Karpathy's
  observations on LLM coding pitfalls (Think Before Coding / Simplicity First
  / Surgical Changes / Goal-Driven Execution). Ships drop-in CLAUDE.md,
  real-world EXAMPLES.md, and the full README. Versioned.

Each MD has its own detail page with preview, copy-to-clipboard, and a
download link for the raw file.

### Collections

Curated prompt packs built for a specific workflow — e.g. *"ship-a-feature
kit"*, *"web3 research stack"*, *"content production line"*. Collections are
aggregations of items, not items themselves. The underlying prompts keep
their own bookmarks, ratings, and comments; the collection is a
higher-level pointer.

### Playground

An in-browser scratchpad for composing and iterating on a prompt before
copying it into your tool of choice. Shares design tokens with the rest of
the site; no external API calls.

---

## Item taxonomy

Everything on the site that has a detail page is an **item**. Every item has
exactly one of five type keys, and all tooling — bookmarks, ratings, comments,
profile surfacing — uses these exact keys.

| Type | Display | Listing page | Detail page | Data |
|---|---|---|---|---|
| `prompt` | Prompt | `index.html` | `prompt.html?id=` | `prompts.js` |
| `article` | Article | `learn.html` | `article.html?id=` | `articles.js` |
| `tool` | Tool | `tools.html` | `tool.html?id=` | `tools.js` |
| `agent` | Agent | `agents.html` | `agent.html?id=` | `agents.js` |
| `doc` | MD doc | `mdrepo.html` | `md.html?id=` | `mds.js` |

Why this matters: it keeps the site coherent as it grows. A new item type
only ships if it earns a slot in this taxonomy, with the same bookmark + rating
+ comments contract as the others. No one-off special cases.

**Collections** are deliberately **not** part of the taxonomy — they
aggregate items rather than being items. That keeps their scope honest.

---

## Surface area

Every HTML file in the live site, and what it's for:

| Page | Purpose |
|---|---|
| `index.html` | Prompts — listing + search + filters |
| `prompt.html` | Single prompt detail |
| `learn.html` | Articles listing |
| `article.html` | Single article detail |
| `tools.html` | Tools directory |
| `tool.html` | Single tool detail |
| `agents.html` | Agents catalogue |
| `agent.html` | Single agent detail |
| `mdrepo.html` | MD templates listing |
| `md.html` | Single MD detail |
| `collections.html` | Curated prompt packs |
| `playground.html` | In-browser prompt scratchpad |
| `user.html` | Personal workspace (bookmarks, tools, authored, folders) |
| `about.html` | Mission, quality bar, tech notes |
| `privacy.html` | Privacy policy |
| `add-prompt.html` | **Local-only** capture utility (not linked from the site) |

Shared infrastructure (no page of their own):

| File | Role |
|---|---|
| `nav.js` | Canonical top nav — injected into every page |
| `footer.js` | Canonical footer — injected into every page |
| `bookmarks.js` | `PL_BOOKMARKS` API (localStorage-backed) |
| `ratings.js` | `PL_RATINGS.mount()` — shared rating + comments widget |
| `theme.js` | Dark / light toggle |
| `shortcuts.js` | Keyboard shortcut handlers |

---

## Personal workspace

Any visitor has a **per-browser workspace** without signing up for anything.
It lives at `user.html` and is backed entirely by `localStorage` — no account,
no server, no data leaving the tab.

What you can do today:

- **Bookmark** any prompt, article, agent, or MD template. Bookmarks surface
  in the Bookmarks panel.
- **Star tools** separately — bookmarked tools appear in the **My Tools** tab,
  treated as a personal toolkit rather than a save-for-later list.
- **Rate** any item 1–5 stars and leave comments. Stored under
  `pl_rating_<type>_<id>` and `pl_comments_<type>_<id>` keys.
- **Provisional profile folders + markdown export** — experimental surface
  for organising saved items into named folders and exporting the workspace
  as Obsidian-compatible markdown with `[[wikilinks]]` and frontmatter.

The UI is shipped. The **social layer** (ratings and comments visible to
other users, folders you can share, cross-device sync) is parked in
`ROADMAP.md` behind the v2 backend trigger. Same key format will migrate
cleanly when that lands.

---

## Philosophy

### Curation over completeness

Every entry earns its place. A smaller library with better signal is worth
more than a bigger one with noise. There is no "all submissions welcome" mode.

### Structure over hype

No "revolutionary". No "game-changing". No decorative emoji. Prompts define
the shape of their output. Tool descriptions say what a tool is bad at, not
just what it's good at. The quality bar is: *could a sceptical senior engineer
look at this and take it seriously?*

### Honest on tradeoffs

Every tool write-up includes a weak point. Every prompt notes where it breaks
down. Every agent entry says what it leaks. Incomplete honesty is not useful.

### Forkable over locked

The entire codebase is a few core files and a folder of data. You can read it
end-to-end in twenty minutes, fork it in thirty, and ship your own version by
the end of the hour. That's intentional. The knowledge in here should be easy
to take and use.

### Local-first, opt-in cloud

Everything a visitor interacts with — bookmarks, ratings, comments, folders,
export — works without a server. A backend will land when the community layer
earns it, not before, and even then the local-first behaviour stays as the
default path.

---

## Where it's going

### Now (v1) — static curated library ✅ shipped

- Prompts, tools, agents, articles, MD templates — all live
- Per-browser bookmarks, ratings, comments (UI-only, localStorage-backed)
- Provisional profile folders + markdown export
- Share buttons on every listing and detail
- Clean URLs, responsive design, keyboard-first navigation

### Next (v2) — community layer

Once there are users, the library gets social infrastructure:

- **Likes and ratings** made public — community signal on which prompts are
  actually working
- **Authenticated user profiles** — save items, publish collections, earn
  attribution on authored prompts
- **Public collections** — curated prompt packs that users build and share
- **Obsidian-native export** — promote the provisional folder/export surface
  to a first-class feature; the library becomes a node in your second brain,
  not a separate tab

Everything in v2 requires a backend (database, auth, moderation). That work
starts when usage justifies it — not before.

### Further out (v3) — integration layer

- **"Use in →" deep links** — one click to open any prompt pre-loaded into
  Claude, ChatGPT, or Perplexity without copy-pasting
- **Variable slots** — fill in `{{company}}`, `{{topic}}`, `{{constraints}}`
  before sending
- **Browser extension** — access the library from inside any AI tool without
  switching tabs
- **CLI** — `npx prompt-lib get token-research | pbcopy` for terminal-native
  workflows
- **API** — `GET /api/prompts` so other tools can consume the library
- **Model benchmarks** — same prompt, same task, compared across models
- **Prompt versioning** — track how a prompt evolves and pin a version in a
  collection

Full triggers and detail in [`ROADMAP.md`](./ROADMAP.md).

---

## Tech stack

Chosen deliberately. See [`CLAUDE.md`](./CLAUDE.md) for why each constraint
matters.

| Layer | Choice | Notes |
|---|---|---|
| HTML | Static `.html` per surface | App shell + inline runtime JS |
| Styles | `style.css` | Tokens via CSS custom properties |
| Prompt data | `prompts.js` | `CATEGORIES` + `PROMPTS` |
| Tool data | `tools.js` | `TOOL_GROUPS` + `TOOLS` |
| Article data | `articles.js` | `ARTICLES` array + `articleType` |
| Agent data | `agents.js` | `AGENT_GROUPS` + `AGENTS` |
| MD data | `mds.js` | Inline content + download paths |
| Bookmarks | `bookmarks.js` | `PL_BOOKMARKS` API (localStorage) |
| Ratings | `ratings.js` | `PL_RATINGS.mount()` shared widget |
| Capture tool | `add-prompt.html` | Local-only form → JSON output |
| Hosting | GitHub Pages | Free, CDN-backed, static |
| CI/CD | GitHub Actions | Deploys on push to `main` |
| Fonts | JetBrains Mono + Inter | Google Fonts |

**No** React. **No** Tailwind. **No** npm. **No** bundler. **No** backend.

This isn't a limitation. A searchable library of text is a textbook case
where vanilla JS wins on speed, readability, and longevity. The bundle for a
framework would outweigh the actual application code.

---

## Design

```
background   #0a0a0a   near-black — not the cliché #000
accent       #00ff88   electric green — used sparingly, always earned
text         #e6e6e6   off-white
text-dim     #9a9a9a   metadata, secondary labels
radius       2px       nearly-square, technical aesthetic
font/mono    JetBrains Mono
font/sans    Inter
```

No gradients. No glow effects. No AI-purple. Sharp, minimal, technical.

The aesthetic is deliberate: a library that takes prompts seriously should
look like it takes them seriously. If it looks like a crypto terminal from
2027, it's working.

**Bookmark button standard.** Every item card renders the bookmark button in
the top-right of the card-head row, next to the badge / complexity indicator.
Outline SVG when unsaved, filled when saved. The SVGs are byte-identical
across every page — if one drifts, that's a bug, fix it back.

---

## Keyboard shortcuts

| Key | Action |
|---|---|
| `/` | Focus the search input |
| `Esc` | Close the open modal |
| `Enter` / `Space` on a card | Open the detail modal |
| `Tab` | Navigate cards and controls |

---

## Quickstart

```bash
git clone https://github.com/SarutobiSasuke8/Prompt-Library.git
cd Prompt-Library/prompt-library
# Open index.html in a browser. No install. No serve required.
```

Or with a local server:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

---

## Adding a prompt

**Via the form (2 min per prompt):**

1. Open `add-prompt.html` locally — the red banner confirms you're in the
   right place
2. Fill every field → **Generate JSON** → **Copy**
3. Paste into `prompts.js` inside the `PROMPTS` array
4. Refresh `index.html` — the card appears immediately

**By hand:**

Copy an existing entry, bump the `id`, swap the fields. Multi-line prompts
use the pattern shown in existing entries.

Full schema and quality bar: [`CONTRIBUTING.md`](./CONTRIBUTING.md).

---

## Prompt schema

```js
{
  id:          1,                               // unique integer, never reuse
  title:       "Token Research Analyst",        // short, specific, no hype
  category:    "web3",                          // key from CATEGORIES
  complexity:  "intermediate",                  // beginner | intermediate | advanced
  purpose:     "One-line description.",
  tags:        ["research", "due-diligence"],   // lowercase, hyphenated, 2–5
  models:      ["claude", "gpt-4o"],            // actually tested
  temperature: "0.3",                           // string, not number
  prompt:      "You are a ...",                 // full system prompt
  chaining:    "Pair with X to ...",            // optional
  notes:       "Works best when ...",           // optional — failure modes
  author:      "handle"                         // attribution
}
```

Corresponding schemas for `tools.js`, `articles.js`, `agents.js`, and
`mds.js` live as header comments at the top of each file. They all share the
same spine: stable `id`, group / category key, human fields (`name`, `purpose`,
longer `context`), tags, links.

---

## Quality bar

A prompt belongs here if it:

- Solves a specific, real problem somebody actually has
- Produces structured, predictable output (defines the shape of its answer)
- Has been tested against at least one listed model
- States its own limits (notes field covers failure modes)
- Could be shown to a sceptical senior engineer without embarrassment

A prompt does **not** belong here if it:

- Uses shill language ("revolutionary", "game-changing", "cutting-edge")
- Is a generic "write me a blog post" with a fancy wrapper
- Makes promises the model can't deliver ("always factually correct")
- Was never actually tested against a model
- Contains private data, client information, or unredacted credentials

The same standard applies to tools, agents, articles, and MDs, adapted for
medium. Curation is active. Not every PR will merge. That's the point.

---

## Deploy

Deploys automatically via GitHub Actions on every push to `main` touching
`prompt-library/**`.

### One-time setup

1. Merge to `main`
2. Repo → **Settings → Pages**
3. Under **Build and deployment → Source**, select **GitHub Actions**
4. First workflow run publishes to the URL shown in the run logs

### Workflow file

[`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) — at the
repo root, not inside this folder. Uploads only the `prompt-library/`
subdirectory as the Pages artifact.

---

## Project docs

- [`CLAUDE.md`](./CLAUDE.md) — dev-facing context. Read before making
  non-trivial changes. Locks terminology, taxonomy, script ordering, and
  anti-patterns.
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — schema, quality bar, PR flow,
  page template.
- [`ROADMAP.md`](./ROADMAP.md) — what's next, what's parked, and the
  triggers for moving off static architecture.

---

## Contributing

Yes please.

**[→ CONTRIBUTING.md](./CONTRIBUTING.md)** has the full schema, quality bar,
capture form flow, and PR checklist.

Prompts, tools, articles, agents, and MD templates all welcome. The bar is
consistent across all of them: specific, tested, honest about tradeoffs.

PRs land on `main` and redeploy automatically.

---

## FAQ

**Why not React / Next / SvelteKit?**
None of this justifies the bundle. A searchable library of text is one of
the textbook cases where vanilla JS wins on every axis — speed, readability,
longevity, and forkability.

**Why no database?**
A curated library doesn't need one. When it does (public ratings, user
profiles, shared folders), that's the v2 trigger. Until then, the `.js`
data files are the database and `git log` is the audit trail.

**The profile page works — so there's a backend?**
No. The profile surface is entirely `localStorage` per browser. Nothing
leaves your tab. The UI is built out now so the social layer can be wired
in cleanly once there's demand for it; the storage format will migrate.

**What's different about agents vs. tools?**
Tools are products you use. Agents are **frameworks, fine-tuned models, and
architectural patterns** that you build on or study. They sit in a separate
catalogue so each can evolve its own criteria without blurring into the
other.

**Why the red banner on `add-prompt.html`?**
So it's never confused with the live site. It's a local dev tool that
happens to be HTML. The banner is a safety rail.

**Can I fork and run my own?**
Yes. That's the point. MIT license.

**Can I submit a prompt I don't want attributed to me?**
Open an issue with the prompt text and we'll land it without your name
attached to the commit.

**What's the selection criteria for tools?**
Stability, quality of information available to write an honest description,
and relevance to the people actually using this library. Not paid placement.
Not recency.

**Is there a way to export my bookmarks / collections?**
Provisional surface exists on `user.html` for Obsidian-style markdown export
with frontmatter and wikilinks. Format is still stabilising — feedback
welcome on the branch that shipped it.

---

## License

MIT — use it, fork it, remix it. Attribution appreciated but not required.

---

<div align="center">

*Built for people who are doing serious work with AI.*

</div>
