$(function () {
  chrome.storage.sync.get('limit', function (budget) {
    $('#limit').val(budget.limit);
  });

  $('#saveLimit').click(function () {
    var limit = $('#limit').val();

    if (limit) {
      chrome.storage.sync.set({ limit }, () => {
        close();
      });
    }
  });

  $('#resetTotal').click(function () {
    chrome.storage.sync.set({ total: 0 }, function () {
      const notifOptions = {
        type: 'basic',
        iconUrl: 'icon48.png',
        title: 'Total reset!',
        message: 'Total is reset to 0',
      };

      chrome.notifications.create('resetTotal', notifOptions);
    });
  });
});
