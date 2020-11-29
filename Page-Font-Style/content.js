chrome.runtime.sendMessage({ todo: 'showPageAction' });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.todo == 'changeColor') {
    $('.intro').css('color', request.clickedColor);
  }
});
