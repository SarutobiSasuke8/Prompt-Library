// theme.js — wires the theme toggle button on every page.
// The anti-flash init script in each page's <head> has already set
// data-theme on <html> before this runs.
(function () {
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
