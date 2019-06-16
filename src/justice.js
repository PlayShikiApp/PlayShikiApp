chrome.runtime.onMessage.addListener(function (message) {

	if (message.method === "incrementRate") {
		console.log("incrementRate");
		var rate_id = message.id
		var matches = location.href.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
		$.post(matches[0] + "api/v2/user_rates/" + rate_id + "/increment", function(data) {
			console.log("posted increment user_rates");
			console.dir(data);
		});
	}

	return true;
});

