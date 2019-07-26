// Listen for messages
chrome.browserAction.onClicked.addListener(buttonClicked);

// Callback for when a message is received
function buttonClicked(tab) {
	//if (request.message === "user clicked!") {
	// Do something!
	//console.log("click"); 
	addWatchButton(tab.id)
	//}
}

function addWatchButton(tabId) {
	var message = {
		method: "addButton"
	}
	chrome.tabs.sendMessage(tabId, message);
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	//if (changeInfo.status == 'complete') {
	//  console.log(changeInfo.status);  

	// do your things
	addWatchButton(tabId);
	//}
})