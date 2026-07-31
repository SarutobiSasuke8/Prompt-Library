#!/usr/bin/env node
// validate-posts.js — zero-dependency schema check for posts.js
// ---------------------------------------------------------------
// Catches the silent failure modes of hand-editing posts.js:
//   - missing/empty required fields
//   - duplicate or non-integer ids
//   - duplicate slugs, or slugs that aren't lowercase-hyphenated
//   - malformed dates (must be YYYY-MM-DD and a real calendar date)
//   - more than one featured post
//   - body blocks with an unknown type or a missing payload
//
// Runs in CI before deploy and locally with: node scripts/validate-posts.js
// No npm, no package.json, no dependencies — by design (see CLAUDE.md).
"use strict";

const fs = require("fs");
const path = require("path");

const POSTS_PATH = path.join(__dirname, "..", "prompt-library", "posts.js");

// Required fields and their expected JS type ("string-array" = array of strings).
const REQUIRED = {
  id: "number",
  title: "string",
  slug: "string",
  date: "string",
  excerpt: "string",
  author: "string",
  tags: "string-array",
  readTime: "string",
};

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// Block type -> required keys on that block.
const BLOCK_SHAPES = {
  p:         ["text"],
  h3:        ["text"],
  example:   ["text"],
  callout:   ["text"],
  list:      ["items"],
  reference: ["title"],
};

function load() {
  const code = fs.readFileSync(POSTS_PATH, "utf8");
  // posts.js uses a top-level `const POSTS` (browser global, no
  // module.exports). Wrap + return to read it in Node without touching
  // the file.
  const fn = new Function(code + "\nreturn { POSTS };");
  return fn();
}

function typeOk(value, type) {
  if (type === "number") return typeof value === "number" && Number.isFinite(value);
  if (type === "string") return typeof value === "string" && value.trim().length > 0;
  if (type === "string-array") {
    return Array.isArray(value) && value.length > 0 &&
      value.every((v) => typeof v === "string" && v.trim().length > 0);
  }
  return false;
}

// True only for a well-formed date that survives a round trip — rejects
// 2026-02-30 and friends, which the regex alone lets through.
function realDate(s) {
  if (!DATE_RE.test(s)) return false;
  const d = new Date(s + "T00:00:00Z");
  return !isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

function checkBody(body, where, errors) {
  if (!Array.isArray(body) || !body.length) {
    errors.push(where + ": 'body' must be a non-empty array of blocks");
    return;
  }
  body.forEach((b, j) => {
    const at = where + " body[" + j + "]";
    if (!b || typeof b !== "object") { errors.push(at + ": block must be an object"); return; }
    const shape = BLOCK_SHAPES[b.type];
    if (!shape) {
      errors.push(at + ": unknown block type '" + b.type + "' (expected one of " +
        Object.keys(BLOCK_SHAPES).join(", ") + ")");
      return;
    }
    shape.forEach((key) => {
      if (key === "items") {
        if (!typeOk(b.items, "string-array")) {
          errors.push(at + ": list block needs a non-empty 'items' string array");
        }
      } else if (!typeOk(b[key], "string")) {
        errors.push(at + ": " + b.type + " block needs a non-empty '" + key + "'");
      }
    });
  });
}

function main() {
  let POSTS;
  try {
    ({ POSTS } = load());
  } catch (e) {
    console.error("FATAL: could not evaluate posts.js — " + e.message);
    process.exit(1);
  }

  const errors = [];

  if (!Array.isArray(POSTS) || !POSTS.length) {
    errors.push("POSTS is missing or empty");
  }

  if (!errors.length) {
    const seenIds = new Map();
    const seenSlugs = new Map();
    let featuredCount = 0;

    POSTS.forEach((p, i) => {
      const where = "post[" + i + "]" + (p && p.id != null ? " (id " + p.id + ")" : "");

      for (const [field, type] of Object.entries(REQUIRED)) {
        if (!(field in p)) { errors.push(where + ": missing '" + field + "'"); continue; }
        if (!typeOk(p[field], type)) errors.push(where + ": '" + field + "' must be a non-empty " + type);
      }

      if (typeof p.id === "number") {
        if (!Number.isInteger(p.id)) errors.push(where + ": id must be an integer");
        if (seenIds.has(p.id)) errors.push(where + ": duplicate id (first seen at index " + seenIds.get(p.id) + ")");
        else seenIds.set(p.id, i);
      }

      if (typeof p.slug === "string") {
        if (!SLUG_RE.test(p.slug)) {
          errors.push(where + ": slug '" + p.slug + "' must be lowercase-hyphenated (a-z, 0-9, single hyphens)");
        }
        if (seenSlugs.has(p.slug)) errors.push(where + ": duplicate slug (first seen at index " + seenSlugs.get(p.slug) + ")");
        else seenSlugs.set(p.slug, i);
      }

      if (typeof p.date === "string" && !realDate(p.date)) {
        errors.push(where + ": date '" + p.date + "' must be a real date in YYYY-MM-DD form");
      }
      if ("updated" in p && (typeof p.updated !== "string" || !realDate(p.updated))) {
        errors.push(where + ": optional 'updated' must be a real date in YYYY-MM-DD form when present");
      }

      if ("featured" in p) {
        if (typeof p.featured !== "boolean") errors.push(where + ": 'featured' must be a boolean when present");
        else if (p.featured) featuredCount++;
      }

      checkBody(p.body, where, errors);
    });

    if (featuredCount > 1) {
      errors.push("at most one post may set featured:true — found " + featuredCount);
    }
  }

  if (errors.length) {
    console.error("posts.js validation FAILED — " + errors.length + " issue(s):\n");
    errors.forEach((e) => console.error("  ✗ " + e));
    process.exit(1);
  }

  console.log("posts.js OK — " + POSTS.length + " posts, all fields valid.");
}

main();
