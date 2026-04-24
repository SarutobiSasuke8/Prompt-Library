// agents.js — AGENTS array and group labels. Mirrors tools.js shape so the
// detail page can reuse the same Simple Icons / Clearbit / monogram fallback.
//
// Schema per agent:
//   id       — stable slug, used in agent.html?id=<id>
//   group    — framework | model | archetype (drives the group badge)
//   mark     — 2-char monogram fallback if no logo resolves
//   logoUrl  — explicit image URL (optional, wins over icon/Clearbit). Use
//              this for projects that aren't on Simple Icons — e.g. a GitHub
//              org avatar `https://github.com/<org>.png`.
//   icon     — Simple Icons slug (optional) -> https://cdn.simpleicons.org/<icon>/e6e6e6
//   name     — display name
//   sub      — short "by Org" line under the name
//   purpose  — one-sentence description (shown on the listing card)
//   context  — multi-paragraph longer-form text for the detail page
//   url      — canonical homepage
//   github   — optional GitHub link
//   x        — optional X (Twitter) link
//   tags     — short list, 3–5

var AGENT_GROUPS = {
  framework: 'Framework',
  model:     'Model',
  archetype: 'Archetype'
};

var AGENTS = [
  {
    id: 'openclaw',
    group: 'framework',
    mark: 'OC',
    icon: '',
    logoUrl: 'https://github.com/openclaw.png',
    name: 'OpenClaw',
    sub: 'open-source agent framework',
    purpose: 'Open-source framework for building autonomous AI agents with structured tool use and multi-step reasoning.',
    context:
      "OpenClaw is a framework for composing AI agents that can plan, call tools, and execute multi-step workflows without constant human babysitting. It focuses on the plumbing most agent projects end up rebuilding: tool schemas, state persistence across steps, error recovery when a tool call fails, and observability so you can actually debug why the agent did what it did.\n\n" +
      "Typical use-cases include browser automation, data-pipeline orchestration, and research workflows where a single prompt-and-response isn't enough. The project is open-source, so you can fork the loop rather than fighting a closed SDK.\n\n" +
      "Pair this with prompts from the `agents` category in the library — e.g. tool-selection rubrics, failure-mode scoring, or ReAct-style scratchpads.",
    url: 'https://openclaw.ai/',
    github: 'https://github.com/openclaw/openclaw',
    x: 'https://x.com/openclaw',
    tags: ['framework', 'open-source', 'tool-use', 'multi-step']
  },
  {
    id: 'hermes',
    group: 'model',
    mark: 'HR',
    icon: '',
    logoUrl: 'https://github.com/NousResearch.png',
    name: 'Hermes',
    sub: 'Nous Research',
    purpose: "Nous Research's fine-tuned model series optimised for instruction-following, function calling, and agentic task execution.",
    context:
      "Hermes is a family of open-weight models from Nous Research, fine-tuned on instruction-following, function calling, and multi-turn agentic behaviour. Unlike general-purpose chat models, Hermes is explicitly trained to respect a tool schema and return structured outputs that an agent loop can parse without retries.\n\n" +
      "Hermes models ship across multiple base sizes so you can trade latency vs. reasoning depth. They are an especially strong fit for self-hosted or BYO-key setups where you don't want to send every agent step through a closed API.\n\n" +
      "Pair with prompts that assume a disciplined, tool-using model — the library's `agents` category has several.",
    url: 'https://hermes-agent.nousresearch.com/',
    github: 'https://github.com/NousResearch/hermes-agent',
    x: 'https://x.com/NousResearch',
    tags: ['model', 'fine-tuned', 'function-calling', 'open-weights']
  }
];
