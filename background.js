var devtoolsConnection,
    setPortConnections,
    displayNotification,
    devtoolsMessageListener,
    contentScriptConnection,
    contentScriptMessageListener;

  displayNotification = function(data) {
    var companyData = data[0];
    if(companyData) {
      chrome.notifications.create(Math.random().toString(), {
        iconUrl: companyData.logo.company_logo_thumb.url,
        title: 'Tracking Detected!',
        type: 'basic',
        message: companyData.name
      }, function() {});
    }
  };

  contentScriptMessageListener = function(message, sender, sendResponse) {
    if (message.get === 'har') {
      devtoolsConnection.postMessage({get: 'har'});
    }
  };

  devtoolsMessageListener = function(message, sender, sendResponse) {
    if (message.har) {
      console.log(message.har);

      message.har.entries.forEach(function(entry) {
        var url = entry.request.url;
        var companyName = companyService.getName(url);
        if (companyName) {
          companyService.getInfo(companyName, url, displayNotification);
        }
      });

    }
  };

  // --- Add Listeners on Connect ------
  setPortConnections = function (port) {
    if (port.name === 'contentScript') {
      contentScriptConnection = port;
      console.log('Connected to contentScript');
    }
    
    if (port.name === 'devtools') {
      devtoolsConnection = port;
      console.log('Connected to devtools');
    }

    if(contentScriptConnection && devtoolsConnection) {
      port.onMessage.addListener(contentScriptMessageListener);
      port.onMessage.addListener(devtoolsMessageListener);
      console.log('Both Connections Live!');
    }
    
  }

  chrome.runtime.onConnect.addListener(setPortConnections);
