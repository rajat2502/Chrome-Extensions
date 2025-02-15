const contextMenuItem = {
  id: 'spendMoney',
  title: 'Spend Money',
  contexts: ['selection'],
};

chrome.contextMenus.create(contextMenuItem);

function isInt(value) {
  return (
    !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10))
  );
}

chrome.contextMenus.onClicked.addListener(function (clickedData) {
  if (clickedData.menuItemId == 'spendMoney' && clickedData.selectionText) {
    if (isInt(clickedData.selectionText)) {
      chrome.storage.sync.get(['total', 'limit'], function (budget) {
        let newTotal = 0;

        if (budget.total) {
          newTotal += parseInt(budget.total);
        }
        newTotal += parseInt(clickedData.selectionText);

        chrome.storage.sync.set({ total: newTotal }, function () {
          if (newTotal >= budget.limit) {
            const notifOptions = {
              type: 'basic',
              iconUrl: 'icon48.png',
              title: 'Limit reached!',
              message: "Uh oh! Looks like you've reached your limit!",
            };

            chrome.notifications.create('limitNotif', notifOptions);
          }
        });
      });
    }
  }
});

chrome.storage.onChanged.addListener(function (changes, storageName) {
  chrome.browserAction.setBadgeText({
    text: changes.total.newValue.toString(),
  });
});
