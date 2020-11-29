const menuItem = {
  id: 'speakit',
  title: 'SpeakIt',
  contexts: ['selection'],
};

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId == 'speakit' && clickData.selectionText) {
    chrome.tts.speak(clickData.selectionText, { rate: 0.7 });
  }
});
