// Track side panel state per window
const sidePanelState = new Map();

// Listen for clicks on the extension icon
chrome.action.onClicked.addListener((tab) => {
  toggleSidePanel(tab.windowId);
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggleSidePanel') {
    // Get the current window
    chrome.windows.getCurrent((window) => {
      toggleSidePanel(window.id);
    });
  } else if (message.action === 'sidePanelClosed') {
    // Side panel was closed, update state
    chrome.windows.getCurrent((window) => {
      sidePanelState.set(window.id, false);
    });
  } else if (message.action === 'sidePanelOpened') {
    // Side panel was opened, update state
    if (sender.tab) {
      sidePanelState.set(sender.tab.windowId, true);
    }
  }
});

// Function to toggle side panel
function toggleSidePanel(windowId) {
  const isOpen = sidePanelState.get(windowId);
  
  if (isOpen) {
    // Side panel is open, send message to close it
    chrome.runtime.sendMessage({ action: 'closeSidePanel' });
    sidePanelState.set(windowId, false);
  } else {
    // Side panel is closed, open it
    chrome.sidePanel.open({ windowId: windowId });
    sidePanelState.set(windowId, true);
  }
}

