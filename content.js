// Create a floating button that appears on all websites
function createFloatingButton() {
  // Check if button already exists
  if (document.getElementById('hello-world-toggle-btn')) {
    return;
  }

  // Create the button
  const button = document.createElement('button');
  button.id = 'hello-world-toggle-btn';
  button.innerHTML = '👋';
  button.title = 'Toggle Hello World Sidebar';
  
  // Add styles
  button.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: 3px solid white;
    color: white;
    font-size: 30px;
    cursor: pointer;
    z-index: 2147483647;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  `;
  
  // Add hover effect
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'scale(1.1)';
    button.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1)';
    button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
  });
  
  // Handle click - send message to background script
  button.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'toggleSidePanel' });
  });
  
  // Add button to page
  document.body.appendChild(button);
}

// Create button when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createFloatingButton);
} else {
  createFloatingButton();
}

