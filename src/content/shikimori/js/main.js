var g_user_rates;

var mainObserver = new MutationObserver(add_button);
var observerConfig = {
	attributes: true,
	subtree: true,
	childList: true
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	//console.dir(request);
	if (request.method === "updateWatched") {
		console.log("updateWatched");
		var rate = request.options.rate;
		var matches = location.href.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);

		$.get(matches[0] + "user_rates/" + rate.id + "/edit", function(rateData) {
			if (!rateData) {
				console.log("couldn't retrieve user_rate edit form");
				return;
			}

			var userRatesForm = $(rateData);
			var authenticity_token = $("[name=authenticity_token]", userRatesForm).attr("value");
			var user_rate_status = $("#user_rate_status option:selected", userRatesForm).attr("value");
			var user_rate_rewatches = $("#user_rate_rewatches", userRatesForm).attr("value");
			var user_rate_score = $("#user_rate_score option:selected", userRatesForm).attr("value");
			var user_rate_text = $("#user_rate_text", userRatesForm).text();
			var user_rate_episodes = rate.episodes;

			var rateFormData = {
				"utf8": "✓",
				"_method": "patch",
				"authenticity_token": authenticity_token,
				"user_rate[score]": user_rate_score,
				"user_rate[episodes]": user_rate_episodes,
				"user_rate[status]": user_rate_status,
				"user_rate[rewatches]": user_rate_rewatches,
				"user_rate[text]": user_rate_text
			};

			console.dir(rateFormData);

			$.ajax({
				type: "POST",
				url: matches[0] + "api/v2/user_rates/" + rate.id,
				data: rateFormData,
				success: function(data) {
					console.log("posted user_rate");
					//console.dir(data);
				},
				dataType: "json"
			});
		});

		sendResponse({
			ok: "ok"
		});
	} else if (request.method === "createRate") {
		console.log("createRate");
		var matches = location.href.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);

		var rateFormData = {
			"frontend": "1",
			"user_rate[user_id]": request.options.user_id,
			"user_rate[target_id]": request.options.target_id,
			"user_rate[target_type]": "Anime",
			"user_rate[status]": "watching",
			"user_rate[score]": "0"
		};

		$.ajax({
			type: "POST",
			url: matches[0] + "api/v2/user_rates",
			data: rateFormData,
			success: function(data) {
				console.log("posted user_rate");
				//respData = JSON.stringify(data);
				//sendResponse(respData);
				//console.dir(data);
			},
			dataType: "json"
		})

		sendResponse({
			ok: "ok"
		});

	} else if (request.method === "addButton") {
		/* nothing */
	}

	sendResponse({
		ok: "ok"
	});
});

var g_data = {};

function get(url, callback) {
	if (url in g_data) {
		return g_data[url];
	}

	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			g_data[url] = xhr.responseText;
			callback(xhr.responseText);
		}
	};
	xhr.send();
}

function IsJsonString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

var g_user_authorized = true;

function is_user_authorized() {
	return g_user_authorized;
}

function get_user_rates(anime_id, callback) {
	console.log("get_user_rates: init");
	if (g_user_rates) {
		console.log("get_user_rates: exit");
		return callback(g_user_rates);
	}

	get("https://" + location.hostname + "/api/users/whoami", function(data) {
		if (!data || data === "null") {
			g_user_authorized = false;
			return callback();
		}

		var user = JSON.parse(data);
		get("https://" + location.hostname + "/api/v2/user_rates?user_id=" + user.id +
			"&target_id=" + anime_id + "&target_type=Anime",
			function(data1) {
				if (IsJsonString(data1)) {
					var rates = JSON.parse(data1);
					g_user_rates = rates;
					callback(rates);
				}
		});
	});

	setTimeout(function() {
		get_user_rates(anime_id, callback);
	}, 700);
}

function get_anime_id() {
	try {
		var anime_id = location.pathname.split("-")[0].split("/")[2].replace(/\D/g, "");
	} catch (e) {
		console.log(e);
		return;
	}

	return anime_id;
}

function add_button() {
	var infoSection = document.querySelector('#animes_show .c-info-right');

	var watchLink = document.querySelector('#_watchButton');
	console.log("add_button: init");

	//console.log("start");

	if (infoSection === null || watchLink !== null) {
		//console.log("infoSection === null || watchLink !== null");
		return;
	}

	if (watchLink !== null) {
		console.log("add_button: exit");
		mainObserver.disconnect();
		return;
	}

	var episode_num = 1;
	var anime_id = get_anime_id();

	if (!g_user_rates && is_user_authorized()) {
		return get_user_rates(anime_id, function(rates) {
			add_button();
		});
	}

	if (g_user_rates && g_user_rates.length > 0 && (g_user_rates[0]["status"] === "watching" || g_user_rates[0]["status"] === "rewatching")) {
			episode_num = g_user_rates[0].episodes + 1;
	}

	var loc = chrome.runtime.getURL("index.html") + "?anime_id=" + anime_id + "&episode=" + episode_num + "&hostname=" + location.hostname;

	if (!document.querySelector('#_watchButton')) {
		var WatchButtonElement = document.createElement('div');
		WatchButtonElement.classList.add('block');
		WatchButtonElement.innerHTML = '<div class="subheadline m10" style="margin-top: 10px;">Онлайн просмотр</div><a class="b-link_button dark watch-online" target="_blank" id="_watchButton" href="#" style="margin-top: 10px;">Смотреть онлайн</a>';

		infoSection.appendChild(WatchButtonElement);
		watchLink = WatchButtonElement.querySelector('#_watchButton');
		watchLink.href = loc;

		console.log("added button");
		//mainObserver.disconnect();
	}
}

function start() {
	if (window.location.href.indexOf('shikimori.org/animes/') === -1 &&
				window.location.href.indexOf('shikimori.one/animes/') === -1) {
		return;
	}

	console.log("PlayShikiApp");

	var anime_id = get_anime_id();

	get_user_rates(anime_id, function(rates) {
		console.log("get_user_rates");
		mainObserver.observe(document, observerConfig);
	});

	add_button();
}

try {
	start();
} catch(e) {
	console.log(e);
}
