var entries=[];

var initialLoad = function(entries) {
  return entries.reduce(function(previous, currentEntry, index, array) {
    if (index === 1) {
      return previous.response.content.size + currentEntry.response.content.size;
    } else {
      return previous + currentEntry.response.content.size;
    }
  });
}


 
var backgroundPageConnection = chrome.runtime.connect({name: 'contentScript'});

// --- Background Page Messages
backgroundPageConnection.onMessage.addListener(function(message) {

  if (message.har) {
    console.log(message.har);
    entries = entries.concat(message.har.entries);
    if (entries) {
      console.log('initialLoad: ' + initialLoad(entries));
    }
  }

  if (message.request) {
    entries.push(message.request);
  }

});

$(document).on('ready', function() {
  console.log('Ready!?');
  // Grab HAR file on page load
  backgroundPageConnection.postMessage({ get: 'har' });
});