# Prompt Library

A curated library of production-ready system prompts for building with AI.
This repository also contains Teneo CLI tooling and workspace configuration.

## Contents

### 🟢 [`prompt-library/`](./prompt-library/) — active project

A static, dark-themed, mobile-first web app serving a curated library of
production-ready system prompts for people building with AI. No frameworks,
no npm, no build step — three files and a browser tab.

- **Live site:** https://sarutobisasuke8.github.io/testing/ *(active once Pages is enabled)*
- **Docs:** [`prompt-library/README.md`](./prompt-library/README.md)
- **Dev context:** [`prompt-library/CLAUDE.md`](./prompt-library/CLAUDE.md)
- **Contributing:** [`prompt-library/CONTRIBUTING.md`](./prompt-library/CONTRIBUTING.md)
- **Roadmap:** [`prompt-library/ROADMAP.md`](./prompt-library/ROADMAP.md)

### ⚙️ Teneo CLI tooling

`.agents/`, `.claude/`, and `skills-lock.json` are Teneo Protocol agent
skills and CLI integrations installed into this workspace. Not part of the
prompt-library product.

## Branches

- `main` — deploy target. The Pages workflow ships `prompt-library/` on
  every push.
- `claude/prompt-library-app-LQzGJ` — current working branch for the web
  app.

## Get started

```bash
git clone https://github.com/sarutobisasuke8/testing.git
cd testing/prompt-library
# Open index.html in your browser.
```

Full project docs live inside [`prompt-library/`](./prompt-library/).
