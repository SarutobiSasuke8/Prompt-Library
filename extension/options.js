const $json = document.getElementById("json");
const $load = document.getElementById("load");
const $save = document.getElementById("save");
const $status = document.getElementById("status");

function flash(msg) {
  $status.textContent = msg;
  setTimeout(() => ($status.textContent = ""), 2000);
}

async function load() {
  const items = await PLStorage.getItems();
  $json.value = JSON.stringify(items, null, 2);
  flash("loaded " + items.length + " item(s)");
}

async function save() {
  let parsed;
  try {
    parsed = JSON.parse($json.value || "[]");
  } catch (e) {
    alert("Invalid JSON: " + e.message);
    return;
  }
  if (!Array.isArray(parsed)) {
    alert("Top-level value must be an array.");
    return;
  }
  await PLStorage.setItems(parsed);
  flash("saved " + parsed.length + " item(s)");
}

$load.addEventListener("click", load);
$save.addEventListener("click", save);
load();
