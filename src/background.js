function noop(){}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	chrome.tabs.sendMessage(
			tab.id,
			{
				method: "addButton",
				link: chrome.runtime.getURL("index.html")
			},
			noop
	);
});
