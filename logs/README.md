# logs/

Session reports and development logs for this workspace.

## Structure

```
logs/
└── sessions/        # Per-session markdown reports (Obsidian-compatible YAML frontmatter)
    └── YYYY-MM-DD-<description>.md
```

## Format

Each session report includes:
- YAML frontmatter with Obsidian `[[wiki links]]`, AI model info, commit SHAs, dates, related docs
- Commit-by-commit narrative of what was built
- Key decisions and rationale
- State-of-play table
- Next session starting point
