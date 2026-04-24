const $list = document.getElementById("list");
const $q = document.getElementById("q");
const $new = document.getElementById("new");
const $editor = document.getElementById("editor");
const $eTitle = document.getElementById("e-title");
const $eBody = document.getElementById("e-body");
const $eTags = document.getElementById("e-tags");
const $eCancel = document.getElementById("e-cancel");
const $eSave = document.getElementById("e-save");
const $openOptions = document.getElementById("open-options");

let editingId = null;
let allItems = [];

function renderItem(it) {
  const row = document.createElement("div");
  row.className = "item";
  row.innerHTML = `
    <div class="t"></div>
    <div class="b"></div>
    <div class="actions">
      <button data-act="insert">insert</button>
      <button data-act="copy">copy</button>
      <button data-act="edit">edit</button>
      <button data-act="del">delete</button>
    </div>
  `;
  row.querySelector(".t").textContent = it.title || "(untitled)";
  row.querySelector(".b").textContent = (it.body || "").slice(0, 120);
  row.addEventListener("click", async (e) => {
    const act = e.target.closest("[data-act]")?.dataset?.act;
    if (!act) return;
    e.stopPropagation();
    if (act === "insert") await insertIntoActiveTab(it);
    if (act === "copy") {
      await navigator.clipboard.writeText(it.body || "");
      window.close();
    }
    if (act === "edit") openEditor(it);
    if (act === "del") {
      if (confirm("Delete " + (it.title || "this item") + "?")) {
        await PLStorage.deleteItem(it.id);
        await refresh();
      }
    }
  });
  return row;
}

async function refresh() {
  allItems = await PLStorage.getItems();
  render();
}

function render() {
  const filtered = PLStorage.searchItems(allItems, $q.value);
  $list.innerHTML = "";
  if (!filtered.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = allItems.length
      ? "no items match."
      : "no items yet. click + new to add one.";
    $list.appendChild(empty);
    return;
  }
  filtered.forEach((it) => $list.appendChild(renderItem(it)));
}

async function insertIntoActiveTab(item) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;
  try {
    await chrome.tabs.sendMessage(tab.id, { type: "insert", body: item.body });
    window.close();
  } catch {
    await navigator.clipboard.writeText(item.body || "");
    alert("Could not reach page. Copied to clipboard instead.");
  }
}

function openEditor(item) {
  editingId = item ? item.id : null;
  $eTitle.value = item ? item.title : "";
  $eBody.value = item ? item.body : "";
  $eTags.value = item ? (item.tags || []).join(", ") : "";
  $editor.showModal();
  $eTitle.focus();
}

$new.addEventListener("click", () => openEditor(null));
$eCancel.addEventListener("click", (e) => { e.preventDefault(); $editor.close(); });
$eSave.addEventListener("click", async (e) => {
  e.preventDefault();
  const payload = {
    title: $eTitle.value,
    body: $eBody.value,
    tags: $eTags.value.split(",").map((s) => s.trim()).filter(Boolean),
  };
  if (!payload.title && !payload.body) return;
  if (editingId) await PLStorage.updateItem(editingId, payload);
  else await PLStorage.addItem(payload);
  $editor.close();
  await refresh();
});

$q.addEventListener("input", render);
$openOptions.addEventListener("click", (e) => {
  e.preventDefault();
  chrome.runtime.openOptionsPage();
});

refresh();
