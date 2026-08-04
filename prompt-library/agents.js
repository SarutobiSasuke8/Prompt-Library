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
    sub: 'open-source multi-channel gateway',
    purpose: 'Self-hosted TypeScript gateway that fronts many messaging platforms at once and routes each channel to a different agent.',
    context:
      "OpenClaw is a single self-hosted Gateway process that bridges messaging platforms to always-available AI agents. One deployment fronts Telegram, WhatsApp, Discord, Signal, Slack, iMessage, Microsoft Teams, Matrix, Google Chat and more, and routing is configurable per channel, per contact or per group — so different agents can answer in different rooms without running separate stacks.\n\n" +
      "It is worth being precise about the category, because the name gets used loosely: this is the control plane, not the agent loop. It solves platform bridging, identity and routing. The reasoning still comes from whatever model and agent runtime you point it at. Guided setup runs through `openclaw onboard`, and because it is self-hosted there is no dependence on a vendor's uptime or data handling.\n\n" +
      "The tradeoff is operator burden: a Node gateway plus a marketplace and security posture to keep current is meaningfully more to maintain than a single-agent runtime. Reach for it once you actually have several agents or several channels; below that, a standalone runtime is a bounded deployment task and this is not.\n\n" +
      "See the tool entry for the same project, and pair with prompts from the `agents` category — routing rubrics, escalation criteria, and per-channel persona definitions.",
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
