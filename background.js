// background.js
let focusModeEnabled = false;

// Listen for changes to the focus mode state
chrome.storage.local.get('focusModeEnabled', function(result) {
  focusModeEnabled = result.focusModeEnabled || false;
});

// Listen for messages from the popup to toggle focus mode
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'enableFocusMode') {
    focusModeEnabled = true;
    chrome.storage.local.set({ focusModeEnabled: focusModeEnabled });
  } else if (message.action === 'disableFocusMode') {
    focusModeEnabled = false;
    chrome.storage.local.set({ focusModeEnabled: focusModeEnabled });
  }
});

// Handle content script redirection based on focus mode state
chrome.webNavigation.onCompleted.addListener(function(details) {
  if (focusModeEnabled) {
    const currentUrl = details.url;
    if (!currentUrl.includes('leetcode.com')) {
      chrome.tabs.update(details.tabId, { url: 'focus_page.html' });
    }
  }
}, { url: [{ hostContains: 'leetcode.com' }] });
