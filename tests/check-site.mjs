#!/usr/bin/env node
// check-site.mjs — dev-only static checks for ../prompt-library
// ---------------------------------------------------------------------------
// Nothing in tests/ ships. The Pages deploy uploads prompt-library/ only, so
// the site keeps its "no npm, no build" contract; this folder is the one place
// a pinned dev dependency (html-validate) is allowed.
//
// 1. HTML validity   every prompt-library/*.html through html-validate
//                    (preset "html-validate:standard": spec validity, no
//                    style-only rules; see .htmlvalidate.json).
// 2. Internal links  every relative href/src in the static HTML, plus the
//                    literal hrefs in nav.js / footer.js and in inline page
//                    scripts, must resolve to a file in prompt-library/.
//                    A #fragment must match an id (or a JS-routed hash the
//                    target page handles, see HASH_ROUTES). ?cat= must be a
//                    real category key. sitemap.xml <loc>s must exist.
// 3. Prompt entries  every PROMPTS entry has a non-empty title, category and
//                    body (the field is called `prompt`), the category is a
//                    key of CATEGORIES, and ids are unique integers.
//
// Run: cd tests && npm ci && npm run test:site
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { HtmlValidate, FileSystemConfigLoader, formatterFactory } from "html-validate";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(HERE, "..", "prompt-library");
const SITE_URL = "https://sarutobisasuke8.github.io/Prompt-Library/";

const errors = [];
const summary = [];
const fail = (section, msg) => errors.push("[" + section + "] " + msg);

const pages = fs.readdirSync(SITE).filter((f) => f.endsWith(".html")).sort();
const read = (rel) => fs.readFileSync(path.join(SITE, rel), "utf8");
const exists = (rel) => {
  try { return fs.statSync(path.join(SITE, rel)).isFile(); } catch { return false; }
};

// --- 1. HTML validity --------------------------------------------------------
{
  const loader = new FileSystemConfigLoader();
  const htmlvalidate = new HtmlValidate(loader);
  const files = pages.map((p) => path.join(SITE, p));
  const reports = await Promise.all(files.map((f) => htmlvalidate.validateFile(f)));
  const merged = HtmlValidate.mergeReports
    ? HtmlValidate.mergeReports(reports)
    : { valid: reports.every((r) => r.valid), results: reports.flatMap((r) => r.results) };
  let count = 0;
  for (const r of merged.results) count += r.errorCount;
  if (!merged.valid) {
    const text = formatterFactory("text")(merged.results);
    text.trim().split("\n").forEach((line) => fail("html", line.replace(SITE + path.sep, "")));
  }
  summary.push("html: " + pages.length + " pages, " + count + " error(s)");
}

// --- 2. Internal links and anchors -------------------------------------------
// Pages whose hash is read by JS rather than pointing at a static id. Each
// entry says which prefix is routed and how to prove the target exists.
const HASH_ROUTES = {
  // user.html: ?handle=X#tab-tools selects the tab whose data-tab="tools".
  "user.html": (frag, html) =>
    frag.startsWith("tab-") && html.includes('data-tab="' + frag.slice(4) + '"')
};

// A string-built href ends in a runtime value, so its fragment is only a
// prefix ("#tab-" + name). The target page must either have an id starting
// with that prefix or read that hash prefix in its own script.
function handlesHashPrefix(html, ids, prefix) {
  if ([...ids].some((id) => id.startsWith(prefix))) return true;
  return ['"#' + prefix, "'#" + prefix, 'id = "' + prefix, "id = '" + prefix]
    .some((needle) => html.includes(needle));
}

// Collect ids a page can be scrolled to: static id="" attributes plus id=""
// literals emitted by its own inline scripts (nav.js / footer.js output is
// shared and added below).
function idsOf(html) {
  const ids = new Set();
  for (const m of html.matchAll(/\sid\s*=\s*"([^"'+]+)"/g)) ids.add(m[1]);
  return ids;
}
const sharedIds = new Set([...idsOf(read("nav.js")), ...idsOf(read("footer.js"))]);

let categories = new Set();
let PROMPTS = [];
try {
  const code = read("prompts.js");
  const out = new Function(code + "\nreturn { CATEGORIES, PROMPTS };")();
  categories = new Set(Object.keys(out.CATEGORIES));
  PROMPTS = out.PROMPTS;
} catch (e) {
  fail("prompts", "could not evaluate prompts.js: " + e.message);
}

function isExternal(url) {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(url);
}

const linkSources = []; // { from, url }
const stripComments = (s) => s.replace(/<!--[\s\S]*?-->/g, "");
for (const page of pages) {
  const html = stripComments(read(page));
  // Static markup: drop script bodies so string-built hrefs are not misread.
  const markup = html.replace(/(<script\b[^>]*>)[\s\S]*?(<\/script>)/gi, "$1$2");
  for (const m of markup.matchAll(/\s(?:href|src)\s*=\s*"([^"]*)"/gi)) {
    linkSources.push({ from: page, url: m[1] });
  }
  // Inline scripts: fully literal hrefs, plus the literal prefix of
  // string-built ones ("prompt.html?id=" + p.id), checked as a prefix.
  for (const s of html.matchAll(/<script\b(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/gi)) {
    scanScript(s[1], page + " (inline script)");
  }
}
for (const js of ["nav.js", "footer.js"]) scanScript(read(js), js);

function scanScript(code, from) {
  // href="x.html" / href: "x.html" / el.href = "x.html", not followed by +
  for (const m of code.matchAll(/href\s*[:=]\s*"([^"'+\\$]+)"(?!\s*\+)/g)) {
    linkSources.push({ from, url: m[1] });
  }
  // '<a href="x.html?id=' + id   and   el.href = "x.html#y-" + id
  for (const m of code.matchAll(/href\s*=\s*(?:"([^"'\\]*)'|"([^"'\\]*)"|'([^"'\\]*)')\s*\+/g)) {
    const prefix = m[1] ?? m[2] ?? m[3];
    if (prefix) linkSources.push({ from, url: prefix, prefix: true });
  }
}

let checked = 0;
const idCache = new Map();
for (const { from, url, prefix } of linkSources) {
  if (!url || url === "#" || isExternal(url)) continue;
  // A prefix with no file part yet ("?handle=" or "") cannot be resolved.
  if (prefix && !/^[^?#]+\.[a-z]+/i.test(url)) continue;
  checked++;
  const [beforeHash, frag = ""] = url.split("#");
  const [file, query = ""] = beforeHash.split("?");
  const fromPage = from.split(" ")[0];
  const target = file === "" ? fromPage : path.posix.normalize(file);
  if (target.startsWith("..") || path.isAbsolute(target)) {
    fail("links", from + ": '" + url + "' points outside the published folder");
    continue;
  }
  if (!exists(target)) {
    fail("links", from + ": '" + url + "' -> " + target + " does not exist");
    continue;
  }
  const params = new URLSearchParams(query);
  if (!prefix && target === "index.html" && params.has("cat") && !categories.has(params.get("cat"))) {
    fail("links", from + ": '" + url + "' -> cat '" + params.get("cat") + "' is not a CATEGORIES key");
  }
  if (url.includes("#") && target.endsWith(".html")) {
    if (!idCache.has(target)) idCache.set(target, idsOf(stripComments(read(target))));
    const ids = idCache.get(target);
    if (prefix) {
      if (!handlesHashPrefix(read(target), ids, frag)) {
        fail("links", from + ": '" + url + "' + <value> -> " + target +
          " has no id or hash handler for '#" + frag + "...'");
      }
      continue;
    }
    if (!frag) continue;
    const routed = HASH_ROUTES[target] && HASH_ROUTES[target](frag, read(target));
    if (!ids.has(frag) && !sharedIds.has(frag) && !routed) {
      fail("links", from + ": '" + url + "' -> no id '" + frag + "' in " + target);
    }
  }
}

// sitemap.xml must only list pages that exist.
if (exists("sitemap.xml")) {
  for (const m of read("sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)) {
    checked++;
    const loc = m[1].trim();
    if (!loc.startsWith(SITE_URL)) {
      fail("links", "sitemap.xml: '" + loc + "' is not under " + SITE_URL);
      continue;
    }
    const rel = loc.slice(SITE_URL.length) || "index.html";
    if (!exists(rel)) fail("links", "sitemap.xml: '" + loc + "' -> " + rel + " does not exist");
  }
}
summary.push("links: " + checked + " internal link(s) checked");

// --- 3. Prompt entries ---------------------------------------------------------
{
  const REQUIRED = ["title", "category", "prompt"]; // `prompt` is the body
  const seen = new Map();
  PROMPTS.forEach((p, i) => {
    const where = "PROMPTS[" + i + "]" + (p && p.id != null ? " (id " + p.id + ")" : "");
    if (!p || typeof p !== "object") { fail("prompts", where + ": not an object"); return; }
    if (!Number.isInteger(p.id)) fail("prompts", where + ": id must be an integer");
    else if (seen.has(p.id)) fail("prompts", where + ": duplicate id (first at index " + seen.get(p.id) + ")");
    else seen.set(p.id, i);
    for (const f of REQUIRED) {
      if (typeof p[f] !== "string" || !p[f].trim()) fail("prompts", where + ": missing or empty '" + f + "'");
    }
    if (typeof p.category === "string" && !categories.has(p.category)) {
      fail("prompts", where + ": category '" + p.category + "' is not a CATEGORIES key");
    }
  });
  summary.push("prompts: " + PROMPTS.length + " entries, " + seen.size + " unique ids");
}

// --- report --------------------------------------------------------------------
summary.forEach((s) => console.log("  " + s));
if (errors.length) {
  console.error("\nsite checks FAILED: " + errors.length + " issue(s)");
  errors.forEach((e) => console.error("  x " + e));
  process.exit(1);
}
console.log("site checks OK");
