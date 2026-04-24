// nav.js — shared site header with responsive mobile nav + explore dropdown.
// Pages declare:
//   <div id="site-nav" data-active="library" data-sub="curated">
//     <!-- optional pill markup placed between nav and theme toggle -->
//   </div>
// Adding a top-level page = one line in LINKS. Adding a dropdown item = one
// line inside the dropdown's items array.
(function () {
  "use strict";
  var mount = document.getElementById("site-nav");
  if (!mount) return;

  var active = mount.getAttribute("data-active") || "";
  var sub    = mount.getAttribute("data-sub")    || "curated";
  var slot   = mount.innerHTML.trim();

  // LINKS drives both the desktop nav and the mobile drawer.
  // Entries with dropdown:true render as an "explore ▾" flyout.
  var LINKS = [
    { key: "library", href: "index.html", label: "library" },
    { key: "docs",    href: "mdrepo.html",  label: "md repo" },
    { key: "tools",   href: "tools.html", label: "tools" },
    {
      key: "explore", label: "explore", dropdown: true,
      items: [
        { key: "agents",      href: "agents.html",      label: "agents" },
        { key: "collections", href: "collections.html", label: "collections" },
        { key: "playground",  href: "playground.html",  label: "playground" },
        { key: "methodology", href: "learn.html",        label: "articles" }
      ]
    },
    { key: "about", href: "about.html", label: "about" }
  ];

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/"/g, "&quot;")
      .replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ---- Desktop nav ----
  var desktopNav = LINKS.map(function (l) {
    if (l.dropdown) {
      var isChildActive = l.items.some(function (i) { return i.key === active; });
      var items = l.items.map(function (i) {
        var cls = "nav-dd-item" + (i.key === active ? " current" : "");
        return '<a href="' + esc(i.href) + '" class="' + cls + '">' + esc(i.label) + '</a>';
      }).join("");
      return (
        '<div class="nav-dropdown">' +
          '<button class="nav-dd-btn' + (isChildActive ? " child-active" : "") + '" ' +
                  'aria-haspopup="true" aria-expanded="false">' +
            esc(l.label) + '<span class="nav-dd-caret">&#9660;</span>' +
          '</button>' +
          '<div class="nav-dd-menu" role="menu">' + items + '</div>' +
        '</div>'
      );
    }
    var color = (l.key === active) ? "var(--accent)" : "var(--text-dim)";
    return '<a href="' + esc(l.href) + '" style="color:' + color + '; text-decoration:none;">' +
             esc(l.label) +
           '</a>';
  }).join("");

  // ---- Inject header HTML ----
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
        '<button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">&#9728;</button>' +
        '<a href="user.html" class="avatar-chip" id="av-chip" aria-label="Sign in">' +
          '<span class="av-circle" id="av-circle">?</span>' +
          '<span class="av-handle" id="av-handle-text">sign in</span>' +
        '</a>' +
        '<button class="nav-burger" id="nav-burger" aria-label="Open menu" aria-expanded="false">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
      '</div>' +
    '</header>';

  mount.outerHTML = html;

  // ---- Mobile drawer ----
  var drawerHTML = "";
  LINKS.forEach(function (l) {
    if (l.dropdown) {
      drawerHTML += '<div class="drawer-group-label">' + esc(l.label) + '</div>';
      l.items.forEach(function (i) {
        var cls = (i.key === active) ? ' class="active"' : "";
        drawerHTML += '<a href="' + esc(i.href) + '"' + cls +
                      ' style="padding-left:24px;">' + esc(i.label) + '</a>';
      });
    } else {
      var cls = (l.key === active) ? ' class="active"' : "";
      drawerHTML += '<a href="' + esc(l.href) + '"' + cls + '>' + esc(l.label) + '</a>';
    }
  });

  var drawer = document.createElement("div");
  drawer.id        = "nav-drawer";
  drawer.className = "nav-drawer";
  drawer.innerHTML = drawerHTML;
  document.body.appendChild(drawer);

  // ---- Burger toggle ----
  var burger = document.getElementById("nav-burger");
  function openDrawer()  { drawer.classList.add("open");    burger.classList.add("open");    burger.setAttribute("aria-expanded", "true"); }
  function closeDrawer() { drawer.classList.remove("open"); burger.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
  function toggleDrawer() { drawer.classList.contains("open") ? closeDrawer() : openDrawer(); }

  burger.addEventListener("click", function (e) { e.stopPropagation(); toggleDrawer(); });
  document.addEventListener("click", function (e) {
    if (drawer.classList.contains("open") && !drawer.contains(e.target)) closeDrawer();
  });
  drawer.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeDrawer); });

  // ---- Desktop dropdown ----
  var ddWrap = document.querySelector(".nav-dropdown");
  var ddBtn  = ddWrap ? ddWrap.querySelector(".nav-dd-btn") : null;

  function closeDropdown() {
    if (ddWrap) ddWrap.classList.remove("open");
    if (ddBtn)  ddBtn.setAttribute("aria-expanded", "false");
  }

  if (ddBtn) {
    ddBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = ddWrap.classList.toggle("open");
      ddBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    document.addEventListener("click", closeDropdown);
  }

  // ---- Shared Escape handler ----
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeDrawer(); closeDropdown(); }
  });
})();
