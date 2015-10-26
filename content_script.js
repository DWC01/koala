$(document).on('ready', function() {
// Establish Connection with background Page
var backgroundPageConnection = chrome.runtime.connect({name: 'contentScript'});
// Grab HAR file
backgroundPageConnection.postMessage({ get: 'har' });
});
