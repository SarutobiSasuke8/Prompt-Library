// blocks.js — shared body-block renderer for long-form content.
// Used by article.html (articles.js) and post.html (posts.js) so the two
// stay byte-identical in how they render. Extracted from article.html;
// behaviour is deliberately unchanged.
//
// Exposes window.PL_BLOCKS.{render, wireCopyButtons, escapeHtml}
//
// Block types:
//   { type: "p",       text }                  paragraph
//   { type: "h3",      text }                  subheading
//   { type: "example", label, text }           copyable code/prompt block
//   { type: "callout", text }                  highlighted tip
//   { type: "list",    items: [] }             bulleted list
//   { type: "reference", title, url, linkLabel }  source citation
//
// Requires the long-form styles in style.css (.article-body, .example-block,
// .callout, .reference-block).
(function () {
  "use strict";

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function render(blocks) {
    return (blocks || []).map(function (b) {
      if (!b) return "";

      if (b.type === "p") {
        return "<p>" + escapeHtml(b.text) + "</p>";
      }
      if (b.type === "h3") {
        return "<h3>" + escapeHtml(b.text) + "</h3>";
      }
      if (b.type === "example") {
        return '<div class="example-block">' +
          '<div class="example-label">' + escapeHtml(b.label || "example") + "</div>" +
          '<button class="ex-copy" type="button">copy</button>' +
          "<pre>" + escapeHtml(b.text) + "</pre>" +
          "</div>";
      }
      if (b.type === "callout") {
        return '<div class="callout">' + escapeHtml(b.text) + "</div>";
      }
      if (b.type === "reference") {
        // linkLabel defaults to the original article wording so existing
        // articles render exactly as before; posts can override it.
        var label = b.linkLabel || "view on Amazon";
        return '<div class="reference-block">' +
          '<div class="ref-icon">&#9646;</div>' +
          '<div class="ref-body">' +
            '<div class="ref-label">source</div>' +
            '<div class="ref-title">' + escapeHtml(b.title) + "</div>" +
            (b.url
              ? '<a class="ref-link" href="' + escapeHtml(b.url) + '" target="_blank" rel="noopener">' +
                  escapeHtml(label) + " &rarr;</a>"
              : "") +
          "</div>" +
        "</div>";
      }
      if (b.type === "list") {
        var items = (b.items || []).map(function (i) {
          return "<li>" + escapeHtml(i) + "</li>";
        }).join("");
        return "<ul>" + items + "</ul>";
      }
      return "";
    }).join("");
  }

  function copyToClipboard(text) {
    try {
      return navigator.clipboard.writeText(text);
    } catch (_) {
      return Promise.reject(_);
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    document.execCommand("copy"); document.body.removeChild(ta);
  }

  // Binds the copy button on every .example-block inside `root`.
  // Safe to call once after injecting rendered HTML.
  function wireCopyButtons(root) {
    if (!root) return;
    root.querySelectorAll(".example-block").forEach(function (block) {
      var btn = block.querySelector(".ex-copy");
      var pre = block.querySelector("pre");
      if (!btn || !pre) return;
      btn.addEventListener("click", function () {
        var text = pre.textContent;
        var done = function () {
          btn.textContent = "copied";
          btn.classList.add("copied");
          setTimeout(function () {
            btn.textContent = "copy";
            btn.classList.remove("copied");
          }, 1500);
        };
        copyToClipboard(text).then(done, function () { fallbackCopy(text); done(); });
      });
    });
  }

  window.PL_BLOCKS = {
    render: render,
    wireCopyButtons: wireCopyButtons,
    escapeHtml: escapeHtml
  };
})();
