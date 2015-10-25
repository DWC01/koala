var backgroundPageConnection;

backgroundPageConnection = chrome.runtime.connect({
  name: "devtools"
});

backgroundPageConnection.onMessage.addListener(function (message) {
    
    if (message.get === 'har') {
      chrome.devtools.network.getHAR(function(har) {
        backgroundPageConnection.postMessage({
          har: har
        });

        // -- Listen to subsequent requests after har is sent
        chrome.devtools.network.onRequestFinished.addListener(function(request) {
          backgroundPageConnection.postMessage({
            request: request
          });
        });

      });
    }

});