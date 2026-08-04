#!/usr/bin/env node
// validate-content.js — zero-dependency schema check for every content registry
// ---------------------------------------------------------------------------
// Supersedes validate-prompts.js, which only covered prompts.js. The other
// registries were hand-edited with no check at all, so a typo in tools.js or a
// collection pointing at a deleted prompt shipped silently.
//
// Checks, per registry:
//   - required fields present, correct type, non-empty
//   - duplicate or non-integer/non-slug ids
//   - enum fields (category, group, complexity) resolve to a real key
//
// Checks, across registries:
//   - every collection promptId resolves to a prompt
//   - every MD `file` / `files[].file` path exists on disk
//   - every article body block uses a known block type
//
// Runs in CI before deploy and locally with: node scripts/validate-content.js
// No npm, no package.json, no dependencies — by design (see CLAUDE.md).
"use strict";

const fs = require("fs");
const path = require("path");

const SITE = path.join(__dirname, "..", "prompt-library");

const errors = [];
const summary = [];

function fail(msg) { errors.push(msg); }

// Registries are browser globals (`const X` / `var X`, no module.exports).
// Wrap the source and return the names we want, so the files stay untouched.
function load(file, names) {
  const code = fs.readFileSync(path.join(SITE, file), "utf8");
  return new Function(code + "\nreturn { " + names.join(", ") + " };")();
}

function typeOk(value, type) {
  if (type === "number") return typeof value === "number" && Number.isFinite(value);
  if (type === "string") return typeof value === "string" && value.trim().length > 0;
  if (type === "string-array") {
    return Array.isArray(value) && value.length > 0 &&
      value.every((v) => typeof v === "string" && v.trim().length > 0);
  }
  if (type === "number-array") {
    return Array.isArray(value) && value.length > 0 &&
      value.every((v) => Number.isInteger(v));
  }
  return false;
}

// Shared per-entry checks: required fields, id uniqueness, enum membership.
function checkEntries(label, entries, opts) {
  const seen = new Map();
  entries.forEach((entry, i) => {
    const id = entry && entry.id != null ? entry.id : null;
    const where = label + "[" + i + "]" + (id != null ? " (id " + id + ")" : "");

    for (const [field, type] of Object.entries(opts.required)) {
      if (!(field in entry)) { fail(where + ": missing '" + field + "'"); continue; }
      if (!typeOk(entry[field], type)) {
        fail(where + ": '" + field + "' must be a non-empty " + type);
      }
    }

    if (id != null) {
      if (opts.idType === "number" && !Number.isInteger(id)) {
        fail(where + ": id must be an integer");
      }
      if (opts.idType === "slug" && !/^[a-z0-9][a-z0-9-]*$/.test(String(id))) {
        fail(where + ": id '" + id + "' must be a lowercase slug");
      }
      if (seen.has(id)) fail(where + ": duplicate id (first seen at index " + seen.get(id) + ")");
      else seen.set(id, i);
    }

    for (const [field, allowed] of Object.entries(opts.enums || {})) {
      const value = entry[field];
      if (typeof value === "string" && !allowed.has(value)) {
        fail(where + ": " + field + " '" + value + "' is not one of " +
          [...allowed].join(", "));
      }
    }

    for (const field of opts.optionalStrings || []) {
      if (field in entry && typeof entry[field] !== "string") {
        fail(where + ": optional '" + field + "' must be a string when present");
      }
    }
  });
  return seen;
}

function fileExists(rel) {
  try { return fs.statSync(path.join(SITE, rel)).isFile(); } catch (_) { return false; }
}

// --- prompts ---------------------------------------------------------------
let promptIds = new Set();
try {
  const { CATEGORIES, PROMPTS } = load("prompts.js", ["CATEGORIES", "PROMPTS"]);
  const cats = new Set(Object.keys(CATEGORIES));
  checkEntries("prompt", PROMPTS, {
    idType: "number",
    required: {
      id: "number", title: "string", category: "string", complexity: "string",
      purpose: "string", tags: "string-array", models: "string-array",
      temperature: "string", prompt: "string", author: "string"
    },
    enums: {
      category: cats,
      complexity: new Set(["beginner", "intermediate", "advanced"])
    },
    optionalStrings: ["chaining", "notes"]
  });
  promptIds = new Set(PROMPTS.map((p) => p.id));
  summary.push(PROMPTS.length + " prompts / " + cats.size + " categories");
} catch (e) {
  fail("FATAL: could not evaluate prompts.js — " + e.message);
}

// --- tools -----------------------------------------------------------------
try {
  const { TOOL_GROUPS, TOOLS } = load("tools.js", ["TOOL_GROUPS", "TOOLS"]);
  checkEntries("tool", TOOLS, {
    idType: "slug",
    required: {
      id: "string", group: "string", mark: "string", name: "string",
      sub: "string", pricing: "string", url: "string",
      deepLink: "string", purpose: "string", description: "string"
    },
    enums: {
      group: new Set(Object.keys(TOOL_GROUPS)),
      // byok = bring your own key: free client, you pay the model provider.
      pricing: new Set(["free", "freemium", "byok", "paid"]),
      deepLink: new Set(["supported", "planned", "none"])
    },
    optionalStrings: ["icon", "x", "github", "logoUrl"]
  });
  summary.push(TOOLS.length + " tools / " + Object.keys(TOOL_GROUPS).length + " groups");
} catch (e) {
  fail("FATAL: could not evaluate tools.js — " + e.message);
}

// --- agents ----------------------------------------------------------------
try {
  const { AGENT_GROUPS, AGENTS } = load("agents.js", ["AGENT_GROUPS", "AGENTS"]);
  checkEntries("agent", AGENTS, {
    idType: "slug",
    required: {
      id: "string", group: "string", mark: "string", name: "string",
      sub: "string", purpose: "string", context: "string",
      url: "string", tags: "string-array"
    },
    enums: { group: new Set(Object.keys(AGENT_GROUPS)) },
    optionalStrings: ["icon", "logoUrl", "github", "x"]
  });
  summary.push(AGENTS.length + " agents");
} catch (e) {
  fail("FATAL: could not evaluate agents.js — " + e.message);
}

// --- articles --------------------------------------------------------------
const BLOCK_TYPES = new Set(["p", "h3", "example", "callout", "list", "reference"]);
try {
  const { ARTICLES } = load("articles.js", ["ARTICLES"]);
  checkEntries("article", ARTICLES, {
    idType: "number",
    required: {
      id: "number", title: "string", summary: "string", articleType: "string",
      tags: "string-array", readTime: "string", author: "string"
    }
  });
  ARTICLES.forEach((a, i) => {
    const where = "article[" + i + "] (id " + a.id + ")";
    if (!Array.isArray(a.body) || !a.body.length) {
      fail(where + ": 'body' must be a non-empty array of blocks");
      return;
    }
    a.body.forEach((block, j) => {
      if (!block || !BLOCK_TYPES.has(block.type)) {
        fail(where + ": body[" + j + "] has unknown type '" +
          (block && block.type) + "'");
        return;
      }
      if (block.type === "list" && !typeOk(block.items, "string-array")) {
        fail(where + ": body[" + j + "] list needs a non-empty items array");
      }
      if (block.type !== "list" && block.type !== "reference" &&
          !typeOk(block.text, "string")) {
        fail(where + ": body[" + j + "] (" + block.type + ") needs non-empty text");
      }
    });
  });
  summary.push(ARTICLES.length + " articles");
} catch (e) {
  fail("FATAL: could not evaluate articles.js — " + e.message);
}

// --- md docs ---------------------------------------------------------------
try {
  const { MD_CATEGORIES, MDS } = load("mds.js", ["MD_CATEGORIES", "MDS"]);
  checkEntries("md", MDS, {
    idType: "slug",
    required: {
      id: "string", title: "string", category: "string", purpose: "string",
      tags: "string-array", file: "string", added: "string", content: "string"
    },
    enums: { category: new Set(Object.keys(MD_CATEGORIES)) },
    optionalStrings: ["version"]
  });
  MDS.forEach((m, i) => {
    const where = "md[" + i + "] (id " + m.id + ")";
    if (typeof m.file === "string" && !fileExists(m.file)) {
      fail(where + ": file '" + m.file + "' does not exist");
    }
    if ("files" in m) {
      if (!Array.isArray(m.files) || !m.files.length) {
        fail(where + ": 'files' must be a non-empty array when present");
      } else {
        m.files.forEach((f, j) => {
          if (!typeOk(f.label, "string") || !typeOk(f.filename, "string") ||
              !typeOk(f.file, "string")) {
            fail(where + ": files[" + j + "] needs label, filename and file");
          } else if (!fileExists(f.file)) {
            fail(where + ": files[" + j + "] '" + f.file + "' does not exist");
          }
        });
      }
    }
  });
  summary.push(MDS.length + " md docs");
} catch (e) {
  fail("FATAL: could not evaluate mds.js — " + e.message);
}

// --- collections (cross-references prompts) --------------------------------
try {
  const { COLLECTIONS } = load("collections.js", ["COLLECTIONS"]);
  checkEntries("collection", COLLECTIONS, {
    idType: "number",
    required: {
      id: "number", slug: "string", title: "string", description: "string",
      tags: "string-array", curator: "string"
    }
  });
  const seenSlugs = new Map();
  COLLECTIONS.forEach((c, i) => {
    const where = "collection[" + i + "] (id " + c.id + ")";

    // Two shapes, both rendered by collections.html: a prompt pack keyed on
    // promptIds, or a repo collection keyed on repoUrl + a files[] manifest.
    const isRepo = "repoUrl" in c;
    if (isRepo) {
      if (!typeOk(c.repoUrl, "string")) fail(where + ": 'repoUrl' must be a non-empty string");
      if (!typeOk(c.files, "string-array")) fail(where + ": repo collection needs a non-empty files array");
    } else if (!typeOk(c.promptIds, "number-array")) {
      fail(where + ": needs either a non-empty promptIds array or a repoUrl");
    }

    if (typeof c.slug === "string") {
      if (seenSlugs.has(c.slug)) {
        fail(where + ": duplicate slug '" + c.slug + "'");
      } else seenSlugs.set(c.slug, i);
    }
    if (Array.isArray(c.promptIds) && promptIds.size) {
      const missing = c.promptIds.filter((id) => !promptIds.has(id));
      if (missing.length) {
        fail(where + ": promptIds not found in prompts.js — " + missing.join(", "));
      }
      const dupes = c.promptIds.filter((id, j) => c.promptIds.indexOf(id) !== j);
      if (dupes.length) fail(where + ": repeated promptIds — " + [...new Set(dupes)].join(", "));
    }
  });
  summary.push(COLLECTIONS.length + " collections");
} catch (e) {
  fail("FATAL: could not evaluate collections.js — " + e.message);
}

// --- report ----------------------------------------------------------------
if (errors.length) {
  console.error("content validation FAILED — " + errors.length + " issue(s):\n");
  errors.forEach((e) => console.error("  x " + e));
  process.exit(1);
}
console.log("content OK — " + summary.join(", ") + ".");
