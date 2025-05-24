// content.js
chrome.storage.local.get('focusModeEnabled', function(result) {
  const focusModeEnabled = result.focusModeEnabled;

  // If Focus Mode is enabled
  if (focusModeEnabled) {
    const currentUrl = window.location.href;

    // Check if the current URL is not a Leetcode page
    const isLeetcodePage = currentUrl.includes('leetcode.com');

    // Redirect to the custom landing page if it's not Leetcode
    if (!isLeetcodePage) {
      window.location.replace(chrome.runtime.getURL('focus_page.html'));
    }
  }
});
