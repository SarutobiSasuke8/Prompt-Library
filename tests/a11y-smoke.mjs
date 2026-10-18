#!/usr/bin/env node
// a11y-smoke.mjs — axe-core accessibility smoke test on the index page
// ---------------------------------------------------------------------------
// Serves ../prompt-library with a tiny built-in static server (no extra
// dependency), opens index.html in headless Chromium at phone and desktop
// widths, waits for the prompt cards to render, and runs axe-core with the
// WCAG 2.0 / 2.1 A and AA rule tags. Any violation not listed in
// KNOWN_EXCLUSIONS fails the run.
//
// Third-party requests (Google Fonts, the esm.sh Supabase module) are blocked
// so the run is deterministic and offline-safe; colours, markup and the card
// grid do not depend on them.
//
// Colour contrast: axe reports most text as "needs review" rather than pass
// or fail, because the body dot-grid background-image means it cannot work
// out the background colour. Those nodes are printed, not failed. With the
// dot grid stripped, --text-faint (#5a5a5a on #0a0a0a, 2.87:1) fails WCAG AA
// 4.5:1 on the hero eyebrow and small labels; that is a design-token call
// for Alexei and is reported in the PR rather than restyled here.
//
// Run: cd tests && npm ci && npx playwright install chromium && npm run test:a11y
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(HERE, "..", "prompt-library");

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

// Known violations accepted on purpose, scoped to the exact elements that
// cause them so the rule still fails anywhere else. Each entry needs a reason
// and an owner decision; remove it once that call is made.
const KNOWN_EXCLUSIONS = {
  // The prompt card is a <div role="button" tabindex="0"> that contains the
  // in-card copy and bookmark <button>s. That nesting is a documented design
  // choice (prompt-library/CLAUDE.md, "Card markup anatomy"): a whole-card
  // click target plus one-tap copy. Screen readers may not announce the inner
  // buttons. Fixing it means restructuring the card (for example a stretched
  // <a> to prompt.html plus sibling buttons), which is a design decision for
  // Alexei, not a smoke-test fix. Scoped to the cards in #grid only.
  "nested-interactive": {
    selector: '#grid > .card[role="button"]',
    reason: "card is role=button with copy/bookmark buttons inside (design decision pending)"
  }
};

const VIEWPORTS = [
  { name: "mobile 375x812", width: 375, height: 812 },
  { name: "desktop 1280x800", width: 1280, height: 800 }
];

const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png",
  ".json": "application/json", ".md": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8", ".xml": "application/xml"
};

function serve() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    let rel = decodeURIComponent(url.pathname).replace(/^\/+/, "") || "index.html";
    const file = path.resolve(SITE, rel);
    if (!file.startsWith(SITE + path.sep)) { res.writeHead(403).end(); return; }
    fs.readFile(file, (err, buf) => {
      if (err) { res.writeHead(404).end("not found"); return; }
      res.writeHead(200, { "content-type": TYPES[path.extname(file)] || "application/octet-stream" });
      res.end(buf);
    });
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

const server = await serve();
const origin = "http://127.0.0.1:" + server.address().port;
const browser = await chromium.launch();
let failed = 0;

try {
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    await page.route("**/*", (route) =>
      route.request().url().startsWith(origin) ? route.continue() : route.abort());
    const pageErrors = [];
    page.on("pageerror", (e) => pageErrors.push(e.message));

    await page.goto(origin + "/index.html", { waitUntil: "load" });
    await page.waitForSelector("#grid .card", { timeout: 15000 });

    const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();

    // Drop only the nodes covered by a scoped exclusion; keep everything else.
    let accepted = 0;
    for (const v of results.violations) {
      const ex = KNOWN_EXCLUSIONS[v.id];
      if (!ex) continue;
      const keep = [];
      for (const n of v.nodes) {
        const matches = n.target.length === 1 && await page.locator(n.target[0]).first()
          .evaluate((el, sel) => el.matches(sel), ex.selector).catch(() => false);
        if (matches) accepted++; else keep.push(n);
      }
      v.nodes = keep;
    }
    results.violations = results.violations.filter((v) => v.nodes.length);

    const cards = await page.locator("#grid .card").count();
    console.log("index.html @ " + vp.name + ": " + cards + " cards rendered, " +
      results.passes.length + " rules passed, " + results.violations.length + " violation(s), " +
      results.incomplete.length + " needing review" +
      (accepted ? ", " + accepted + " node(s) covered by a scoped exclusion" : ""));
    for (const i of results.incomplete) {
      console.log("  review: " + i.id + " (" + i.impact + ") " + i.help + " — " + i.nodes.length + " node(s)");
    }
    for (const v of results.violations) {
      failed++;
      console.error("  x " + v.id + " (" + v.impact + ") " + v.help + " — " + v.nodes.length + " node(s)");
      for (const n of v.nodes.slice(0, 5)) {
        console.error("      " + n.target.join(" ") + "\n        " + (n.failureSummary || "").split("\n").join("\n        "));
      }
    }
    // Page errors from blocked third-party modules are expected; anything
    // else is surfaced but does not fail the a11y smoke.
    pageErrors.forEach((e) => console.log("  note: page error: " + e));
    await context.close();
  }
} finally {
  await browser.close();
  server.close();
}

for (const [id, ex] of Object.entries(KNOWN_EXCLUSIONS)) {
  console.log("scoped exclusion: " + id + " on " + ex.selector + " (" + ex.reason + ")");
}
if (failed) {
  console.error("\na11y smoke FAILED: " + failed + " violation group(s)");
  process.exit(1);
}
console.log("a11y smoke OK (" + TAGS.join(", ") + ")");
