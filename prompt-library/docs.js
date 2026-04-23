// docs.js — data for the markdown resource library.
// Schema: { id, title, category, description, filename, tags, url }
// filename points to a file inside prompt-library/docs/

var DOC_CATEGORIES = {
  "framework": "Frameworks",
  "model":     "Models",
  "tool":      "Tools",
  "protocol":  "Protocols"
};

var DOCS = [
  {
    id: 1,
    title: "OpenClaw",
    category: "framework",
    description: "An open-source agent framework for building autonomous AI systems with structured tool use and multi-step reasoning.",
    filename: "openclaw.md",
    tags: ["agent", "framework", "open-source"],
    url: "https://openclaw.ai/"
  },
  {
    id: 2,
    title: "Hermes",
    category: "model",
    description: "Nous Research's fine-tuned model series optimised for instruction-following, function calling, and agentic task execution.",
    filename: "hermes.md",
    tags: ["model", "fine-tuned", "nous-research", "function-calling"],
    url: "https://hermes-agent.nousresearch.com/"
  }
];
