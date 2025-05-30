// focus_page.js
document.addEventListener('DOMContentLoaded', function() {
  const focusModeToggle = document.getElementById('focusModeToggle');
  const themeToggle = document.getElementById('themeToggle');

  // Check the initial state of focus mode and theme
  chrome.storage.local.get(['focusModeEnabled', 'theme'], function(result) {
    focusModeToggle.checked = result.focusModeEnabled || false;
    const theme = result.theme || 'light';

    // Apply theme
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      themeToggle.classList.replace('sun', 'moon');  // Change to moon icon

    }

    // Handle the theme toggle switch
    themeToggle.addEventListener('click', function() {
      const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
      chrome.storage.local.set({ theme: newTheme });

      // Toggle theme
      document.body.classList.toggle('dark-theme');

      // Change sun/moon icon accordingly
      if (document.body.classList.contains('dark-theme')) {
        themeToggle.classList.replace('sun', 'moon');
      } else {
        themeToggle.classList.replace('moon', 'sun');
      }
    });
  });

  // Handle the focus mode toggle change
  focusModeToggle.addEventListener('change', function() {
    const focusModeEnabled = focusModeToggle.checked;
    
    // Save the new focus mode state
    chrome.storage.local.set({ focusModeEnabled: focusModeEnabled });

    // Send message to toggle focus mode in background
    chrome.runtime.sendMessage({ action: focusModeEnabled ? 'enableFocusMode' : 'disableFocusMode' });
  });

});
