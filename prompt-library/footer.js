// footer.js — shared site footer.
// Pages declare:
//   <div id="site-footer">
//     <!-- optional extra links appended after 'contribute a prompt' -->
//   </div>
// Link order and CTAs are canonical; drift here is not allowed.
(function () {
  "use strict";
  var mount = document.getElementById("site-footer");
  if (!mount) return;

  var extras = mount.innerHTML || "";

  var html =
    '<footer class="site-footer">' +
      '<div class="inner">' +
        '<div>&gt; built for people shipping with AI</div>' +
        '<div style="display:flex; gap:14px; align-items:center; flex-wrap:wrap;">' +
          '<a href="index.html">library</a>' +
          '<a href="learn.html">methodology</a>' +
          '<a href="collections.html">collections</a>' +
          '<a href="tools.html">tools</a>' +
          '<a href="agents.html">agents</a>' +
          '<a href="playground.html">playground</a>' +
          '<a href="about.html">about</a>' +
          '<a href="privacy.html">privacy</a>' +
          '<span style="color:var(--border-2);">|</span>' +
          '<a href="https://github.com/SarutobiSasuke8/Prompt-Library" target="_blank" rel="noopener">github</a>' +
          '<a class="cta social-x" href="#" target="_blank" rel="noopener" aria-label="Follow on X">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="vertical-align:-2px; margin-right:6px;"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' +
            'follow on X' +
          '</a>' +
          '<a class="cta" href="https://github.com/SarutobiSasuke8/Prompt-Library/blob/main/prompt-library/CONTRIBUTING.md" target="_blank" rel="noopener">contribute a prompt</a>' +
          extras +
        '</div>' +
      '</div>' +
      '<div class="footer-copy">&copy; 2025 prompt-library &middot; MIT license</div>' +
    '</footer>';

  mount.outerHTML = html;
})();
