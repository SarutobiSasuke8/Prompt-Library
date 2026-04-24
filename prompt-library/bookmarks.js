// bookmarks.js — unified save/bookmark store for prompt-library.
// Exposes window.PL_BOOKMARKS.{load, save, isBookmarked, toggle}
//
// Storage key: 'promptLibrary.bookmarks'
// Shape: { prompt: number[], article: number[], tool: string[], collection: string[] }
//
// One-time migration: legacy 'promptLibrary.starredTools' array → bookmarks.tool
(function () {
  "use strict";

  var KEY              = "promptLibrary.bookmarks";
  var LEGACY_TOOLS_KEY = "promptLibrary.starredTools";

  function empty() {
    return { prompt: [], article: [], tool: [], agent: [], doc: [], collection: [] };
  }

  function load() {
    var d = empty();
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var p = JSON.parse(raw);
        d.prompt     = p.prompt     || [];
        d.article    = p.article    || [];
        d.tool       = p.tool       || [];
        d.agent      = p.agent      || [];
        d.doc        = p.doc        || [];
        d.collection = p.collection || [];
      }
    } catch (_) {}
    // One-time migration: absorb the old starredTools array into bookmarks.tool
    try {
      var old = localStorage.getItem(LEGACY_TOOLS_KEY);
      if (old) {
        var arr = JSON.parse(old) || [];
        arr.forEach(function (id) {
          if (d.tool.indexOf(id) === -1) d.tool.push(id);
        });
        _save(d);
        localStorage.removeItem(LEGACY_TOOLS_KEY);
      }
    } catch (_) {}
    return d;
  }

  function _save(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (_) {}
  }

  function isBookmarked(type, id) {
    var arr = load()[type] || [];
    return arr.indexOf(id) !== -1;
  }

  // Toggles saved state. Returns true if the item is now bookmarked.
  function toggle(type, id) {
    var data = load();
    data[type] = data[type] || [];
    var idx = data[type].indexOf(id);
    if (idx === -1) { data[type].push(id); }
    else            { data[type].splice(idx, 1); }
    _save(data);
    return idx === -1;
  }

  window.PL_BOOKMARKS = {
    load:         load,
    save:         _save,
    isBookmarked: isBookmarked,
    toggle:       toggle
  };
})();
