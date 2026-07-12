#!/usr/bin/env node
// validate-prompts.js — zero-dependency schema check for prompts.js
// ---------------------------------------------------------------
// Catches the silent failure modes of hand-editing prompts.js:
//   - missing/empty required fields
//   - duplicate or non-integer ids
//   - a category that isn't a key in CATEGORIES
//   - an invalid complexity level
//   - fields that are the wrong type (e.g. tags not an array)
//
// Runs in CI before deploy and locally with: node scripts/validate-prompts.js
// No npm, no package.json, no dependencies — by design (see CLAUDE.md).
"use strict";

const fs = require("fs");
const path = require("path");

const PROMPTS_PATH = path.join(__dirname, "..", "prompt-library", "prompts.js");

const COMPLEXITY = ["beginner", "intermediate", "advanced"];
// Required fields and their expected JS type ("string-array" = array of strings).
const REQUIRED = {
  id: "number",
  title: "string",
  category: "string",
  complexity: "string",
  purpose: "string",
  tags: "string-array",
  models: "string-array",
  temperature: "string",
  prompt: "string",
  author: "string",
};
// Optional fields that, when present, must be strings.
const OPTIONAL_STRINGS = ["chaining", "notes"];

function load() {
  const code = fs.readFileSync(PROMPTS_PATH, "utf8");
  // prompts.js uses top-level `const CATEGORIES`/`const PROMPTS` (browser
  // globals, no module.exports). Wrap + return to read them in Node without
  // touching the file.
  const fn = new Function(code + "\nreturn { CATEGORIES, PROMPTS };");
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

function main() {
  let CATEGORIES, PROMPTS;
  try {
    ({ CATEGORIES, PROMPTS } = load());
  } catch (e) {
    console.error("FATAL: could not evaluate prompts.js — " + e.message);
    process.exit(1);
  }

  const errors = [];

  if (!CATEGORIES || typeof CATEGORIES !== "object" || !Object.keys(CATEGORIES).length) {
    errors.push("CATEGORIES is missing or empty");
  }
  if (!Array.isArray(PROMPTS) || !PROMPTS.length) {
    errors.push("PROMPTS is missing or empty");
  }

  if (!errors.length) {
    const catKeys = new Set(Object.keys(CATEGORIES));
    const seenIds = new Map();

    PROMPTS.forEach((p, i) => {
      const where = "prompt[" + i + "]" + (p && p.id != null ? " (id " + p.id + ")" : "");

      for (const [field, type] of Object.entries(REQUIRED)) {
        if (!(field in p)) { errors.push(where + ": missing '" + field + "'"); continue; }
        if (!typeOk(p[field], type)) errors.push(where + ": '" + field + "' must be a non-empty " + type);
      }

      if (typeof p.id === "number") {
        if (!Number.isInteger(p.id)) errors.push(where + ": id must be an integer");
        if (seenIds.has(p.id)) errors.push(where + ": duplicate id (first seen at index " + seenIds.get(p.id) + ")");
        else seenIds.set(p.id, i);
      }

      if (typeof p.category === "string" && !catKeys.has(p.category)) {
        errors.push(where + ": category '" + p.category + "' is not a key in CATEGORIES");
      }

      if (typeof p.complexity === "string" && !COMPLEXITY.includes(p.complexity)) {
        errors.push(where + ": complexity '" + p.complexity + "' must be one of " + COMPLEXITY.join(", "));
      }

      for (const field of OPTIONAL_STRINGS) {
        if (field in p && typeof p[field] !== "string") {
          errors.push(where + ": optional '" + field + "' must be a string when present");
        }
      }
    });
  }

  if (errors.length) {
    console.error("prompts.js validation FAILED — " + errors.length + " issue(s):\n");
    errors.forEach((e) => console.error("  ✗ " + e));
    process.exit(1);
  }

  console.log("prompts.js OK — " + PROMPTS.length + " prompts across " +
    Object.keys(CATEGORIES).length + " categories, all fields valid.");
}

main();
