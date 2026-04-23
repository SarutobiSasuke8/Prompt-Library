// nav.js — shared site header with responsive mobile nav.
// Pages declare:
//   <div id="site-nav" data-active="library" data-sub="curated">
//     <!-- optional pill markup injected into the header right slot -->
//   </div>
// The mount div's attributes drive the highlight + logo subtitle; its
// innerHTML is reused verbatim as the pill slot between the nav and the
// theme toggle. Adding a new top-level page = one line in LINKS.
(function () {
  "use strict";
  var mount = document.getElementById("site-nav");
  if (!mount) return;

  var active = mount.getAttribute("data-active") || "";
  var sub    = mount.getAttribute("data-sub")    || "curated";
  var slot   = mount.innerHTML.trim();

  var LINKS = [
    { key: "library",     href: "index.html",       label: "library" },
    { key: "methodology", href: "learn.html",       label: "methodology" },
    { key: "collections", href: "collections.html", label: "collections" },
    { key: "tools",       href: "tools.html",       label: "tools" },
    { key: "agents",      href: "agents.html",      label: "agents" },
    { key: "playground",  href: "playground.html",  label: "playground" },
    { key: "about",       href: "about.html",       label: "about" }
  ];

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/"/g, "&quot;")
      .replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Desktop nav links
  var desktopNav = LINKS.map(function (l) {
    var color = (l.key === active) ? "var(--accent)" : "var(--text-dim)";
    return '<a href="' + esc(l.href) + '" style="color:' + color + '; text-decoration:none;">' + l.label + '</a>';
  }).join("");

  var html =
    '<header class="site-header" id="site-header">' +
      '<div class="inner">' +
        '<a class="logo" href="index.html" style="text-decoration:none; color:inherit;">' +
          '<span class="caret">&gt;</span>prompt-library ' +
          '<span class="tilde">~</span> ' +
          '<span class="sub" id="nav-sub">' + esc(sub) + '</span>' +
        '</a>' +
        '<nav style="display:flex; align-items:center; gap:18px; font-family:var(--mono); font-size:12px;">' +
          desktopNav +
        '</nav>' +
        (slot ? slot : "") +
        '<button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">\u2600</button>' +
        '<a href="user.html?handle=SarutobiSasuke" class="avatar-chip" aria-label="Your profile">' +
          '<span class="av-circle">S</span>' +
          '<span class="av-handle">SarutobiSasuke</span>' +
        '</a>' +
        '<button class="nav-burger" id="nav-burger" aria-label="Open menu" aria-expanded="false">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
      '</div>' +
    '</header>';

  mount.outerHTML = html;

  // Build mobile drawer and append to body
  var drawerLinks = LINKS.map(function (l) {
    var cls = (l.key === active) ? ' class="active"' : '';
    return '<a href="' + esc(l.href) + '"' + cls + '>' + l.label + '</a>';
  }).join("");

  var drawer = document.createElement("div");
  drawer.id = "nav-drawer";
  drawer.className = "nav-drawer";
  drawer.innerHTML = drawerLinks;
  document.body.appendChild(drawer);

  // Wire burger toggle
  var burger = document.getElementById("nav-burger");
  function open()  { drawer.classList.add("open");  burger.classList.add("open");  burger.setAttribute("aria-expanded", "true"); }
  function close() { drawer.classList.remove("open"); burger.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
  function toggle() { drawer.classList.contains("open") ? close() : open(); }

  burger.addEventListener("click", function (e) { e.stopPropagation(); toggle(); });

  // Close on outside click
  document.addEventListener("click", function (e) {
    if (drawer.classList.contains("open") && !drawer.contains(e.target)) close();
  });

  // Close on Esc
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });

  // Close when a drawer link is clicked
  drawer.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", close);
  });
})();
