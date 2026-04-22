---
id: 2026-04-22-frontend-visual-refresh
date: 2026-04-22
started: 2026-04-22T20:19:00Z
project: [[prompt-library]]
repo: [[sarutobisasuke8/testing]]
branch: claude/create-frontend-html-bnbEu
base: main
agent: Claude Code (Opus 4.7)
model_id: claude-opus-4-7
environment: linux, sandboxed workspace
status: shipped
complexity: intermediate
tags:
  - frontend
  - visual-refresh
  - css
  - design-system
  - sessions
  - meta
  - obsidian
  - wikilinks
scope:
  - [[prompt-library/index.html]]
  - [[prompt-library/style.css]]
  - [[sessions/README.md]]
  - [[sessions/2026-04-22-frontend-visual-refresh.md]]
touches:
  - prompt-library/index.html
  - prompt-library/style.css
  - sessions/README.md
  - sessions/2026-04-22-frontend-visual-refresh.md
untouched:
  - prompt-library/prompts.js
  - prompt-library/add-prompt.html
  - prompt-library/CLAUDE.md
  - prompt-library/CONTRIBUTING.md
  - prompt-library/ROADMAP.md
  - prompt-library/README.md
  - .github/workflows/deploy.yml
commits:
  - 135d1ec   # Polish frontend visuals within design-system constraints
  - 53bc051   # Add sessions/ folder with YAML + Obsidian-style session log
related:
  - [[phase-3-4-frontend]]
  - [[phase-5-deploy-docs]]
  - [[CLAUDE.md]]
  - [[design-system]]
concepts:
  - [[dot-grid-background]]
  - [[terminal-cursor]]
  - [[statline]]
  - [[card-id-badge]]
  - [[accent-rail]]
  - [[MOC]]
  - [[wikilinks]]
links:
  obsidian_vault_hint: Drop this folder into an Obsidian vault; wikilinks resolve immediately.
  deploy_url_while_in_testing_repo: https://sarutobisasuke8.github.io/testing/
---

# 2026-04-22 — Frontend visual refresh + sessions system

> Two requests in one session: (1) push [[prompt-library]]'s [[index.html]]
> from "functional but plain" toward visually appealing while staying inside
> the hard constraints in [[CLAUDE.md]]; (2) stand up a [[sessions]] folder
> with [[YAML frontmatter]] and [[Obsidian]]-style [[wikilinks]] so future
> sessions have a place to land.

## Context

- Active branch: `claude/create-frontend-html-bnbEu` (see [[branches]]).
- The frontend itself was built in an earlier session —
  [[phase-3-4-frontend]] (commit `6656f1e`). It works, but the user felt the
  [[index.html]] "looks poor" and wants more visual appeal.
- [[CLAUDE.md]] pins a strict aesthetic: **dark, sharp, technical, green
  accent, no gradients, 2px radius, borders over shadows.** Any "make it
  prettier" has to respect those rails.
- The user also asked for:
  - A [[sessions]] folder (doesn't exist yet).
  - Detailed [[YAML frontmatter]] per file.
  - Generous [[wikilinks]] (Obsidian style).

## Decisions

1. **Stay inside the [[design-system]].** No gradients, no glass morphism,
   no rounded-everything. The "poor" feeling comes from lack of rhythm and
   micro-detail, not from wrong aesthetic.
2. **Upgrade via [[typography]] + [[density]] + [[micro-interactions]]**:
   blinking [[terminal-cursor]], dashed divider dividers, an accent rail
   that slides in on card hover, a subtle [[dot-grid-background]] at ~2.5%
   opacity so the page isn't dead flat.
3. **Add a [[statline]]** under the hero — live counts of total, categories,
   and per-complexity prompts. Reads like a terminal status bar; reinforces
   the "technical tool, not a landing page" stance.
4. **Prefix cards with a padded [[card-id-badge]]** (`#001`). Signals that
   each prompt is a stable, addressable record — which aligns with the
   [[CLAUDE.md]] rule "Don't regenerate IDs".
5. **Keep all runtime JS inline.** No new dependencies. The whole point of
   the zero-build posture is preserved — see [[hard-constraints]].
6. **Put [[sessions]] at the repo root, not inside [[prompt-library]].**
   [[deploy-workflow]] only publishes `prompt-library/`; session notes stay
   private to the repo without needing `.gitignore` or manual filtering.
7. **Do _not_ merge to `main` yet.** User asked earlier whether we could
   merge; confirmed we'd want their green light first since pushing `main`
   triggers [[GitHub Pages deploy]] and is externally visible.

## Changes

### [[prompt-library/style.css]]

- Added a **[[dot-grid-background]]** via `radial-gradient` on `body`.
  Fixed attachment, 28px cell, ~2.5% opacity — visible but not busy.
- **[[count-pill]]** in the header now has a pulsing green dot
  (`animation: pulse 1.8s`) to hint at "live count".
- **Hero** reworked: `.eyebrow` microline, larger h1 (48px @ ≥720), a
  [[terminal-cursor]] `.cursor` span that blinks every ~1s, a dashed-top
  `.statline` row (see [[statline]]).
- **Search input** gains an inset accent edge on focus and a `press / to
  focus` ghost hint visible on ≥720px.
- **Cards** get an **[[accent-rail]]**: `::before` absolute 2px bar on the
  left edge, scaled to 0 by default and to 1 on hover/focus. Title flips
  to `--accent` on hover. Footer separator switched to `border-top: 1px
  dashed var(--border)` for more rhythm.
- Added **[[card-id-badge]]** styling — small mono `#001` with a faint
  right divider, nested inside a new `.card-head-left` flex container.
- **Modal** gets a 2px accent top bar, subsection headings (`h4`) now have
  a short accent dash prefix, and the code block shows a `system_prompt`
  tab label floating on its top edge. Purely aesthetic — data unchanged.
- Added **[[reduced-motion]]** guard: `@media (prefers-reduced-motion)`
  zeros all animations/transitions.

### [[prompt-library/index.html]]

- Logo line now has `> prompt-library ~ curated` — small tilde + subtext.
- Hero markup adds the `.eyebrow`, `.cursor`, `.lede`, and `.statline`
  elements plus 5 `<strong id="stat-*">` hooks for the live numbers.
- New JS function `renderStatline()` runs on boot and computes `total`,
  distinct `categories`, and per-complexity counts.
- Card template now renders `#<padded id>` inside `.card-head-left` before
  the category label.
- Modal DOM / logic unchanged — all keyboard shortcuts (`/`, `Esc`,
  Enter/Space on a card) still work as documented in [[CLAUDE.md]].

### [[sessions/README.md]]

- New file. Acts as the [[MOC]] for the [[sessions]] folder.
- Documents conventions: ISO dates, `status:` enum, `[[wikilinks]]` freely.
- Lists canonical `[[ ]]` concept anchors so future sessions have a shared
  vocabulary.
- Index table starts with today's session plus stub links back-referencing
  the historical commit log (reconstructed from `git log --oneline`).
- Ships a copy-paste session template at the bottom.

### [[sessions/2026-04-22-frontend-visual-refresh.md]] — this file

- Full [[YAML frontmatter]] block: id, date, started, project, branch,
  base, agent, model id, status, complexity, tags, scope, touches,
  untouched, commits, related, concepts, links.
- Generous [[wikilinks]] throughout the body. Most targets are virtual —
  they resolve in an [[Obsidian]] vault but not on GitHub. That's fine.

## Anti-patterns deliberately avoided

See [[CLAUDE.md]]'s _"Common anti-patterns — don't"_ section. Checked
against each:

- ❌ _Add a framework._ None added. Still zero dependencies at runtime.
- ❌ _Persist anything in localStorage on the live site._ Not touched.
- ❌ _Couple UI to a fixed category set._ Chips still read from
  [[CATEGORIES]]; statline counts use `new Set(PROMPTS.map(p => p.category))`.
- ❌ _Add analytics / trackers._ None.
- ❌ _Reformat `prompts.js`._ Untouched.
- ❌ _Regenerate IDs._ IDs read as-is; the pad is display-only.
- ❌ _Add gradients._ None. Dot grid is a `radial-gradient` _pattern_, not
  a scenic gradient fill — still falls within "sharp, technical".

## Testing notes

Full [[testing-checklist]] in [[CLAUDE.md]] — can't exercise it without a
browser in this sandbox. Flagged to the user that visual verification still
needs a local `open prompt-library/index.html` pass. Specifically check:

- [ ] Hero cursor blinks and does not push layout around.
- [ ] Statline numbers match `PROMPTS.length` and the category set size.
- [ ] Card hover reveals the [[accent-rail]] and tints the title green.
- [ ] `#003`-style IDs align cleanly next to category labels on narrow
      viewports (375px — see [[mobile-first]]).
- [ ] Modal `system_prompt` tab label doesn't collide with the `Copy`
      button inside `.prompt-block`.
- [ ] `@media (prefers-reduced-motion)` kills the cursor blink and card
      transitions.

## Follow-ups

1. **Merge to `main` (pending user go-ahead).** Triggers [[GitHub Pages
   deploy]]. One-time Pages UI toggle still required.
2. **[[screenshot.png]]** still needs a real capture at
   `prompt-library/screenshot.png` — [[README.md]] references it.
3. **Backfill category content** — 8 empty [[CATEGORIES]] remaining to hit
   the 40+ target (see [[phase-2-web3-prompts]] for the pattern).
4. **Decide whether [[add-prompt.html]] moves under
   `prompt-library/tools/`.** Mentioned earlier in the conversation;
   deferred until the user wants file-layout changes.
5. **Backfill historical session notes** if the user wants the graph
   complete — currently they're stub links in [[sessions/README.md]].

## Graph neighbours

- Previous: [[phase-5-deploy-docs]] → [[phase-3-4-frontend]]
- Concept anchors touched: [[design-system]], [[dot-grid-background]],
  [[terminal-cursor]], [[statline]], [[card-id-badge]], [[accent-rail]],
  [[MOC]], [[wikilinks]], [[YAML frontmatter]], [[Obsidian]],
  [[reduced-motion]], [[mobile-first]], [[testing-checklist]],
  [[hard-constraints]].
- Files touched: [[prompt-library/index.html]], [[prompt-library/style.css]],
  [[sessions/README.md]], [[sessions/2026-04-22-frontend-visual-refresh.md]].
