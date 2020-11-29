const menuItem = {
  id: 'wikit',
  title: 'Wikit',
  contexts: ['selection'],
};

chrome.contextMenus.create(menuItem);

// convert into uri
function fixedEncodeURI(str) {
  return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.onClicked.addListener((clickedData) => {
  if (clickedData.menuItemId == 'wikit' && clickedData.selectionText) {
    const wikiUrl =
      'https://en.wikipedia.org/wiki/' +
      fixedEncodeURI(clickedData.selectionText);

    const createData = {
      url: wikiUrl,
      type: 'popup',
      top: 5,
      left: 5,
      width: 600,
      height: 600,
    };

    chrome.windows.create(createData, () => {});
  }
});
