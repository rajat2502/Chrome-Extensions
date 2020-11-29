chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.todo === 'showPageAction') {
    // retrive all tabs
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // highlight page extension
      chrome.pageAction.show(tabs[0].id);
    });
  }
});
