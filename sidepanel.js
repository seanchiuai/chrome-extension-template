// Notify background that side panel is open
chrome.runtime.sendMessage({ action: 'sidePanelOpened' });

// Handle close button click
document.getElementById('closeBtn').addEventListener('click', () => {
  closeSidePanel();
});

// Listen for close messages from background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'closeSidePanel') {
    closeSidePanel();
  }
});

// Function to close the side panel
function closeSidePanel() {
  // Notify background that we're closing
  chrome.runtime.sendMessage({ action: 'sidePanelClosed' });
  // Close the side panel
  window.close();
}

