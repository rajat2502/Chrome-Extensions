$(function () {
  chrome.storage.sync.get(['total', 'limit'], function (budget) {
    $('#total').text(budget.total);
    $('#limit').text(budget.limit);
  });

  $('#spendAmount').click(function () {
    // get total from storage
    chrome.storage.sync.get(['total', 'limit'], function (budget) {
      var newTotal = 0;
      if (budget.total) {
        newTotal += parseInt(budget.total);
      }

      const amount = $('#amount').val();

      if (amount) {
        newTotal += parseInt(amount);
      }

      // set total to storage
      chrome.storage.sync.set({ total: newTotal }, function () {
        // notify user if limit is reached
        if (amount && newTotal >= budget.limit) {
          const notifOptions = {
            type: 'basic',
            iconUrl: 'icon48.png',
            title: 'Limit reached!',
            message: "Uh oh! Looks like you've reached your limit!",
          };

          chrome.notifications.create('limitNotif', notifOptions);
        }
      });

      $('#total').text(newTotal);
      $('#amount').val('');
    });
  });
});
