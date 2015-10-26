// Connect to Background Page
var backgroundPageConnection = chrome.runtime.connect({name: "devtools"});

// Get Har, send to Background Page
backgroundPageConnection.onMessage.addListener(function (message) {
  if (message.get === 'har') {
    chrome.devtools.network.getHAR(function(har) {
      backgroundPageConnection.postMessage({har: har})
    });
  }
});