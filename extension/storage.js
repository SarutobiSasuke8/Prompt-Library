// Shared storage helpers. Items live in chrome.storage.sync under key "items".
// Schema: [{ id: string, title: string, body: string, tags: string[], createdAt: number }]
// sync cap is 100KB total, 8KB per item — keep bodies modest.

const STORAGE_KEY = "items";

async function getItems() {
  const out = await chrome.storage.sync.get(STORAGE_KEY);
  return Array.isArray(out[STORAGE_KEY]) ? out[STORAGE_KEY] : [];
}

async function setItems(items) {
  await chrome.storage.sync.set({ [STORAGE_KEY]: items });
}

async function addItem({ title, body, tags }) {
  const items = await getItems();
  const item = {
    id: crypto.randomUUID(),
    title: String(title || "").trim(),
    body: String(body || ""),
    tags: Array.isArray(tags) ? tags.map((t) => String(t).trim()).filter(Boolean) : [],
    createdAt: Date.now(),
  };
  items.unshift(item);
  await setItems(items);
  return item;
}

async function updateItem(id, patch) {
  const items = await getItems();
  const i = items.findIndex((x) => x.id === id);
  if (i === -1) return null;
  items[i] = { ...items[i], ...patch };
  await setItems(items);
  return items[i];
}

async function deleteItem(id) {
  const items = await getItems();
  await setItems(items.filter((x) => x.id !== id));
}

function searchItems(items, query) {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return items;
  return items.filter((it) => {
    const hay = (it.title + " " + it.body + " " + (it.tags || []).join(" ")).toLowerCase();
    return hay.includes(q);
  });
}

if (typeof window !== "undefined") {
  window.PLStorage = { getItems, setItems, addItem, updateItem, deleteItem, searchItems };
}
