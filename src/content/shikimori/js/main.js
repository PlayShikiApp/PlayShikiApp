var g_episode_num;
var g_user_rates;
var g_user_stats;
var g_button_added = false;

const mainObserver = new MutationObserver(main);
const observerConfig = {attributes: true, subtree: true, childList: true};
mainObserver.observe(document, observerConfig);
main();

function get_user_rates() {
	var bars = document.getElementsByClassName("b-animes-menu");
	
	if (bars.length != 0) {
		bars = bars[0];
		try {
			g_user_rates = encodeURIComponent(bars.getElementsByClassName("horizontal")[0].getAttribute("data-stats"));
			g_user_stats = encodeURIComponent(bars.getElementsByClassName("horizontal")[1].getAttribute("data-stats"));
		} catch {
			//console.log("can't parse user rates!");
		}
	}
}

function add_button() {
	var infoSection = document.querySelector('#animes_show .c-info-right');

	var watchLink = document.querySelector('#_watchButton');
	var current_episode_div;
	//console.log("add_button: init");
	
	if (g_button_added)
		return;

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
	
	//console.log("1");

	var episode_num = 1;
	var anime_id = get_anime_id();

	if (!current_episode_div) {
		var current_episode_div = document.getElementsByClassName("current-episodes");
		if (current_episode_div.length != 0) {
			try {
				current_episode_div = current_episode_div[0];
				episode_num = parseInt(current_episode_div.textContent) + 1;
				g_episode_num = episode_num;
			} catch {
				console.log("can't parse current episode number!");
			}
		} else {
			console.log("add_button: restart");
			setTimeout(function() {
				add_button();
			}, 400);
		}
	}
	
	//console.log("2");
	
	if (g_user_rates == null || g_user_stats == null) {
		get_user_rates();
		//console.log("add_button: exit");
		if (g_user_rates == null || g_user_stats == null) {
			setTimeout(function() {
				add_button();
			}, 400);
			return;
		}
	}
	
	//console.log("3");
	//console.log("episode_num: " + episode_num);
	//console.log("current_episode_div: ");
	//console.dir(current_episode_div);
	
	

	var loc = chrome.runtime.getURL("index.html") + "?anime_id=" + anime_id + "&episode=" + episode_num + "&hostname=" + location.hostname + "&rates=" + g_user_rates + "&stats=" + g_user_stats;

	if (!document.querySelector('#_watchButton')) {
		var WatchButtonElement = document.createElement('div');
		WatchButtonElement.classList.add('block');
		WatchButtonElement.innerHTML = '<div id="watchbutton" class="subheadline m10" style="margin-top: 10px;">Онлайн просмотр</div><a class="b-link_button dark watch-online" target="_blank" id="_watchButton" href="#" style="margin-top: 10px;">Смотреть онлайн</a>';

		infoSection.appendChild(WatchButtonElement);
		watchLink = WatchButtonElement.querySelector('#_watchButton');
		watchLink.href = loc;

		console.log("added button");
		g_button_added = true;
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
		if (window.location.href.indexOf("https://shikimori.me/animes/") !== -1) {
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

function doc_ready(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function main() {
	if ((window.location.href.indexOf('shikimori.me/animes/') === -1 &&
				window.location.href.indexOf('shikimori.me/animes/') === -1) ||
				window.location.href.endsWith('shikimori.me/animes/')) {
		return;
	}

	doc_ready(add_button);

	try {
		start();
	} catch(e) {
		console.log(e);
	}
}
