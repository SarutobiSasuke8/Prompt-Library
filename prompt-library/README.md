<div align="center">

# prompt-library

### The operating manual for people who build with AI.

A curated, opinionated, forkable library for the serious AI practitioner —
production-ready prompts, an honest tools directory, an agents catalogue,
methodology essays worth reading, and the markdown infrastructure to set up
your dev environment correctly on day one.

Zero dependencies. Zero build step. Opens in a browser tab.
Works on your phone. Ships on push to `main`.

[**→ Live site**](https://sarutobisasuke8.github.io/testing/)

</div>

---

## Table of contents

- [Why this exists](#why-this-exists)
- [The bet](#the-bet)
- [Who this is for](#who-this-is-for)
- [What you get today](#what-you-get-today)
- [The reader's journey](#the-readers-journey)
- [Principles](#principles)
- [The roadmap in one page](#the-roadmap-in-one-page)
- [The endgame](#the-endgame)
- [Item taxonomy](#item-taxonomy)
- [Surface area](#surface-area)
- [Personal workspace](#personal-workspace)
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

## Why this exists

> The frontier is moving fast. The signal isn't.

Two years in, working seriously with LLMs is its own profession. People who
treat these models as infrastructure — shipping agents, shipping products,
composing pipelines, running research loops — are already operating in a
genuinely new discipline. There is no textbook for it. There is no Stack
Overflow. Most of the hard-won knowledge lives in DMs, closed Slacks, and
scattered X threads that vanish in 48 hours.

What does exist online is, charitably, a mess:

- **Prompt libraries are content farms.** Thousands of entries, zero
  curation. Every prompt is some variation of *"act as a helpful assistant
  and write me a blog post."* Signal-to-noise approaches zero on contact.
- **Tool coverage is hype or feature tables.** Breathless launch posts on
  one end, sterile comparison grids on the other. Neither tells you when to
  reach for Claude Code over Cursor, or why a specific inference provider
  falls apart under real load.
- **The agents space is a gold rush of abandoned GitHubs.** Every week a
  new framework promises autonomy. Almost none of them are load-bearing in
  real work. Separating "20k stars in a launch week" from "you can ship on
  this in production" is full-time archaeology.
- **Methodology is unfindable.** The mental models and patterns that make
  the difference between using AI well and flailing with it live in
  scattered threads, half-indexed Substacks, and private group chats. You
  can't search for them. You trip over them, or you don't.
- **The IDE-native layer is undocumented.** Claude Code, Cursor, Codex,
  agentic CLIs — the config files that make these tools actually productive
  (CLAUDE.md, AGENTS.md, skill bundles) are passed around as gists. There's
  no canonical place for them.

The aggregate cost of this mess, measured across everyone trying to build
well with AI right now, is enormous. Every practitioner is reinventing the
same wheel — hunting for the right prompt, the right tool, the right
config, the right essay — for a field that is itself reinventing itself
every quarter.

Something should exist that absorbs that cost once, on behalf of everyone.

**That's what this is.**

---

## The bet

Four things are true at the same time, and that combination is the wedge:

1. **AI-native work is becoming a real profession.** Not a hobby. Not a
   side-skill. People are shipping agents into production, running
   research pipelines, and architecting systems whose core logic is a
   prompt. This cohort is growing fast and has nowhere to go for
   practitioner-grade resources.
2. **Generative AI is destroying the open web as a signal source.** Every
   listicle, every "best prompts of 2025" post, every feature comparison
   is increasingly written by the thing it's describing. Human-curated
   human-voice resources are about to become more valuable, not less.
3. **The craft has structure worth codifying.** Good prompts share
   properties. Good agent designs share properties. Good IDE-config files
   share properties. A library that distils those properties — and calls
   them out by name — compounds in value the longer it exists.
4. **Static infrastructure is enough, for now.** A searchable library of
   text, backed by a few JS files and GitHub Pages, can serve the
   practitioner audience at near-zero cost and ship changes in seconds.
   The moment you need a backend, you will know. Not before.

The bet is that a small, opinionated, aggressively curated resource — shipped
on boring infrastructure, maintained by people actually using these tools —
can become the canonical reference for this audience.

Not the biggest. The **sharpest**.

---

## Who this is for

This library is built for one reader at a time. If you recognise yourself in
any of these scenarios, you're who this exists for.

**The founder-engineer at 11pm.** You just landed a contract to build an
agentic research pipeline. You've used Claude for six months but you've
never orchestrated four agents in a loop before. You don't need another
"intro to prompt engineering" post. You need a working research-agent
prompt that returns structured output, a tool-selection rubric, and a list
of agent frameworks where the author actually shipped something. You need
it in the next hour.

**The contractor briefing a client.** You've just been asked which AI
coding tool the team should standardise on. You personally use all of
them. You need a single URL you can send where the tradeoffs are written
down honestly — not a feature grid, not a sponsored comparison — so the
client can make their own call without a three-day call loop.

**The analyst setting up their second brain.** You've decided that every
meeting transcript, every research document, every longform answer from
Claude should land in your Obsidian vault. You need a battle-tested system
prompt for meeting → actions. You need a template for an AI-assisted PKM
workflow. You need someone to have already thought about the failure modes.

**The researcher testing the frontier.** You want to compare how Hermes,
GPT-5, and Claude Opus behave on the same agentic task. You don't need to
read another thread announcing a model launch. You need a library of
tested prompts, a catalogue of agent-grade models, and a methodology for
running the comparison cleanly.

**The open-source contributor.** You want to see how other people are
structuring their CLAUDE.md, their AGENTS.md, their skill bundles. Not a
vague blog post about "documenting for agents." The actual file, in the
format that works, with the reasoning written down.

**The builder setting up from scratch.** You just forked this repo for
your own domain. You want to understand the whole project in twenty
minutes, swap the content, ship your own vertical library. Static, no
dependencies, no lock-in, no vendor relationship with anyone. Done.

If you're not one of these people yet but you're heading in this direction,
you will be. This library is built to still make sense to you when you are.

---

## What you get today

The site is live, read-only, and already load-bearing in real practitioner
workflows. What's shipped right now:

### A library of 54 prompts across 9 categories

Web3, AI agents, software dev, business & BD, marketing, PKM, strategy,
gaming, evaluation. Each prompt is a real tool, not a template. Each one:

- Solves a specific, named problem — not "write me a blog post"
- Defines the shape of its own output — structured, predictable, parseable
- Has been tested against at least one listed model — and says which
- States where it breaks down — the `notes` field is mandatory
- Would survive being shown to a sceptical senior engineer without embarrassment
- Can be copied, shared, opened in the playground, or sent toward a preferred
  chat tool from the card or detail page

Every prompt has its own permalink, its own complexity level, model
recommendations, temperature, chaining suggestions, an author attribution
line, and — on the detail page — a rating and comments surface that
practitioners can already start using. Prompts with `{{VARIABLE}}` slots render
a quick-fill panel so reusable prompts can be tailored before copying or sent
to the playground with the filled values intact.

### An honest tools directory — 51 entries

Chat UIs, coding tools, creative AI, inference infra, local / self-host,
knowledge managers, agent frameworks. Every card links to a detail page
with a real description. Not a feature table. Not a press release. Each
write-up names what the tool is actually good for, when to reach for it
over the alternatives, and **where it falls short** — because a directory
that can't tell you what to avoid is not load-bearing.

Logos resolve live from Simple Icons, Clearbit, or GitHub org avatars, with
a monogram fallback. Nothing is stubbed. Nothing is dead.

### An agents catalogue

Frameworks, fine-tuned models optimised for agentic behaviour, and
architectural patterns worth studying — seeded and growing. OpenClaw,
Hermes, and more to come. A peer surface to tools, not a sub-section,
because agent infrastructure is its own discipline and deserves its own
criteria.

### Methodology essays

The reading list for thinking seriously about AI-assisted work. How to
structure a system prompt that doesn't collapse on edge cases. When to
reach for an agent vs. a simple prompt chain. PKM patterns that scale.
Real practitioner observations — not content-farm output. Each essay has
a classification (`methodology`, `guide`, `tutorial`, ...) so the same
surface can host depth and breadth without blurring.

### An MD repo — the config-file library

The files that make your AI IDE productive, collected in one place:

- **CLAUDE.md** — project context template for Claude Code sessions
- **AGENTS.md** — production system prompt template for single agents and
  orchestrators
- **CONTRIBUTING.md** — contribution guide template for AI-assisted projects
- **Session Report Template** — the comprehensive session-log format used
  to maintain continuity across Claude Code sessions on this repo
- **andrej-karpathy-skills** — a versioned skill bundle distilled from
  Karpathy's observations on LLM coding pitfalls (Think Before Coding /
  Simplicity First / Surgical Changes / Goal-Driven Execution), shipping
  drop-in CLAUDE.md, a real EXAMPLES.md, and the full README

Each MD has a preview, copy-to-clipboard, and a download for the raw file.

### Collections

Curated prompt packs built for a specific workflow — *"ship-a-feature
kit"*, *"web3 research stack"*, *"content production line"*. Aggregations
of items, not items themselves. The individual prompts keep their own
bookmarks, ratings, and comments; the collection is a higher-level
pointer for people who want a ready-made workflow rather than individual
parts.

### A personal workspace, no sign-up required

Every visitor has a workspace. It lives at `user.html` and is backed
entirely by `localStorage`. Bookmark any prompt, article, agent, or MD.
Star tools into a personal toolkit. Rate and comment on anything. Sort
saved items into provisional folders. Export the workspace as
Obsidian-compatible markdown with `[[wikilinks]]` and frontmatter — drop
the whole library into your second brain as a collection of linked notes.

No account. No server. Nothing leaves the tab. The UI is built now so the
social layer can slot in cleanly when v2 lands; the storage keys will
migrate.

### An in-browser playground

A scratchpad for composing and iterating on a prompt before copying it
into your tool of choice. Shares design tokens with the rest of the site.
No external API calls. No telemetry.

---

## The reader's journey

The library is designed to work at three different levels of engagement.
Each level is a real path we've watched real people take.

**Level 1 — the drive-by.** You land on the site because someone linked a
single prompt or tool page. You copy what you came for. You leave. The
page loaded in under a second, the content made sense on a phone, nothing
popped up asking for your email. **This is a success**, and it's the most
common use by volume. Optimise for it first.

**Level 2 — the bookmarker.** You realise there's more than one thing
here worth keeping. You start hitting the bookmark button on prompts,
starring tools into your personal toolkit, rating the one or two prompts
you've now actually used in anger. Your `user.html` page starts to look
like a working toolkit. Eventually you dump it into your Obsidian vault.
The library is now part of your second brain.

**Level 3 — the contributor.** You realise you have something worth
adding. A prompt that works. A tool that's missing. A critique of an
existing write-up. You open a PR. The schema is in `CONTRIBUTING.md`;
the capture form is in `add-prompt.html`; the quality bar is written
down. Your contribution ships on the next push to `main`.

The design philosophy is that level 1 must never tax level 3, and level 3
must keep level 1 honest. A library that made drive-by usage painful to
collect emails would poison the funnel that makes contributors show up
in the first place.

---

## Principles

Not aspirations. These are load-bearing decisions that constrain every
addition.

### 1. Curation over completeness

Every entry earns its place by being useful, specific, and tested. A
smaller library with better signal is worth more than a bigger one with
noise. The "all submissions welcome" mode is what destroyed every other
prompt library. We do not run it.

### 2. Structure over hype

No "revolutionary". No "game-changing". No "next-gen". No decorative
emoji in content. Prompts define the shape of their output. Tool
descriptions name what a tool is bad at. Agent entries say what leaks.
The quality bar is *would a sceptical senior engineer take this
seriously?* — and if the answer is no, the entry does not ship.

### 3. Failure modes are content

Where a prompt breaks is at least as valuable as what it does well. The
`notes` field on every prompt is mandatory. Every tool write-up includes
a weak point. Every agent description says what it leaks. Incomplete
honesty is not useful to a practitioner with real work to do.

### 4. Local-first, opt-in cloud

Everything a visitor interacts with — bookmarks, ratings, comments,
folders, export — works without a server. When the social layer lands,
it will sync cross-device, not *replace* the local mode. Your workspace
is yours. The library is a good citizen of your browser, not a pretext
to start a data relationship with you.

### 5. The substrate should be boring

Vanilla HTML. A few JS files. CSS custom properties. Static hosting.
Fonts are the only network call. The bundle for a framework would
outweigh the actual application code. Boring infrastructure means we
can spend all of our effort on the content — the thing that actually
differentiates this — and that the project outlives the current fashion
cycle in web tooling.

### 6. Forkable over locked

You can read the entire codebase in twenty minutes, fork it in thirty,
and ship your own vertical library by the end of the hour. That's
deliberate. The knowledge in here should be easy to take and use. MIT
license. No "source available but don't you dare." If someone forks
this and makes a better version, that is a win for the audience, which
is the only thing that matters.

### 7. No dark patterns, ever

No email capture wall. No cookie consent theatre. No "sign up to read
more." No paid placement in the tools directory. No SEO-bait category
pages. No trackers. No analytics that phone home. The contract with the
reader is: the thing you clicked on loads, you read it, you leave or
you stay — your choice, uncoerced.

---

## The roadmap in one page

### Now — v1 — static curated library ✅ shipped

The thing you are reading about. Library of prompts, tools, agents,
articles, MDs, collections. Per-browser bookmarks, ratings, comments,
folders, export. Share buttons. Clean URLs. Keyboard-first. Mobile
first. Every item on an identical rail: same taxonomy, same bookmark
contract, same rating + comments surface.

### Next — v2 — the community layer

Once there is usage, the library grows a social layer. **Everything
below requires a backend** (database, auth, moderation, rate-limits,
privacy policy). We do not start until v1 has real users asking for it.

- **Public ratings and comments.** The locally-stored data migrates
  cleanly into a server-backed version. Suddenly the library has
  community signal on which prompts actually work in practice — something
  the content farms can't credibly fake.
- **Authenticated profiles.** `/u/<handle>`. Submitted prompts, published
  collections, attribution on the work you contributed.
- **Published collections.** Your "ship-a-feature kit" becomes shareable
  by URL. Other people can clone it into their own profile, fork it,
  adapt it.
- **First-class Obsidian / second-brain export.** The provisional surface
  becomes a real feature. Pull the entire library into your vault with a
  single command. Sync bookmarks. The library becomes a node graph inside
  your PKM, not a separate browser tab.
- **Moderation tooling.** Because curation at scale needs infrastructure,
  not vibes.

### Further out — v3 — the integration layer

The library becomes part of the fabric of AI-native workflows.

- **"Use in →" deep links.** One click to open any prompt pre-loaded
  into Claude, ChatGPT, Perplexity, Cursor, or Claude Code — no
  copy-paste.
- **Variable slots.** Fill in `{{company}}`, `{{topic}}`,
  `{{constraints}}` inside the browser before sending. The library
  becomes a template engine for your prompts.
- **Prompt versioning.** Track how a prompt evolves. Pin a version in a
  collection. Diff against the latest.
- **Browser extension.** Access the library from inside Claude,
  ChatGPT, Cursor, or anywhere else. Bookmark things from the outside
  in.
- **CLI.** `npx prompt-lib get token-research | pbcopy`. The library
  is now terminal-native. Pipelines compose against it.
- **API.** `GET /api/prompts`. Other tools consume the library as a
  data source — agentic assistants that can reach into a curated set
  of production-ready prompts on demand.
- **Model benchmarks.** Same prompt, same task, same grading rubric,
  compared across models. Backed by the tested/untested field that
  already exists in the schema.
- **MD-repo as package.** `npx prompt-lib init` drops the right
  CLAUDE.md / AGENTS.md / skill bundles into a fresh repo. The IDE-
  config layer ships as a installable kit, not just a set of files to
  copy-paste.

All of this is parked, with triggers, in [`ROADMAP.md`](./ROADMAP.md).

---

## The endgame

**The canonical practitioner reference for building with AI.**

Three years from now, when a senior engineer joins a team that is shipping
an agentic product, the onboarding link they get on day one is this site.
Not as a nice-to-have. As the reference.

When a founder briefs a contractor on their AI coding stack, they link a
tool-directory page here rather than writing a doc from scratch.

When a new agent framework launches, people check its entry here before
deciding whether to adopt it — and the framework authors care about
getting that entry right, because the audience that reads it is the
audience that ships.

When a practitioner writes a new methodology essay, the first thing they
do is see whether it belongs in this library, because that's where the
readers who would benefit from it are.

The library becomes load-bearing infrastructure for a profession that
didn't exist five years ago. The fact that it runs on a few KB of HTML
served from GitHub Pages, with no frameworks and no backend until the
community earns it, is the point.

Small surface. High trust. Long half-life.

That's the project.

---

## Item taxonomy

Everything on the site that has a detail page is an **item**. Every item
has exactly one of five type keys, and all tooling — bookmarks, ratings,
comments, profile surfacing — uses these exact keys. This is the contract
that keeps the site coherent as it grows.

| Type | Display | Listing page | Detail page | Data |
|---|---|---|---|---|
| `prompt` | Prompt | `index.html` | `prompt.html?id=` | `prompts.js` |
| `article` | Article | `learn.html` | `article.html?id=` | `articles.js` |
| `tool` | Tool | `tools.html` | `tool.html?id=` | `tools.js` |
| `agent` | Agent | `agents.html` | `agent.html?id=` | `agents.js` |
| `doc` | MD doc | `mdrepo.html` | `md.html?id=` | `mds.js` |

A new item type only ships if it earns a slot in this taxonomy, with the
same bookmark + rating + comments contract as the others. No one-off
special cases. **Collections** are deliberately **not** part of the
taxonomy — they aggregate items rather than being items.

---

## Surface area

Every HTML file in the live site, and what it's for.

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
| `user.html` | Personal workspace (bookmarks, tools, folders, export) |
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

Any visitor has a **per-browser workspace** without signing up for
anything. It lives at `user.html` and is backed entirely by
`localStorage` — no account, no server, no data leaving the tab.

What you can do today:

- **Bookmark** any prompt, article, agent, or MD template. Bookmarks
  surface in the Bookmarks panel on your profile.
- **Star tools** separately — bookmarked tools appear in the **My Tools**
  tab, treated as a personal toolkit rather than a save-for-later list.
- **Rate** any item 1–5 stars and leave comments. Stored under
  `pl_rating_<type>_<id>` and `pl_comments_<type>_<id>` keys.
- **Organise into provisional folders** — group saved items into named
  folders for workflows you reach for repeatedly.
- **Export as Obsidian-compatible markdown** — dump your workspace as
  linked markdown files with `[[wikilinks]]` and frontmatter. Drop the
  archive into your vault. The library is now part of your second brain.

The UI is shipped. The **social layer** (ratings and comments visible to
other users, shareable folders, cross-device sync) is parked in
[`ROADMAP.md`](./ROADMAP.md) behind the v2 backend trigger. The storage
keys will migrate cleanly when it lands.

---

## Tech stack

Chosen deliberately. See [`CLAUDE.md`](./CLAUDE.md) for why each
constraint matters.

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
| Fonts | JetBrains Mono + Inter | Google Fonts — only network call |

**No** React. **No** Tailwind. **No** npm. **No** bundler. **No**
backend. **No** trackers. **No** cookies.

This isn't a limitation. A searchable library of text is a textbook case
where vanilla JS wins on speed, readability, and longevity. The bundle
for a framework would outweigh the actual application code.

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

The aesthetic is deliberate: a library that takes prompts seriously
should look like it takes them seriously. If it looks like a crypto
terminal from 2027, it's working.

**Bookmark button standard.** Every item card renders the bookmark
button in the top-right of the card-head row, next to the badge /
complexity indicator. Outline SVG when unsaved, filled when saved. The
SVGs are byte-identical across every page — if one drifts, that's a bug,
fix it back.

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

1. Open `add-prompt.html` locally — the red banner confirms you're in
   the right place
2. Fill every field → **Generate JSON** → **Copy**
3. Paste into `prompts.js` inside the `PROMPTS` array
4. Refresh `index.html` — the card appears immediately

**By hand:**

Copy an existing entry, bump the `id`, swap the fields. Multi-line
prompts use the pattern shown in existing entries.

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
  variables: [                                  // optional quick-fill slots
    { key: "ASSET_NAME", label: "Asset", placeholder: "e.g. Uniswap" }
  ],
  prompt:      "You are a ...",                 // full system prompt
  chaining:    "Pair with X to ...",            // optional
  notes:       "Works best when ...",           // optional — failure modes
  author:      "handle"                         // attribution
}
```

Corresponding schemas for `tools.js`, `articles.js`, `agents.js`, and
`mds.js` live as header comments at the top of each file. They share the
same spine: stable `id`, group / category key, human fields (`name`,
`purpose`, longer `context`), tags, links.

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

The same standard applies to tools, agents, articles, and MDs, adapted
for medium. Curation is active. Not every PR will merge. That's the
point.

---

## Deploy

Deploys automatically via GitHub Actions on every push to `main`
touching `prompt-library/**`.

### One-time setup

1. Merge to `main`
2. Repo → **Settings → Pages**
3. Under **Build and deployment → Source**, select **GitHub Actions**
4. First workflow run publishes to the URL shown in the run logs

### Workflow file

[`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) — at
the repo root, not inside this folder. Uploads only the
`prompt-library/` subdirectory as the Pages artifact.

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

**[→ CONTRIBUTING.md](./CONTRIBUTING.md)** has the full schema, quality
bar, capture form flow, and PR checklist.

Prompts, tools, articles, agents, and MD templates all welcome. The bar
is consistent across all of them: specific, tested, honest about
tradeoffs.

PRs land on `main` and redeploy automatically.

---

## FAQ

**Why not React / Next / SvelteKit?**
None of this justifies the bundle. A searchable library of text is one
of the textbook cases where vanilla JS wins on every axis — speed,
readability, longevity, and forkability. The moment we need a framework,
we will probably be wrong about needing it.

**Why no database?**
A curated library doesn't need one. When it does (public ratings, user
profiles, shared folders), that's the v2 trigger. Until then, the `.js`
data files are the database and `git log` is the audit trail.

**The profile page works — so there's a backend?**
No. The profile surface is entirely `localStorage` per browser. Nothing
leaves your tab. The UI is built out now so the social layer can be wired
in cleanly once there's demand for it; the storage format will migrate.

**What's different about agents vs. tools?**
Tools are products you use. Agents are **frameworks, fine-tuned models,
and architectural patterns** that you build on or study. They sit in a
separate catalogue so each can evolve its own criteria without blurring
into the other.

**Why the red banner on `add-prompt.html`?**
So it's never confused with the live site. It's a local dev tool that
happens to be HTML. The banner is a safety rail.

**Can I fork and run my own?**
Yes. That's the point. MIT license.

**Can I submit a prompt I don't want attributed to me?**
Open an issue with the prompt text and we'll land it without your name
attached to the commit.

**What's the selection criteria for tools?**
Stability, quality of information available to write an honest
description, and relevance to the people actually using this library.
Not paid placement. Not recency.

**Is there a way to export my bookmarks / collections?**
Yes — the profile has a provisional Obsidian-style markdown export with
frontmatter and `[[wikilinks]]`. Format is still stabilising; feedback
welcome.

**How do I know this won't just become another content farm?**
The bar is written down. Curation is active. Not every PR merges.
And the incentive structure stops us: there's no ads, no SEO bait, no
paid placement. Nobody benefits from the library getting noisier.

**What happens when LLMs can generate all of this on demand?**
A curated human-maintained reference is more valuable in that world, not
less. Generative AI makes the commons noisier. That makes a trusted
curated node — maintained by people who use the tools and name failure
modes honestly — more load-bearing, not obsolete.

---

## License

MIT — use it, fork it, remix it. Attribution appreciated but not required.

---

<div align="center">

*Built for people who are doing serious work with AI.*

*Small surface. High trust. Long half-life.*

</div>
