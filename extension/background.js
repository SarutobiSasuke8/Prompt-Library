// Dispatches the Ctrl+Shift+P command to the active tab's content script.
chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "open-picker") return;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;
  try {
    await chrome.tabs.sendMessage(tab.id, { type: "open-picker" });
  } catch {
    // Content script not injected (e.g. chrome:// pages). Silently ignore.
  }
});
