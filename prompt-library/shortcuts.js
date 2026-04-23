// shortcuts.js — universal cheatsheet overlay.
// Triggered by `?` (shift-/). Press `Esc` or click backdrop to dismiss.
// Do not add shortcuts that conflict with native browser behaviour.
(function () {
  "use strict";

  // Per-page hint: set window.PL_SHORTCUTS before this script loads to
  // extend or override the defaults. Entries are [keys, description].
  var defaults = [
    ["?",        "Open this cheatsheet"],
    ["/",        "Focus the search input"],
    ["Esc",      "Close modal / overlay"],
    ["Enter",    "Open a focused prompt card"],
    ["t",        "Toggle light / dark theme"]
  ];
  var pageExtras = (window.PL_SHORTCUTS && Array.isArray(window.PL_SHORTCUTS)) ? window.PL_SHORTCUTS : [];

  var backdrop = document.createElement("div");
  backdrop.setAttribute("aria-hidden", "true");
  backdrop.style.cssText =
    "position:fixed; inset:0; background:var(--overlay, rgba(0,0,0,0.78));" +
    "display:none; align-items:center; justify-content:center; z-index:100; padding:20px;" +
    "backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px);";

  var panel = document.createElement("div");
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");
  panel.setAttribute("aria-label", "Keyboard shortcuts");
  panel.style.cssText =
    "background:var(--bg-1); border:1px solid var(--border-2); border-radius:var(--radius, 2px);" +
    "max-width:480px; width:100%; max-height:80vh; overflow:auto; padding:24px;" +
    "font-family:var(--sans); color:var(--text);";

  function rowHtml(keys, desc) {
    var parts = keys.split(/\s*\+\s*/);
    var kbd = parts.map(function (k) {
      return '<kbd style="font-family:var(--mono); font-size:11px; background:var(--bg-2);' +
             'border:1px solid var(--border-2); border-radius:2px; padding:2px 8px; color:var(--text);' +
             'margin-right:4px;">' + escape(k) + '</kbd>';
    }).join('<span style="color:var(--text-faint); margin:0 2px;">+</span>');
    return '<div style="display:flex; justify-content:space-between; align-items:center;' +
           'gap:16px; padding:8px 0; border-bottom:1px dashed var(--border);">' +
             '<span>' + kbd + '</span>' +
             '<span style="font-size:13px; color:var(--text-dim);">' + escape(desc) + '</span>' +
           '</div>';
  }

  function escape(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function renderPanel() {
    var all = defaults.concat(pageExtras);
    panel.innerHTML =
      '<div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:14px;">' +
        '<h2 style="font-family:var(--mono); font-size:16px; font-weight:600; color:var(--text); margin:0;">Keyboard shortcuts</h2>' +
        '<span style="font-family:var(--mono); font-size:11px; color:var(--text-faint);">press Esc to close</span>' +
      '</div>' +
      all.map(function (r) { return rowHtml(r[0], r[1]); }).join("");
  }

  function open() {
    renderPanel();
    backdrop.style.display = "flex";
  }
  function close() { backdrop.style.display = "none"; }
  function isOpen() { return backdrop.style.display === "flex"; }

  backdrop.appendChild(panel);
  document.addEventListener("DOMContentLoaded", function () {
    document.body.appendChild(backdrop);
  });
  backdrop.addEventListener("click", function (e) { if (e.target === backdrop) close(); });

  document.addEventListener("keydown", function (e) {
    // Don't trigger while typing in a field.
    var t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    if (e.key === "?" && !e.ctrlKey && !e.metaKey) { e.preventDefault(); isOpen() ? close() : open(); }
    else if (e.key === "Escape" && isOpen()) { close(); }
    else if (e.key === "t" && !e.ctrlKey && !e.metaKey && !e.altKey) {
      // Theme toggle shortcut — click the page's toggle button if present.
      var btn = document.getElementById("theme-toggle");
      if (btn) btn.click();
    }
  });
})();
