var g_episode_num;

const mainObserver = new MutationObserver(main);
const observerConfig = {attributes: true, subtree: true, childList: true};
mainObserver.observe(document, observerConfig);
main();

function add_button() {
	var infoSection = document.querySelector('#animes_show .c-info-right');

	var watchLink = document.querySelector('#_watchButton');
	//console.log("add_button: init");

	//console.log("start");

	if (infoSection === null || watchLink !== null) {
		//console.log("infoSection === null || watchLink !== null");
		setTimeout(function() {
			add_button();
		}, 400);
		return;
	}

	if (watchLink !== null) {
		console.log("add_button: exit");
		setTimeout(function() {
			add_button();
		}, 400);
		return;
	}

	var episode_num = 1;
	var anime_id = get_anime_id();

	if (!g_episode_num) {
		var current_episode_div = document.getElementsByClassName("current-episodes");
		if (current_episode_div.length != 0) {
			try {
				current_episode_div = current_episode_div[0];
				episode_num = parseInt(current_episode_div.textContent) + 1;
				g_episode_num = episode_num;
			} catch {
				console.log("can't parse current episode number!");
			}
		}
	}

	var loc = chrome.runtime.getURL("index.html") + "?anime_id=" + anime_id + "&episode=" + episode_num + "&hostname=" + location.hostname;

	if (!document.querySelector('#_watchButton')) {
		var WatchButtonElement = document.createElement('div');
		WatchButtonElement.classList.add('block');
		WatchButtonElement.innerHTML = '<div id="watchbutton" class="subheadline m10" style="margin-top: 10px;">Онлайн просмотр</div><a class="b-link_button dark watch-online" target="_blank" id="_watchButton" href="#" style="margin-top: 10px;">Смотреть онлайн</a>';

		infoSection.appendChild(WatchButtonElement);
		watchLink = WatchButtonElement.querySelector('#_watchButton');
		watchLink.href = loc;

		console.log("added button");
		//mainObserver.disconnect();
	} else {
		setTimeout(function() {
			add_button();
		}, 400);
	}
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
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
		if (window.location.href.indexOf("https://shikimori.one/animes/") !== -1 ||
		    window.location.href.indexOf("https://shikimori.org/animes/") !== -1) {
			setTimeout(add_button, 200);
		}
	}
	
	return Promise.resolve("Dummy response to keep the console quiet");
});

function get_anime_id() {
	try {
		var anime_id = location.pathname.split("-")[0].split("/")[2].replace(/\D/g, "");
	} catch (e) {
		console.log(e);
		return;
	}

	return anime_id;
}

function start() {
	if ((window.location.href.indexOf('shikimori.org/animes/') === -1 &&
				window.location.href.indexOf('shikimori.one/animes/') === -1) ||
				window.location.href.endsWith('shikimori.org/animes/') ||
				window.location.href.endsWith('shikimori.one/animes/') ||
				window.location.href.endsWith('shikimori.org/animes') ||
				window.location.href.endsWith('shikimori.one/animes')) {
		return;
	}

	console.log("PlayShikiApp");
}

function main() {
	if ((window.location.href.indexOf('shikimori.org/animes/') === -1 &&
				window.location.href.indexOf('shikimori.one/animes/') === -1) ||
				window.location.href.endsWith('shikimori.org/animes/') ||
				window.location.href.endsWith('shikimori.one/animes/') ||
				window.location.href.endsWith('shikimori.org/animes') ||
				window.location.href.endsWith('shikimori.one/animes')) {
		return;
	}

	$(document).ready(function() {
		add_button();
	})
	
	try {
		start();
	} catch(e) {
		console.log(e);
	}
}