// Content script: slash trigger (//) + keyboard shortcut + insert-from-popup.
// Target any <textarea>, <input type=text>, or [contenteditable] that has focus.

const TRIGGER = "//";
let overlay = null;
let overlayList = null;
let overlayInput = null;
let lastTarget = null;
let triggerAnchor = null; // { node, offset } where // was typed

function isEditable(el) {
  if (!el) return false;
  if (el.tagName === "TEXTAREA") return true;
  if (el.tagName === "INPUT") {
    const t = (el.type || "").toLowerCase();
    return ["text", "search", "url", "email", ""].includes(t);
  }
  if (el.isContentEditable) return true;
  return false;
}

function getItems() {
  return new Promise((resolve) => {
    chrome.storage.sync.get("items", (o) => resolve(Array.isArray(o.items) ? o.items : []));
  });
}

function searchItems(items, q) {
  const s = (q || "").trim().toLowerCase();
  if (!s) return items;
  return items.filter((it) => {
    const hay = (it.title + " " + it.body + " " + (it.tags || []).join(" ")).toLowerCase();
    return hay.includes(s);
  });
}

function buildOverlay() {
  overlay = document.createElement("div");
  overlay.id = "pl-overlay";
  overlay.innerHTML = `
    <div class="pl-box">
      <input class="pl-input" type="text" placeholder="search prompts…" />
      <div class="pl-list"></div>
      <div class="pl-hint">enter insert · esc close</div>
    </div>
  `;
  document.documentElement.appendChild(overlay);
  overlayInput = overlay.querySelector(".pl-input");
  overlayList = overlay.querySelector(".pl-list");
  overlayInput.addEventListener("input", () => renderList());
  overlayInput.addEventListener("keydown", onInputKeydown);
  overlay.addEventListener("mousedown", (e) => {
    if (e.target === overlay) closeOverlay();
  });
}

let filtered = [];
let selected = 0;

async function renderList() {
  const items = await getItems();
  filtered = searchItems(items, overlayInput.value);
  selected = 0;
  overlayList.innerHTML = "";
  if (!filtered.length) {
    const e = document.createElement("div");
    e.className = "pl-empty";
    e.textContent = items.length ? "no match" : "no items — open the extension popup to add some";
    overlayList.appendChild(e);
    return;
  }
  filtered.forEach((it, i) => {
    const row = document.createElement("div");
    row.className = "pl-row" + (i === selected ? " pl-sel" : "");
    row.innerHTML = `<div class="pl-t"></div><div class="pl-b"></div>`;
    row.querySelector(".pl-t").textContent = it.title || "(untitled)";
    row.querySelector(".pl-b").textContent = (it.body || "").slice(0, 90);
    row.addEventListener("mouseenter", () => {
      selected = i;
      highlight();
    });
    row.addEventListener("mousedown", (e) => {
      e.preventDefault();
      pickCurrent();
    });
    overlayList.appendChild(row);
  });
}

function highlight() {
  [...overlayList.children].forEach((c, i) => c.classList.toggle("pl-sel", i === selected));
  const el = overlayList.children[selected];
  if (el && el.scrollIntoView) el.scrollIntoView({ block: "nearest" });
}

function onInputKeydown(e) {
  if (e.key === "Escape") {
    e.preventDefault();
    closeOverlay();
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (filtered.length) { selected = (selected + 1) % filtered.length; highlight(); }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (filtered.length) { selected = (selected - 1 + filtered.length) % filtered.length; highlight(); }
  } else if (e.key === "Enter") {
    e.preventDefault();
    pickCurrent();
  }
}

function pickCurrent() {
  const it = filtered[selected];
  if (!it) return;
  closeOverlay();
  if (triggerAnchor) removeTriggerSlashes();
  insertText(lastTarget, it.body || "");
}

function openOverlay() {
  if (!overlay) buildOverlay();
  overlay.classList.add("pl-visible");
  overlayInput.value = "";
  renderList();
  overlayInput.focus();
}

function closeOverlay() {
  if (!overlay) return;
  overlay.classList.remove("pl-visible");
  triggerAnchor = null;
  if (lastTarget && typeof lastTarget.focus === "function") {
    try { lastTarget.focus(); } catch {}
  }
}

// Text insertion that works for textarea/input and contenteditable (incl. React).
function insertText(el, text) {
  if (!el) {
    navigator.clipboard.writeText(text).catch(() => {});
    return;
  }
  el.focus();
  if (el.tagName === "TEXTAREA" || el.tagName === "INPUT") {
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    const proto = el.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
    const next = el.value.slice(0, start) + text + el.value.slice(end);
    if (setter) setter.call(el, next); else el.value = next;
    const caret = start + text.length;
    try { el.setSelectionRange(caret, caret); } catch {}
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  } else if (el.isContentEditable) {
    const ok = document.execCommand && document.execCommand("insertText", false, text);
    if (!ok) {
      const sel = window.getSelection();
      if (sel && sel.rangeCount) {
        const range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(text));
        range.collapse(false);
      }
      el.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: text }));
    }
  }
}

function removeTriggerSlashes() {
  const el = lastTarget;
  if (!el) return;
  if (el.tagName === "TEXTAREA" || el.tagName === "INPUT") {
    const caret = el.selectionStart ?? 0;
    if (caret >= 2 && el.value.slice(caret - 2, caret) === TRIGGER) {
      const proto = el.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
      const next = el.value.slice(0, caret - 2) + el.value.slice(caret);
      if (setter) setter.call(el, next); else el.value = next;
      try { el.setSelectionRange(caret - 2, caret - 2); } catch {}
      el.dispatchEvent(new Event("input", { bubbles: true }));
    }
  } else if (el.isContentEditable) {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    const r = sel.getRangeAt(0);
    try {
      r.setStart(r.startContainer, Math.max(0, r.startOffset - 2));
      r.deleteContents();
      el.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "deleteContentBackward" }));
    } catch {}
  }
}

// Watch for typed "//" in editable fields.
document.addEventListener("keyup", (e) => {
  const el = e.target;
  if (!isEditable(el)) return;
  let ctx = "";
  if (el.tagName === "TEXTAREA" || el.tagName === "INPUT") {
    const caret = el.selectionStart ?? 0;
    ctx = el.value.slice(Math.max(0, caret - 2), caret);
  } else if (el.isContentEditable) {
    const sel = window.getSelection();
    if (sel && sel.rangeCount) {
      const r = sel.getRangeAt(0);
      const n = r.startContainer;
      if (n && n.nodeType === Node.TEXT_NODE) {
        ctx = (n.textContent || "").slice(Math.max(0, r.startOffset - 2), r.startOffset);
      }
    }
  }
  if (ctx === TRIGGER) {
    lastTarget = el;
    triggerAnchor = { node: el };
    openOverlay();
  }
}, true);

// Track last focused editable for the keyboard shortcut.
document.addEventListener("focusin", (e) => {
  if (isEditable(e.target)) lastTarget = e.target;
}, true);

// Messages from popup ("insert") and background (command dispatch).
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg?.type === "insert") {
    const el = lastTarget || document.activeElement;
    if (isEditable(el)) insertText(el, msg.body || "");
    else navigator.clipboard.writeText(msg.body || "").catch(() => {});
    sendResponse({ ok: true });
  } else if (msg?.type === "open-picker") {
    const el = document.activeElement;
    if (isEditable(el)) lastTarget = el;
    if (!lastTarget) {
      sendResponse({ ok: false, reason: "no-editable" });
      return;
    }
    openOverlay();
    sendResponse({ ok: true });
  }
  return true;
});
