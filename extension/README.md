# prompt-library extension — v0

Insert saved prompts and markdown snippets into any LLM text field.
Zero backend, zero auth, local-only items synced via `chrome.storage.sync`.

## What v0 does

- **Popup** — add, edit, delete, search items. Each item is `{ title, body, tags }`.
- **Slash trigger** — type `//` in any `<textarea>`, text `<input>`, or
  `[contenteditable]` field to open a picker with fuzzy search.
- **Keyboard shortcut** — `Ctrl+Shift+P` (macOS: `⌘+Shift+P`) opens the
  same picker in the currently-focused text field.
- **Insert** — Enter or click a row to insert the full body. Markdown is
  preserved as-is (LLMs read it fine).
- **Options page** — JSON export / import for backup and cross-browser move.

Tested targets: ChatGPT, claude.ai, Gemini, generic `<textarea>`.
React-controlled inputs are handled via the native value setter +
`input` event dispatch.

## Install (load unpacked)

1. Open `chrome://extensions`.
2. Toggle **Developer mode** (top right).
3. Click **Load unpacked** and pick this `extension/` folder.
4. The extension icon appears in the toolbar; pin it for easy access.

## File layout

```
extension/
├── manifest.json       # MV3 config
├── background.js       # service worker (command dispatch)
├── content.js          # slash trigger + picker overlay + insert logic
├── overlay.css         # picker overlay styles
├── popup.html / .js    # item manager shown on toolbar click
├── options.html / .js  # JSON import/export
├── storage.js          # shared helpers over chrome.storage.sync
└── README.md           # this file
```

## Known v0 limitations

- No icons yet — Chrome shows a generic puzzle-piece.
- No library sync. Use the popup to add items manually; v0.5 will import
  from the prompt-library site's JSON dump.
- Does not run on `chrome://` pages, the Chrome Web Store, or some
  hardened sites that strip content scripts (by design).
- `chrome.storage.sync` has a 100KB total cap and 8KB per-item cap. For
  long prompts, keep item bodies under ~6KB or switch to `storage.local`
  (future option).

## Roadmap

See repo `ROADMAP.md` → **Browser extension** for v0.5 / v1 / v1.5 scope.
