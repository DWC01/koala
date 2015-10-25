var connection={},
    setPortConnections,
    devtoolsMessageListener,
    devtoolsDisconnectListener,
    contentScriptMessageListener,
    contentScriptDisconectListener;

  // --- Message Listeners ------
  devtoolsMessageListener = function(message, sender, sendResponse) {
    if (message.har) {
      connection.contentScript.postMessage({har: message.har});
    }

    if (message.request) {
      console.log(message.request);
      connection.contentScript.postMessage({request: message.request});
    }
  };

  contentScriptMessageListener = function(message, sender, sendResponse) {
    if (message.get === 'har') {
      connection.devtools.postMessage({get: 'har'});
    }
  };


  // --- Disconnect Listeners ------
  devtoolsDisconnectListener = function(port) {
    connection.devtools = undefined;
    port.onMessage.removeListener(devtoolsMessageListener);
  };

  contentScriptDisconectListener = function(port){
    connection.contentScript = undefined;
    port.onMessage.removeListener(contentScriptMessageListener);
  }

  // --- Add Listeners on Connect ------
  setPortConnections = function (port) {
    connection[port.name] = port;

    if (port.name === 'contentScript') {
      port.onMessage.addListener(contentScriptMessageListener);
      port.onDisconnect.addListener(contentScriptDisconectListener);
      console.log('Connected to contentScript');
    }
    
    if (port.name === 'devtools') {
      port.onMessage.addListener(devtoolsMessageListener);
      port.onDisconnect.addListener(devtoolsDisconnectListener);
      console.log('Connected to devtools');
    }
    
  }

  chrome.runtime.onConnect.addListener(setPortConnections);
