// prompt-library — collections data
// Curated prompt packs grouped by use case or persona.
// Each collection references prompt IDs from prompts.js.

const COLLECTIONS = [

  {
    id: 1,
    slug: "crypto-due-diligence",
    title: "Crypto Due Diligence Kit",
    description: "The full research stack for evaluating any token — from whitepaper to on-chain signals. Run these in sequence for a complete picture before you touch a position.",
    tags: ["web3", "research", "due-diligence"],
    promptIds: [2, 1, 3, 5, 6, 7],
    curator: "SarutobiSasuke"
  },

  {
    id: 2,
    slug: "founder-stack",
    title: "Founder Stack",
    description: "Everything a founder or BD lead needs day-to-day — from cold outreach to stakeholder updates to decision frameworks that hold up under scrutiny.",
    tags: ["business", "strategy", "founder"],
    promptIds: [22, 20, 21, 23, 38, 37, 41],
    curator: "SarutobiSasuke"
  },

  {
    id: 3,
    slug: "ai-dev-toolkit",
    title: "AI Dev Toolkit",
    description: "Ship faster and break less. The essential prompts for developers vibe-coding with AI — from project kickoff through code review, debugging, and docs.",
    tags: ["coding", "dev", "agents"],
    promptIds: [19, 14, 15, 16, 17, 18, 11],
    curator: "SarutobiSasuke"
  },

  {
    id: 4,
    slug: "content-creator-kit",
    title: "Content Creator Kit",
    description: "Build and grow an audience with AI. Covers the full content loop — threads, newsletters, brand voice, announcements, and converting long-form to short-form.",
    tags: ["marketing", "content", "social"],
    promptIds: [30, 25, 26, 27, 28, 29],
    curator: "SarutobiSasuke"
  },

  {
    id: 5,
    slug: "strategic-decision-maker",
    title: "Strategic Decision Maker",
    description: "Sharpen decisions and avoid common thinking traps. Pre-mortems, steelmanning, scenario planning, root cause analysis — the toolkit for high-stakes calls.",
    tags: ["strategy", "decisions", "thinking"],
    promptIds: [37, 39, 38, 42, 41, 40],
    curator: "SarutobiSasuke"
  },

  {
    id: 6,
    slug: "ai-qa-suite",
    title: "AI QA Suite",
    description: "Test, grade, and harden your AI outputs before they reach users. Design evals, catch hallucinations, write rubrics, and red-team your prompts systematically.",
    tags: ["evaluation", "testing", "quality"],
    promptIds: [50, 51, 49, 52, 53, 54],
    curator: "SarutobiSasuke"
  },

  {
    id: 7,
    slug: "vibe-coding-generalist-template",
    title: "Vibe Coding Generalist Template",
    description: "11 production-ready agentic personas for vibe-coded software projects. Use one for a focused pass, or run the Agent Council Protocol to orchestrate the full team — from product and design through security, ops, analytics, and launch.",
    tags: ["vibe-coding", "agents", "personas"],
    repoUrl: "https://github.com/SarutobiSasuke8/vibe-coding-generalist-template",
    files: [
      "Agent Council Protocol — orchestration layer for multi-persona work",
      "Head of Product — product strategy, vibe protection, scope discipline",
      "Design Director / UX Lead — experience clarity, visual coherence, accessibility",
      "CTO — architecture, implementation, speed-to-quality",
      "Code Reviewer / Maintainability Critic — correctness, coupling, regression risk",
      "QA / Acceptance Tester — real workflows, state coverage, ship readiness",
      "AEGIS – Defensive Security Lead — zero-trust local security, prompt-injection defense",
      "Ops / Deployment Engineer — reliable releases, environment hygiene, rollback",
      "Delivery Lead / Technical Producer — milestones, slices, next actions",
      "Research Scout — evidence-aware decision support, source quality",
      "Data / Analytics Lead — privacy-conscious metrics, event design, learning loops",
      "Growth / Launch Strategist — positioning clarity, credible proof, feedback loops"
    ],
    curator: "SarutobiSasuke"
  }

];
