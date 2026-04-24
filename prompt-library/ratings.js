// ratings.js — shared rating + comments UI for item detail pages.
//
// v1: localStorage-only (per-browser). A backend wire-up is in ROADMAP.md.
//
// Usage — insert this markup at the point you want the sections to render:
//   <div class="section-divider"><span>rating</span><hr /></div>
//   <div class="rating-widget">
//     <div class="rating-stars" id="rating-stars" role="group" aria-label="Rate"></div>
//     <span class="rating-count" id="rating-count">not yet rated</span>
//   </div>
//   <div class="section-divider"><span>comments</span><hr /></div>
//   <div class="comments-section">
//     <div class="comment-list" id="comment-list">
//       <div class="comments-empty" id="comments-empty">No comments yet. Be the first.</div>
//     </div>
//     <div class="comment-input-row">
//       <input class="comment-input" id="comment-input" type="text" placeholder="Leave a note…" maxlength="280" />
//       <button class="comment-submit" id="comment-submit" type="button">post</button>
//     </div>
//   </div>
//
// Then call: PL_RATINGS.mount({ type: "prompt", id: 123 });
// type must match the item taxonomy in CLAUDE.md: prompt | article | tool | agent | doc

(function () {
  "use strict";

  const LABELS = ["", "1 star", "2 stars", "3 stars", "4 stars", "5 stars"];

  function mountRating(type, id) {
    const starsEl = document.getElementById("rating-stars");
    const countEl = document.getElementById("rating-count");
    if (!starsEl || !countEl) return;
    const key = "pl_rating_" + type + "_" + id;
    let current = parseInt(localStorage.getItem(key) || "0", 10);

    for (let i = 1; i <= 5; i++) {
      (function (val) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "rating-star" + (val <= current ? " lit" : "");
        btn.setAttribute("aria-label", val + " star");
        btn.textContent = "★";
        btn.addEventListener("mouseenter", () => highlight(val));
        btn.addEventListener("mouseleave", () => highlight(current));
        btn.addEventListener("click", () => {
          current = val;
          try { localStorage.setItem(key, String(val)); } catch (_) {}
          highlight(val);
          countEl.textContent = LABELS[val];
        });
        starsEl.appendChild(btn);
      })(i);
    }

    function highlight(val) {
      starsEl.querySelectorAll(".rating-star").forEach((s, idx) => {
        s.classList.toggle("lit", idx < val);
      });
    }
    countEl.textContent = current ? LABELS[current] : "not yet rated";
  }

  function mountComments(type, id) {
    const listEl   = document.getElementById("comment-list");
    const emptyEl  = document.getElementById("comments-empty");
    const inputEl  = document.getElementById("comment-input");
    const submitEl = document.getElementById("comment-submit");
    if (!listEl || !inputEl || !submitEl) return;
    const key = "pl_comments_" + type + "_" + id;
    let comments = [];
    try { comments = JSON.parse(localStorage.getItem(key) || "[]"); } catch (_) {}

    function refresh() {
      if (emptyEl) emptyEl.style.display = comments.length ? "none" : "block";
    }

    function buildComment(c) {
      const el = document.createElement("div");
      el.className = "comment-item";
      const meta = document.createElement("div");
      meta.className = "comment-meta";
      meta.textContent = new Date(c.ts).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
      const body = document.createElement("div");
      body.className = "comment-body";
      body.textContent = c.text;
      el.appendChild(meta); el.appendChild(body);
      return el;
    }

    comments.forEach((c) => emptyEl ? listEl.insertBefore(buildComment(c), emptyEl) : listEl.appendChild(buildComment(c)));
    refresh();

    function post() {
      const text = inputEl.value.trim();
      if (!text) return;
      const c = { text, ts: Date.now() };
      comments.push(c);
      try { localStorage.setItem(key, JSON.stringify(comments)); } catch (_) {}
      if (emptyEl) listEl.insertBefore(buildComment(c), emptyEl);
      else listEl.appendChild(buildComment(c));
      inputEl.value = "";
      refresh();
    }

    submitEl.addEventListener("click", post);
    inputEl.addEventListener("keydown", (e) => { if (e.key === "Enter") post(); });
  }

  window.PL_RATINGS = {
    mount: function (opts) {
      if (!opts || !opts.type || opts.id == null) return;
      mountRating(opts.type, opts.id);
      mountComments(opts.type, opts.id);
    }
  };
})();
