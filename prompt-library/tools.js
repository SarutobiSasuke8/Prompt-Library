// tools.js — shared tool data for tools.html and tool.html
// Schema: { id, group, mark, icon, name, sub, pricing, url, x, github, deepLink, purpose, description }
//   icon       : Simple Icons slug  (https://simpleicons.org) — leave '' if unknown
//   x          : X / Twitter profile URL (optional)
//   github     : GitHub profile or repo URL (optional)
//   deepLink   : 'supported' | 'planned' | 'none'
//   description: 3–5 sentence expanded detail shown on the tool detail page

var TOOL_GROUPS = {
  'chat':      'Chat UIs',
  'coding':    'Coding',
  'infra':     'Infra',
  'local':     'Local / Self-host',
  'knowledge': 'Knowledge',
  'agents':    'Agents'
};

var TOOLS = [

  // ---- Chat UIs ----
  {
    id: 'claude', group: 'chat', mark: 'CL', icon: 'claude', name: 'Claude', sub: 'Anthropic',
    pricing: 'freemium', url: 'https://claude.ai/', x: 'https://x.com/AnthropicAI', github: 'https://github.com/anthropics',
    deepLink: 'planned',
    purpose: 'The reference chat UI for long-context and hard-reasoning work. Strong defaults for structured outputs and agentic tasks.',
    description: "Anthropic's flagship chat product, built on Claude Sonnet and Opus. The 200k context window handles full codebases, long documents, and multi-turn research sessions without losing the thread. Projects let you persist a system prompt and shared context across every conversation in a folder — the most direct way to run prompts from this library repeatedly without re-pasting. Free tier is rate-limited; Pro ($20/month) removes most day-to-day limits and unlocks Claude Opus. Weak point: no live web browsing on the base plan, and deep-link system prompt support is still in progress."
  },
  {
    id: 'chatgpt', group: 'chat', mark: 'GP', icon: 'openai', name: 'ChatGPT', sub: 'OpenAI',
    pricing: 'freemium', url: 'https://chatgpt.com/', x: 'https://x.com/OpenAI', github: 'https://github.com/openai',
    deepLink: 'supported',
    purpose: 'Most popular chat UI. Widest ecosystem of GPTs, plugins, and integrations. Strong at code and multi-modal tasks.',
    description: "OpenAI's consumer product — the tool that introduced most people to LLMs. The GPT Store offers thousands of custom GPTs with pre-loaded system prompts and tool integrations. Deep-link support (the ?model= and system param in shared URLs) makes it the easiest tool to test prompts from this library without manual copy-paste. GPT-4o is the default model; o3 and o4-mini are available for harder reasoning tasks on paid tiers. Weak point: output quality degrades noticeably in long sessions and rate limits on the free tier are aggressive."
  },
  {
    id: 'gemini', group: 'chat', mark: 'GE', icon: 'googlegemini', name: 'Gemini', sub: 'Google',
    pricing: 'freemium', url: 'https://gemini.google.com/', x: 'https://x.com/GoogleDeepMind', github: 'https://github.com/google-deepmind',
    deepLink: 'planned',
    purpose: "Google's chat UI with tight Workspace and Search integration. Strong multimodal and long-context.",
    description: "Google's AI chat with native Search grounding and tight Workspace integration — it can reference your Gmail, Drive, Docs, and Calendar directly on paid plans. Gemini 2.5 Pro has one of the strongest publicly benchmarked context windows and reasoning scores available in a consumer product. The Google AI Studio version is better for developers: free API access, a prompt workbench, and structured output mode. Weak point: system prompt handling is less reliable than Claude or GPT-4o, and the consumer UI changes rapidly between model versions."
  },
  {
    id: 'grok', group: 'chat', mark: 'GR', icon: 'x', name: 'Grok', sub: 'xAI',
    pricing: 'freemium', url: 'https://grok.com/', x: 'https://x.com/xai', github: 'https://github.com/xai-org',
    deepLink: 'none',
    purpose: "xAI's chat UI. Integrated with X, leans unfiltered, useful for crypto and market-adjacent research.",
    description: "xAI's chat model, deeply integrated with X (Twitter). Real-time access to the X firehose makes it distinctly useful for crypto, market sentiment, and social-signal research where recency matters more than depth. Less filtered than mainstream chat UIs by design. The DeepSearch mode chains web and X searches to produce longer research outputs. Weak point: no persistent custom instructions, model versioning is opaque, and the free version runs on older Grok versions."
  },
  {
    id: 'perplexity', group: 'chat', mark: 'PX', icon: 'perplexity', name: 'Perplexity', sub: 'Perplexity',
    pricing: 'freemium', url: 'https://www.perplexity.ai/', x: 'https://x.com/perplexity_ai', github: 'https://github.com/perplexity-ai',
    deepLink: 'supported',
    purpose: 'Answer engine with inline citations. Best when research + sourcing matters more than raw generation.',
    description: "A hybrid search engine and LLM interface that returns answers with inline source citations. Every claim is linked to a primary source, making outputs verifiable in a way purely generative tools aren't. Deep-link support lets you share a pre-loaded research prompt — the recipient sees sources alongside the answer. Pro Search performs multi-step web research before synthesising; it's slower but more thorough than a single search pass. Weak point: creative, long-form, and coding tasks are clearly secondary use cases."
  },
  {
    id: 'lechat', group: 'chat', mark: 'LC', icon: 'mistralai', name: 'Le Chat', sub: 'Mistral',
    pricing: 'free', url: 'https://chat.mistral.ai/', x: 'https://x.com/MistralAI', github: 'https://github.com/mistralai',
    deepLink: 'none',
    purpose: "Mistral's chat UI. European-hosted, fast and capable. Good GDPR-friendly alternative to US-hosted options.",
    description: "Mistral's official chat product, running on their own Mistral Large and Pixtral models. French company, EU-hosted infrastructure — the default choice when GDPR or data residency is a hard requirement and you can't use US-based providers. Genuinely fast: Mistral's inference stack is competitive with GPT-4o on latency. The free tier is generous; API access goes through La Plateforme separately. Weak point: smaller plugin and tool ecosystem compared to ChatGPT, and no live web search in the base plan."
  },
  {
    id: 'deepseek', group: 'chat', mark: 'DS', icon: 'deepseek', name: 'DeepSeek', sub: 'DeepSeek',
    pricing: 'free', url: 'https://chat.deepseek.com/', x: 'https://x.com/deepseek_ai', github: 'https://github.com/deepseek-ai',
    deepLink: 'none',
    purpose: 'Competitive reasoning at very low cost. Consider data-residency implications before sending sensitive content.',
    description: "A Chinese AI lab producing models that benchmark competitively against GPT-4o and Claude at a fraction of inference cost. The R1 reasoning model is particularly strong on logic, mathematics, and structured problem-solving. The V3 model is the faster, cheaper general-purpose option. Important caveat: DeepSeek is subject to Chinese data law — treat it as a public service and avoid sending proprietary, personal, or sensitive content. Strong picks for: competitive maths, logic puzzles, code generation on non-sensitive problems."
  },
  {
    id: 'copilot-ms', group: 'chat', mark: 'MC', icon: '', name: 'Microsoft Copilot', sub: 'Microsoft',
    pricing: 'freemium', url: 'https://copilot.microsoft.com/', x: 'https://x.com/Microsoft', github: 'https://github.com/microsoft',
    deepLink: 'none',
    purpose: "Microsoft's consumer AI powered by GPT-4o. Tight Windows and Office 365 integration for enterprise users.",
    description: "Microsoft's AI layer, powered by GPT-4o via Azure OpenAI Service. The consumer version at copilot.microsoft.com is useful but conservative — safety filters are more aggressive than ChatGPT directly. The real value is inside Microsoft 365: Copilot in Word drafts documents from your brief, in Excel analyses data via natural language, in Teams summarises meeting transcripts, and in Outlook drafts replies. Microsoft Graph integration means it can reference your emails, calendar, and shared files. Weak point: the consumer product is noticeably more restricted than the enterprise version."
  },
  {
    id: 'cohere', group: 'chat', mark: 'CO', icon: '', name: 'Coral', sub: 'Cohere',
    pricing: 'freemium', url: 'https://coral.cohere.com/', x: 'https://x.com/cohere', github: 'https://github.com/cohere-ai',
    deepLink: 'none',
    purpose: 'Enterprise-focused chat with strong retrieval augmentation. Good for grounding answers in large document sets.',
    description: "Cohere's enterprise chat product, built on their Command R+ model and optimised for retrieval-augmented generation. The standout feature is document grounding: connect Coral to a search index, file store, or SharePoint, and every answer cites the source document. Designed for B2B deployments where hallucination is costly, accuracy is auditable, and traceability to source matters. Pricing targets enterprise contracts rather than individual users. Weak point: it's not a general-purpose tool — personal productivity, creative writing, and coding are secondary use cases at best."
  },

  // ---- Coding ----
  {
    id: 'claude-code', group: 'coding', mark: 'CC', icon: 'anthropic', name: 'Claude Code', sub: 'Anthropic CLI',
    pricing: 'paid', url: 'https://claude.ai/code', x: 'https://x.com/AnthropicAI', github: 'https://github.com/anthropics/claude-code',
    deepLink: 'none',
    purpose: 'Agentic CLI. Reads and edits your repo, runs commands, ships PRs. Best pairing for long-form engineering prompts.',
    description: "Anthropic's agentic coding CLI that operates at the terminal level rather than inside an IDE. It reads your full repository, writes to files, runs shell commands, and can open GitHub pull requests — all within a single conversational session. The system prompt slot is where prompts from this library do their heaviest lifting: a well-crafted engineering prompt constrains Claude Code's scope, sets code style expectations, and defines what 'done' means before the agent starts. Requires an Anthropic Pro or Max subscription. Weak point: there's no GUI; errors during agentic runs require debugging in the terminal."
  },
  {
    id: 'codex', group: 'coding', mark: 'CX', icon: 'openai', name: 'Codex', sub: 'OpenAI',
    pricing: 'paid', url: 'https://chatgpt.com/codex', x: 'https://x.com/OpenAI', github: 'https://github.com/openai',
    deepLink: 'planned',
    purpose: "OpenAI's cloud-hosted coding agent inside ChatGPT. Strong at multi-file tasks and repo-level reasoning.",
    description: "OpenAI's cloud-based coding agent, available inside ChatGPT on paid plans. Unlike IDE extensions, Codex runs tasks asynchronously in a containerised sandbox — submit a task, it works in the background, and returns a diff for review. Strong at long-horizon multi-file refactors; weaker at the interactive back-and-forth that characterises a typical debugging session. Connects to GitHub to clone repos directly, so no local setup is required. Weak point: no local file access; everything goes through GitHub, and the background model means less control over intermediate steps."
  },
  {
    id: 'cursor', group: 'coding', mark: 'CR', icon: 'cursor', name: 'Cursor', sub: 'Anysphere',
    pricing: 'freemium', url: 'https://cursor.com/', x: 'https://x.com/cursor_ai', github: 'https://github.com/getcursor',
    deepLink: 'none',
    purpose: 'VS Code fork with deep AI integration. Strong at inline edits and multi-file refactors. Most popular among full-time devs.',
    description: "The most widely used AI IDE among working engineers. Built as a VS Code fork, so extensions, keybindings, and themes all transfer with near-zero friction. Agent mode (Cmd+K or Composer) handles multi-file edits with context from your full codebase; Tab autocomplete handles inline suggestions. Model choice is flexible — Claude 3.7, GPT-4o, and Gemini are all available in settings. Free tier is usable; Pro ($20/month) removes model limits for professionals. Weak point: Anysphere has access to your code via their API — check the privacy settings if that's a concern."
  },
  {
    id: 'windsurf', group: 'coding', mark: 'WS', icon: 'windsurf', name: 'Windsurf', sub: 'Codeium',
    pricing: 'freemium', url: 'https://windsurf.com/', x: 'https://x.com/codeium', github: 'https://github.com/Exafunction/codeium',
    deepLink: 'none',
    purpose: 'IDE with agentic Cascade flows. Cursor competitor with stronger multi-step execution and background agents.',
    description: "Codeium's IDE, competing directly with Cursor. The key differentiator is Cascade — an agentic engine that can plan and execute multi-step coding tasks with less manual steering than Cursor's Composer. It maintains context across file edits, terminal runs, and browser previews in a single coherent flow. Background agent mode lets you kick off a task and keep working while it runs. Pricing has historically been more generous than Cursor for heavy users. Weak point: smaller community, fewer tutorials, and the extension ecosystem hasn't caught up to Cursor yet."
  },
  {
    id: 'cline', group: 'coding', mark: 'CN', icon: 'cline', name: 'Cline', sub: 'VS Code extension',
    pricing: 'byok', url: 'https://cline.bot/', x: 'https://x.com/clinedotbot', github: 'https://github.com/cline/cline',
    deepLink: 'none',
    purpose: 'Open-source agentic coding extension for VS Code. Bring your own API key; no vendor lock-in.',
    description: "An open-source VS Code extension that runs full agent sessions using your own API keys — Claude, GPT-4o, Gemini, or local models via Ollama. No subscription, no vendor lock-in, full transparency: the source code is public and the extension doesn't route your code through a proprietary server. Tool use includes file read/write, terminal commands, and browser control. Budget limits in settings help prevent runaway API spend on long sessions. Weak point: because API keys are billed directly, complex agentic tasks on frontier models can get expensive fast."
  },
  {
    id: 'aider', group: 'coding', mark: 'AD', icon: 'gnubash', name: 'Aider', sub: 'open source CLI',
    pricing: 'byok', url: 'https://aider.chat/', x: 'https://x.com/aider_ai', github: 'https://github.com/paul-gauthier/aider',
    deepLink: 'none',
    purpose: 'Terminal-based coding agent. Minimal, scriptable, and git-native. The power-user choice for AI-assisted development.',
    description: "A terminal-first coding agent built for developers who live in the shell. Git-native by design: every AI-generated change is automatically committed with a clear message, so the full change history is preserved and rollback is trivial. Supports most major models via API key (Claude, GPT-4o, Gemini, local). Benchmark-competitive on coding tasks; the leaderboard at aider.chat tracks model performance on real repository edits. Works best on well-scoped tasks from a clean branch. Weak point: no GUI; effective use requires comfort with the terminal, git, and understanding which model to use for which task."
  },
  {
    id: 'copilot', group: 'coding', mark: 'CP', icon: 'githubcopilot', name: 'GitHub Copilot', sub: 'GitHub',
    pricing: 'paid', url: 'https://github.com/features/copilot', x: 'https://x.com/GitHubCopilot', github: 'https://github.com/features/copilot',
    deepLink: 'none',
    purpose: "The mainstream IDE autocomplete + chat. Ubiquitous in JetBrains and VS Code; works where the others don't.",
    description: "The incumbent AI coding assistant, shipping as a first-class extension in VS Code, JetBrains IDEs, Visual Studio, and Neovim. More conservative than Cursor or Cline — it completes and suggests rather than autonomously rewriting — but its IDE coverage is the decisive differentiator: JetBrains users in particular often have no viable alternative with comparable integration depth. Copilot Chat handles inline questions and refactors; Copilot Workspace (in beta) is the multi-file agentic version. Priced at $10/month individual, with free tiers now available. Weak point: autocomplete quality is noticeably behind Cursor for complex completions."
  },
  {
    id: 'zed', group: 'coding', mark: 'ZA', icon: 'zedindustries', name: 'Zed AI', sub: 'Zed',
    pricing: 'freemium', url: 'https://zed.dev/', x: 'https://x.com/zeddotdev', github: 'https://github.com/zed-industries/zed',
    deepLink: 'none',
    purpose: 'High-performance native editor with built-in AI. Fast, opinionated, and Rust-based. Requires a mindset shift from VS Code.',
    description: "A native code editor written in Rust that prioritises raw performance: renders faster than any Electron-based editor, feels instant on large files, and has minimal memory overhead. Inline AI and panel chat are built in; model selection is flexible (Claude, GPT-4o, and local models). The collaborative multiplayer mode is a genuine differentiator — real-time co-editing like a code-focused Google Docs. Weak point: keybindings, extensions, and themes don't transfer from VS Code; the extension ecosystem is significantly smaller; macOS and Linux only (Windows in progress)."
  },
  {
    id: 'bolt', group: 'coding', mark: 'BL', icon: 'stackblitz', name: 'Bolt.new', sub: 'StackBlitz',
    pricing: 'freemium', url: 'https://bolt.new/', x: 'https://x.com/stackblitz', github: 'https://github.com/stackblitz',
    deepLink: 'none',
    purpose: 'Browser-based full-stack app builder. Prompt to running app in seconds. No local setup; great for fast prototyping.',
    description: "A browser-based full-stack builder powered by StackBlitz's WebContainers technology, which runs Node.js directly in the browser. Describe an app in a prompt, watch it scaffold, install dependencies, and run — no local setup, no Docker, no config files. The output is editable in an in-browser VS Code interface and deployable to Netlify or Cloudflare in one click. Best for throwaway prototypes, client demos, and quickly validating an idea. Weak point: production-grade apps quickly hit the limits of the sandbox — complex backends, file system access, and native dependencies don't work."
  },
  {
    id: 'v0', group: 'coding', mark: 'V0', icon: 'v0', name: 'v0', sub: 'Vercel',
    pricing: 'freemium', url: 'https://v0.dev/', x: 'https://x.com/vercel', github: 'https://github.com/vercel',
    deepLink: 'none',
    purpose: 'UI generation from prompts. Outputs React and shadcn/ui code you can paste straight into your project.',
    description: "Vercel's UI generation tool: describe a component or paste a screenshot, get React + shadcn/ui + Tailwind output that drops straight into a Next.js project. Strong at component-level work — landing page sections, data tables, forms, dashboard cards. Tightly integrated with Vercel's deployment pipeline; one-click deploy to preview URLs. The generated code is clean enough to use in production for most UI work. Weak point: not suitable for full-app generation or anything involving backend logic, state management complexity, or non-React stacks."
  },
  {
    id: 'replit', group: 'coding', mark: 'RI', icon: 'replit', name: 'Replit', sub: 'Replit',
    pricing: 'freemium', url: 'https://replit.com/', x: 'https://x.com/Replit', github: 'https://github.com/replit',
    deepLink: 'none',
    purpose: 'Browser IDE with AI agent. Good for prototyping and shipping small apps without any local setup overhead.',
    description: "A browser-hosted IDE with an AI agent built in, targeting students, hobbyists, and rapid prototypers. The agent can create, edit, and deploy apps without leaving the browser; hosting is included and automatic. Multiplayer editing (real-time co-editing) makes it useful for pair programming sessions and code teaching. No local setup required — useful for getting non-technical collaborators into a running codebase quickly. Weak point: serious production applications quickly exceed what Replit's containerised hosting model can handle; it's primarily an educational and prototyping environment, not a production deployment target."
  },

  // ---- Infra ----
  {
    id: 'openrouter', group: 'infra', mark: 'OR', icon: 'openrouter', name: 'OpenRouter', sub: 'model router',
    pricing: 'paid', url: 'https://openrouter.ai/', x: 'https://x.com/OpenRouterAI', github: 'https://github.com/openrouterapp',
    deepLink: 'none',
    purpose: 'Unified API across dozens of frontier and open models. Route by cost, latency, or capability — one key, all providers.',
    description: "A unified API proxy routing requests across 100+ models from Anthropic, OpenAI, Google, Meta, Mistral, Cohere, and open-source providers. One API key, one OpenAI-compatible base URL, every model. Routing rules can optimise for cost, latency, or fallback on failure — useful for production apps where model availability varies. Pricing passes through model costs with a small markup; some open-source models are free. The model list updates quickly as new releases drop. Weak point: you're adding a proxy hop; latency-sensitive applications should measure the overhead before committing."
  },
  {
    id: 'groq', group: 'infra', mark: 'GQ', icon: '', name: 'Groq', sub: 'inference',
    pricing: 'freemium', url: 'https://groq.com/', x: 'https://x.com/GroqInc', github: 'https://github.com/groq',
    deepLink: 'none',
    purpose: 'Extremely fast inference on select open models via custom LPU hardware. Best for low-latency experimentation.',
    description: "Custom LPU (Language Processing Unit) hardware delivering consistently fast inference for open models — Llama 3, Mistral, Gemma, and Qwen at sub-second first-token latency with high throughput. Primarily a developer API, not a consumer product; the console at console.groq.com gives API keys, usage stats, and a playground. The free tier is generous for experimentation. OpenAI-compatible — swap the base URL and keep your existing SDK code. Weak point: model selection is deliberately narrow (depth over breadth); it's an inference speed provider, not a model marketplace."
  },
  {
    id: 'hf', group: 'infra', mark: 'HF', icon: 'huggingface', name: 'Hugging Face', sub: 'model hub',
    pricing: 'freemium', url: 'https://huggingface.co/', x: 'https://x.com/huggingface', github: 'https://github.com/huggingface',
    deepLink: 'none',
    purpose: 'The model hub. Browse, run, and fine-tune thousands of open-weight models. Inference API covers most everyday use cases.',
    description: "The central hub for the open-source AI community — over 600,000 models, 100,000+ datasets, and 300,000+ Spaces (hosted demos). The Inference API runs most popular models without any setup. Transformers, PEFT, Diffusers, and TRL are all first-party libraries covering fine-tuning, LoRA, and RLHF pipelines. AutoTrain automates fine-tuning on your own dataset with no code. Spaces lets you deploy a Gradio or Streamlit app in minutes. The hub is also the standard release channel for new open-weight model releases (Llama, Mistral, Qwen, etc.). Weak point: the free Inference API is rate-limited and unreliable for production; serious use requires a paid Inference Endpoint."
  },
  {
    id: 'replicate', group: 'infra', mark: 'RE', icon: 'replicate', name: 'Replicate', sub: 'inference',
    pricing: 'paid', url: 'https://replicate.com/', x: 'https://x.com/replicate', github: 'https://github.com/replicate',
    deepLink: 'none',
    purpose: 'Hosted inference for open-source models. Strongest for multimodal (image, audio, video) experiments via API.',
    description: "Hosted inference for open-source models with a strong emphasis on multimodal tasks. The model library covers image generation (Flux, SDXL, ControlNet), audio transcription (Whisper), video generation, and text models — all accessible via a simple REST API. Per-second compute billing with no subscription means you only pay for what you run. Webhook support and async predictions work well for background processing pipelines. The Python client library is clean and minimal. Weak point: cold start latency is high for infrequently-used models — not suitable for latency-sensitive production; use dedicated endpoints for that."
  },
  {
    id: 'aistudio', group: 'infra', mark: 'AI', icon: 'googlegemini', name: 'AI Studio', sub: 'Google',
    pricing: 'free', url: 'https://aistudio.google.com/', x: 'https://x.com/GoogleAI', github: 'https://github.com/google/generative-ai-python',
    deepLink: 'none',
    purpose: "Google's Gemini playground. Generous free tier, long context, and easy API key creation.",
    description: "Google's developer playground for the Gemini model family. The most accessible entry point for Gemini access: create a free API key in two clicks, test prompts in the workbench, and get working code snippets in Python, JavaScript, or curl. Free tier includes a 1M-token context window, which dwarfs most competitors on the free plan. Supports structured output mode, system instructions, function calling, and grounding with Google Search. The natural stepping stone before committing to the Vertex AI production path. Weak point: the free tier has rate limits that surface quickly; the UX assumes developer familiarity — it's a workbench, not a consumer product."
  },
  {
    id: 'anthropic-console', group: 'infra', mark: 'AC', icon: 'anthropic', name: 'Anthropic Console', sub: 'Anthropic',
    pricing: 'paid', url: 'https://console.anthropic.com/', x: 'https://x.com/AnthropicAI', github: 'https://github.com/anthropics',
    deepLink: 'none',
    purpose: "Claude's developer console. Prompt evaluation, workbench, API key management, and usage analytics.",
    description: "The official developer environment for Claude. Create and manage API keys, test prompts in the Workbench with configurable temperature and max tokens, define tool schemas for function calling, and monitor token usage and costs across projects. The Workbench is the fastest way to iterate on system prompts before integrating them into code — you can compare model versions side by side. Evaluations (evals) let you score prompt outputs against a test set to track quality regressions. The API keys created here are the same ones Claude Code and any SDK integration use. Weak point: no free tier for API access; all usage is metered."
  },
  {
    id: 'together', group: 'infra', mark: 'TA', icon: '', name: 'Together AI', sub: 'inference',
    pricing: 'paid', url: 'https://www.together.ai/', x: 'https://x.com/togethercompute', github: 'https://github.com/togethercomputer',
    deepLink: 'none',
    purpose: 'Fast, affordable inference for open-source models. Good for production workloads where Groq capacity is limited.',
    description: "Cloud inference for popular open-source models (Llama 3, Mistral, Qwen, DBRX, and others) targeting production workloads. Competitive pricing versus proprietary providers; dedicated endpoints allow reserved capacity for predictable latency SLAs. Supports batch inference, function calling, and the OpenAI-compatible SDK interface. A good fallback or complement to Groq when you need broader model selection or more reliable capacity. Together Research also publishes open models. Weak point: inference speed doesn't match Groq's custom hardware; if raw throughput is the priority, Groq is faster on the models they both support."
  },
  {
    id: 'fireworks', group: 'infra', mark: 'FW', icon: '', name: 'Fireworks AI', sub: 'inference',
    pricing: 'paid', url: 'https://fireworks.ai/', x: 'https://x.com/FireworksAI', github: 'https://github.com/fw-ai',
    deepLink: 'none',
    purpose: 'Optimised inference for open-source models with function-calling support. Targets compound AI and agentic workloads.',
    description: "Inference provider optimised for function calling, structured outputs, and agentic use cases using open-source models. FireFunction models are fine-tuned specifically for reliable tool use, which is the main differentiator from generic inference providers. OpenAI SDK-compatible — change the base URL, keep your existing code. Compound AI (chaining multiple model calls with tool use) is a first-class use case rather than an afterthought. Pricing is competitive with Together AI. Weak point: less brand recognition means fewer community tutorials; model selection skews toward popular OSS rather than cutting-edge fine-tunes."
  },

  // ---- Local / Self-host ----
  {
    id: 'ollama', group: 'local', mark: 'OL', icon: 'ollama', name: 'Ollama', sub: 'local runner',
    pricing: 'free', url: 'https://ollama.com/', x: 'https://x.com/ollama', github: 'https://github.com/ollama/ollama',
    deepLink: 'none',
    purpose: 'Run open-weight models locally via CLI and HTTP API. The standard entry point for self-hosted LLMs on Mac and Linux.',
    description: "The de-facto standard for running open-weight models locally. One command downloads, quantises, and runs a model: `ollama run llama3`. The HTTP server exposes an OpenAI-compatible REST API, so tools that support Ollama work with any model in the library — Llama 3, Mistral, Qwen, Phi, Gemma, and hundreds more. Supported as a backend by Open WebUI, Cline, and most local-model tools. Best on Apple Silicon (Metal acceleration); works on Linux with NVIDIA/AMD; Windows support is available. Minimum 8–16 GB RAM for 7B models. Weak point: no GUI — you manage models via CLI; LM Studio or Jan are better for non-terminal users."
  },
  {
    id: 'lmstudio', group: 'local', mark: 'LM', icon: '', name: 'LM Studio', sub: 'desktop app',
    pricing: 'free', url: 'https://lmstudio.ai/', x: 'https://x.com/LMStudio_AI', github: '',
    deepLink: 'none',
    purpose: 'Desktop GUI for downloading and running local models. The most approachable on-ramp for non-terminal users.',
    description: "Desktop GUI that wraps model discovery, quantisation selection, and local inference behind a clean interface — no terminal required. Browse and download models from Hugging Face directly in the app; compare quantisation options (Q4, Q8, etc.) and their RAM requirements before downloading. The built-in chat UI is functional for everyday use; the local server mode exposes an OpenAI-compatible API so other tools can use it as a backend. Cross-platform: Mac (Apple Silicon and Intel), Windows, Linux. Weak point: model management is more opaque than Ollama's CLI — harder to script or automate; closed-source."
  },
  {
    id: 'jan', group: 'local', mark: 'JN', icon: '', name: 'Jan', sub: 'open source desktop',
    pricing: 'free', url: 'https://jan.ai/', x: 'https://x.com/janframework', github: 'https://github.com/janhq/jan',
    deepLink: 'none',
    purpose: 'Open-source, offline-first chat UI. Model-agnostic, extensible via extensions, no cloud dependency.',
    description: "Open-source, offline-first desktop app for running local models. The full application code is public on GitHub — no hidden telemetry, no cloud calls. Model-agnostic: download from Hugging Face or Jan's own hub, or connect to remote providers (OpenAI, Claude) via the API extension. Extensible through a plugin system; the built-in local server is OpenAI-compatible. Strong privacy posture: everything stays on-device unless you explicitly configure a remote backend. Weak point: slower release cadence than Ollama or LM Studio; the UX is less polished, and the extension ecosystem is smaller."
  },
  {
    id: 'localai', group: 'local', mark: 'LA', icon: '', name: 'LocalAI', sub: 'OpenAI-compatible',
    pricing: 'free', url: 'https://localai.io/', x: 'https://x.com/LocalAI_API', github: 'https://github.com/mudler/LocalAI',
    deepLink: 'none',
    purpose: 'Drop-in OpenAI-compatible API server for local models. Swap cloud calls for local without changing your SDK code.',
    description: "A self-hosted OpenAI API-compatible server that runs GGUF text models, Whisper for speech-to-text, Stable Diffusion for image generation, and more from a single container. The value proposition is a drop-in replacement: point your OpenAI SDK at `localhost:8080`, change nothing else, and your existing application code runs against local models. Designed for integration and automation rather than interactive chat. Docker Compose is the recommended install path. Weak point: setup is more involved than Ollama — expect to spend time on configuration; active development means breaking changes between releases."
  },
  {
    id: 'gpt4all', group: 'local', mark: 'G4', icon: '', name: 'GPT4All', sub: 'Nomic',
    pricing: 'free', url: 'https://www.nomic.ai/gpt4all', x: 'https://x.com/nomic_ai', github: 'https://github.com/nomic-ai/gpt4all',
    deepLink: 'none',
    purpose: 'Privacy-first local chat with pre-packaged quantized models. Runs on modest hardware, no internet needed.',
    description: "Nomic's privacy-focused desktop chat application shipping pre-packaged quantised models that run entirely on CPU — making it the most accessible local option for users without a dedicated GPU. No data ever leaves the device; no internet connection required after the initial model download. Simple enough for non-technical users; the model library is curated to what reliably runs on modest hardware. LocalDocs lets you chat with your own document folder. Weak point: CPU-only inference is significantly slower than GPU-accelerated alternatives; the model selection is conservative (optimised for compatibility over capability); power users will hit the ceiling quickly."
  },
  {
    id: 'openwebui', group: 'local', mark: 'OW', icon: '', name: 'Open WebUI', sub: 'open source',
    pricing: 'free', url: 'https://openwebui.com/', x: 'https://x.com/OpenWebUI', github: 'https://github.com/open-webui/open-webui',
    deepLink: 'none',
    purpose: 'Self-hosted web UI for Ollama and OpenAI-compatible backends. Feature-rich, actively maintained, Docker-friendly.',
    description: "A feature-rich self-hosted web interface that sits in front of Ollama, LocalAI, or any OpenAI-compatible backend. Multi-user with role-based access control, conversation history, custom model personas, document RAG (upload files and chat with them), image generation, and tool/plugin support — all running on your own infrastructure. Docker Compose install in under five minutes is the standard path. The most full-featured self-hosted alternative to ChatGPT's web UI; actively maintained with frequent releases. Weak point: feature density means a steeper configuration curve than a simple Ollama install; resource requirements are higher than the backend alone."
  },

  // ---- Knowledge / PKM ----
  {
    id: 'obsidian', group: 'knowledge', mark: 'OB', icon: 'obsidian', name: 'Obsidian', sub: 'local markdown vault',
    pricing: 'freemium', url: 'https://obsidian.md/', x: 'https://x.com/obsdmd', github: 'https://github.com/obsidianmd',
    deepLink: 'none',
    purpose: 'Local-first markdown notebook. Pairs with MCP, Smart Connections, and the Copilot plugin to become an AI-readable second brain.',
    description: "Local-first Markdown notebook with a plugin ecosystem that makes it the most AI-amenable PKM tool available. The vault is plain `.md` files on disk — agents, scripts, and MCP servers can read and write it directly without an API. Smart Connections (community plugin) builds a vector index of your vault for semantic search; the Copilot plugin exposes Claude and GPT-4o chat with vault context. MCP server support (via community plugins) lets Claude Desktop query your notes in real time. Sync is optional (paid Obsidian Sync or free via git). Weak point: the plugin ecosystem is unmanaged — quality varies, and some AI plugins require API keys and careful configuration."
  },
  {
    id: 'logseq', group: 'knowledge', mark: 'LS', icon: 'logseq', name: 'Logseq', sub: 'outliner, local-first',
    pricing: 'free', url: 'https://logseq.com/', x: 'https://x.com/logseq', github: 'https://github.com/logseq/logseq',
    deepLink: 'none',
    purpose: 'Open-source outliner with bidirectional links. Plain text on disk; straightforward for agents and scripts to parse.',
    description: "Open-source, local-first outliner with bidirectional links. Every paragraph is a block with a unique address, and every block is plain text on disk — which makes the entire vault scriptable and agent-parseable without any special API. The query system lets you pull blocks matching tags or properties into dynamic views. An active plugin ecosystem adds AI integrations (Ollama, OpenAI) and tooling for Zettelkasten and daily note workflows. Weak point: a database version is in development that will change the file format; the plain-text model is the safer bet for agent-facing workflows right now. UI performance degrades on very large vaults."
  },
  {
    id: 'notion', group: 'knowledge', mark: 'NT', icon: 'notion', name: 'Notion', sub: 'collaborative docs',
    pricing: 'freemium', url: 'https://www.notion.so/', x: 'https://x.com/NotionHQ', github: 'https://github.com/makenotion',
    deepLink: 'none',
    purpose: 'Cloud doc workspace with an official MCP server. Best when your knowledge lives in a shared team wiki.',
    description: "The dominant cloud collaboration workspace for teams. The official Notion MCP server lets Claude and other MCP-compatible tools read and write Notion pages and databases via the API — useful when your knowledge base lives in a shared team wiki rather than a local vault. Notion AI is built into the editor for summarisation, drafting, and auto-filling database properties. The block-based page format handles rich content (tables, kanban boards, galleries) that plain Markdown can't. Weak point: the block format is harder for agents to traverse than flat Markdown; API rate limits surface quickly at scale; data lives in Notion's cloud, not locally."
  },
  {
    id: 'mem', group: 'knowledge', mark: 'ME', icon: '', name: 'Mem', sub: 'AI notes',
    pricing: 'freemium', url: 'https://mem.ai/', x: 'https://x.com/memdotai', github: '',
    deepLink: 'none',
    purpose: 'AI-native note-taking that auto-organises itself. Semantic search over your notes without manual tagging.',
    description: "AI-native note-taking that organises itself. Notes in Mem don't require folders or tags — the AI surfaces related notes automatically based on semantic similarity, and a chat interface lets you query your entire memory in plain language. Capture is frictionless: quick-add keyboard shortcuts, email forwarding, and mobile apps feed into a single stream. Best for personal knowledge capture where the goal is fast recall rather than structured curation. Weak point: closed-source and cloud-only — data residency is Mem's servers, not yours; not suitable if privacy or data sovereignty is a concern. Integration depth is limited compared to Obsidian."
  },

  // ---- Agents ----
  {
    id: 'langchain', group: 'agents', mark: 'LC', icon: 'langchain', name: 'LangChain', sub: 'framework',
    pricing: 'free', url: 'https://langchain.com/', x: 'https://x.com/LangChainAI', github: 'https://github.com/langchain-ai/langchain',
    deepLink: 'none',
    purpose: 'The dominant framework for LLM applications and agents. Large ecosystem of integrations, chains, and memory abstractions.',
    description: "The most widely adopted Python and JavaScript framework for building LLM applications. Provides abstractions for chains (sequential prompt pipelines), agents (tool-using loops), memory (conversation and long-term), and retrieval (vector store integrations). The ecosystem of integrations is the key asset: 100+ data loaders, vector stores, tool wrappers, and model providers are maintained by the community. LangSmith handles observability, tracing, and prompt versioning for production deployments. Weak point: the abstraction layers add indirection that makes debugging harder; for complex agentic flows, LangGraph (the graph-based sibling) is now preferred."
  },
  {
    id: 'langgraph', group: 'agents', mark: 'LG', icon: 'langgraph', name: 'LangGraph', sub: 'orchestration',
    pricing: 'free', url: 'https://langchain-ai.github.io/langgraph/', x: 'https://x.com/LangChainAI', github: 'https://github.com/langchain-ai/langgraph',
    deepLink: 'none',
    purpose: 'Graph-based agent orchestration from LangChain. Cleanly handles multi-step, branching, and cyclical agent flows.',
    description: "LangChain's graph-based orchestration layer for stateful, multi-step agents. Nodes are Python functions; edges define conditional transitions between them — including cycles (retry loops, reflection agents, self-critique patterns). Supports streaming, human-in-the-loop breakpoints, and persistent checkpointing across runs. The mental model maps directly to flowcharts, which makes complex agent behaviour easier to reason about and debug than a linear chain. LangGraph Cloud provides managed deployment and observability. The recommended path for production agents with branching logic, parallel tool calls, or long-horizon planning."
  },
  {
    id: 'crewai', group: 'agents', mark: 'CW', icon: 'crewai', name: 'CrewAI', sub: 'multi-agent',
    pricing: 'free', url: 'https://crewai.com/', x: 'https://x.com/crewAIInc', github: 'https://github.com/crewAIInc/crewAI',
    deepLink: 'none',
    purpose: 'Role-based multi-agent framework. Agents get roles, goals, and backstories; tasks are delegated within the crew automatically.',
    description: "A Python framework for multi-agent systems where each agent is given a role, goal, and backstory — a researcher, a writer, a critic, for example. Tasks are defined separately and assigned to agents; the crew's manager delegates and sequences them automatically. Works with any LLM via the LiteLLM adapter (Claude, GPT-4o, Gemini, open-source). The crew abstraction makes it intuitive to model real-world teams of specialists. CrewAI Enterprise adds a hosted UI and observability. Weak point: complex crews become difficult to debug when one agent silently produces bad output that compounds through subsequent agents; LangGraph offers more explicit control flow."
  },
  {
    id: 'autogpt', group: 'agents', mark: 'AG', icon: '', name: 'AutoGPT', sub: 'autonomous agent',
    pricing: 'free', url: 'https://agpt.co/', x: 'https://x.com/Auto_GPT', github: 'https://github.com/Significant-Gravitas/AutoGPT',
    deepLink: 'none',
    purpose: 'One of the original autonomous agent projects. Reference implementation of long-horizon planning; web and CLI versions.',
    description: "One of the first projects to demonstrate autonomous LLM agents looping through plan→act→observe cycles without human steering. Now a full platform with a no-code builder UI, a skill library, and both a web interface and CLI. More historically significant than production-ready — it popularised the ideas that spawned LangGraph, CrewAI, and every subsequent framework. Running AutoGPT once is the fastest way to build intuition for where autonomous agents get stuck. For production multi-agent systems, LangGraph or CrewAI offer more reliable orchestration. The GitHub repo is one of the most-starred AI projects and remains actively maintained."
  },
  {
    id: 'agentops', group: 'agents', mark: 'AO', icon: '', name: 'AgentOps', sub: 'observability',
    pricing: 'freemium', url: 'https://agentops.ai/', x: 'https://x.com/AgentOpsAI', github: 'https://github.com/AgentOps-AI/agentops',
    deepLink: 'none',
    purpose: 'Monitoring and observability for AI agents. Traces token usage, cost, latency, and step-by-step execution across runs.',
    description: "Observability and monitoring SDK for AI agents and LLM applications. Tracks every LLM call, tool invocation, token count, cost, and latency across a session; the dashboard shows per-session replays, cost breakdowns by model and agent, and anomaly detection. Drop-in integration with most major frameworks — LangChain, CrewAI, AutoGPT, and the OpenAI SDK — via a Python decorator or initialisation call. The free tier is generous enough for most side projects. Becomes essential once agents run in production and you need to diagnose unexpected failures, measure regression, or control spiralling API costs."
  },
  {
    id: 'composio', group: 'agents', mark: 'CM', icon: '', name: 'Composio', sub: 'tool integrations',
    pricing: 'freemium', url: 'https://composio.dev/', x: 'https://x.com/composiohq', github: 'https://github.com/ComposioHQ/composio',
    deepLink: 'none',
    purpose: 'Managed integrations layer for AI agents. 100+ tools (GitHub, Gmail, Slack) with auth, rate-limiting, and error handling built in.',
    description: "A managed tool integrations layer for AI agents. Abstracts away OAuth flows, credential storage, rate-limit handling, and error normalisation across 100+ external services — GitHub, Gmail, Slack, Linear, Notion, HubSpot, and more. Each integration exposes typed function schemas that plug directly into LangChain, CrewAI, or the OpenAI function-calling interface with no custom wiring. The alternative to Composio is implementing each integration yourself, which is weeks of work and ongoing maintenance. Weak point: you're delegating access-token storage to Composio — evaluate the security posture carefully before connecting production credentials to sensitive services."
  }

];
