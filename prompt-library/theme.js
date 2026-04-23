// theme.js — wires the theme toggle button on every page and injects
// the shared favicon (inline SVG — a green `>` caret matching the logo).
// The anti-flash init script in each page's <head> has already set
// data-theme on <html> before this runs.
(function () {
  // ---- favicon (inline SVG data URI) ----
  // Runs first so the tab icon updates even on pages without a toggle btn.
  if (!document.querySelector('link[rel="icon"]')) {
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' +
        '<rect width="32" height="32" fill="#0a0a0a"/>' +
        '<text x="7" y="24" font-family="JetBrains Mono, ui-monospace, monospace" font-size="22" font-weight="700" fill="#00ff88">&gt;</text>' +
      '</svg>';
    var link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    document.head.appendChild(link);
  }

  var btn = document.getElementById("theme-toggle");
  if (!btn) return;

  function current() {
    return document.documentElement.getAttribute("data-theme") || "dark";
  }

  function syncIcon() {
    // dark mode button shows sun (click → go light)
    // light mode button shows moon (click → go dark)
    btn.textContent = current() === "dark" ? "☀" : "☽";
    btn.title = current() === "dark" ? "Switch to light mode" : "Switch to dark mode";
    btn.setAttribute("aria-label", btn.title);
  }

  btn.addEventListener("click", function () {
    var next = current() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("pl_theme", next);
    syncIcon();
  });

  syncIcon();
})();
