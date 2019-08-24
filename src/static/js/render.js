//require("../../jquery-3.4.1.min.js");

const HOST = "https://gist.github.com/Chronomonochrome/aad42e8ae1fea9c7ad570bdd2b090cfa/raw/"

var g_key;
var g_key2;

var HOST_URL = null;

var g_data = {};

var g_anime_name = "";
var g_episode = null;
var g_video;
try {
	chrome.commands.onCommand.addListener(function(command) {
		if (command === "capture") {
			g_video.capture(g_anime_name, g_episode);
		}
	});
} catch (e) {
	console.log(e);
}

async function getData(ajaxurl) {
	if (ajaxurl in g_data)
		return g_data[ajaxurl];

	var res = await $.ajax({
		url: ajaxurl,
		type: 'GET',
	});

	g_data[ajaxurl] = res;

	return res;
};

async function getHost() {
	if (HOST_URL !== null)
		return;

	HOST_URL = await $.ajax(HOST);
}

async function getKeys() {
	await getHost();
	if (!g_key)
		g_key = await getData(HOST_URL + "/static/keys/key");

	if (!g_key2)
		g_key2 = await getData(HOST_URL + "/static/keys/key2");
}


/** shiki_helpers.js **/
var anime_info = {};

function get_shikimori_hosting() {
	return (getUrlParameter(window.location.href, "hostname") || "shikimori.one");
}

async function get_shiki_anime_info(id) {
	if (anime_info[id])
		return anime_info[id];

	var hosting = get_shikimori_hosting();
	try {
		anime_info[id] = await $.get(`https://${hosting}/api/animes/${id}`);
	} catch (e) {
		console.log(e);
		return null;
	}
	return anime_info[id];
}

function validate_anime_info(anime_info, id) {
	if (!anime_info || !anime_info["genres"] || anime_info["genres"].length == 0)
		return false;

	if (!anime_info["rates_scores_stats"])
		return false;

	if (!anime_info["rates_statuses_stats"])
		return false;

	return true;
}

async function get_rates_scores_stats(id) {
	const anime_info = await get_shiki_anime_info(id);
	if (!validate_anime_info(anime_info))
		return;

	return anime_info["rates_scores_stats"];
}

async function get_rates_statuses_stats(id) {
	const anime_info = await get_shiki_anime_info(id);
	if (!validate_anime_info(anime_info))
		return;

	return anime_info["rates_statuses_stats"];
}

async function get_main_genre_url(id) {
	const anime_info = await get_shiki_anime_info(id);
	if (!validate_anime_info(anime_info))
		return "";

	const genre_id = anime_info["genres"][0].id;
	const genre_en = anime_info["genres"][0].name;
	var hosting = get_shikimori_hosting();

	return `https://${hosting}/animes/genre/${genre_id}-${genre_en}`;
}

async function get_main_genre_ru_name(id) {
	const anime_info = await get_shiki_anime_info(id);
	if (!validate_anime_info(anime_info))
		return "";

	return anime_info["genres"][0].russian;
}

/** end of shiki_helpers.js **/

var getUrlParameter = function getUrlParameter(href, sParam) {
	if (href === undefined)
		return;

	var query = href.split("?");
	if (query === undefined)
		return;

	if (query[1] == undefined)
		return;

	var tmp = query[1].split(sParam + "=");
	if (tmp == undefined || tmp.length < 2)
		return;

	return tmp[1].split("&")[0];
};

function IsJsonString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

function get_or_set_user(callback) {
	var user = window.localStorage.getItem('user');


	if (user === null || user === "null" || !IsJsonString(user)) {
		var hosting = get_shikimori_hosting();
		try {
			$.get(`https://${hosting}/api/users/whoami`, function(data) {
				user = JSON.stringify(data);
				window.localStorage.setItem('user', user);
				try {
					callback(JSON.parse(user));
				} catch (e) {
					callback(null);
				}
			});
		} catch (e) {
			console.log(e);
			callback(null);
		}
	} else {
		callback(JSON.parse(user));
	}
}

function get_user_rate(anime_id, user_id, callback) {
	var hosting = get_shikimori_hosting();
	try {
		$.get(`https://${hosting}/api/v2/user_rates?user_id=` + user_id +
			"&target_id=" + anime_id + "&target_type=Anime",
			function(data) {
				rates = [];
				try {
					rates = JSON.stringify(data);
				} catch (e) {
					console.dir(e);
				}

				callback(rates);
			});
	} catch (e) {
		console.log(e);
		callback(null);
	}
}

function get_or_set_user_rate(anime_id, create_rate, callback) {
	get_or_set_user(function(user) {
		if (user === null) {
			console.log("error retrieving user data");
			return null;
		}

		var rate_ident = 'rates-' + anime_id;

		var rates = window.localStorage.getItem(rate_ident);
		//console.log(rates == null);

		if (rates == null || !Array.isArray(rates) || !IsJsonString(rates)) {
			console.log("!rates");
			get_user_rate(anime_id, user.id, function(rates) {
				if (!create_rate) {
					callback(JSON.parse(rates));
					return;
				}

				if (rates == [] || rates == "[]") {
					console.log("send_message_to_tab(createRate)");
					set_watched_button_disabled(true, false);

					send_message_to_tab(
						"createRate", {
							target_id: anime_id,
							user_id: user.id,
						},
						function() {
							console.log("createRate(onSuccess)");
							invalidate_user_rates(anime_id);
							setTimeout(function() {
								get_user_rate(anime_id, user.id, function(rates) {
									console.log("(get_user_rate) set rates: ");
									console.dir(rates);
									set_watched_button_disabled(false, false);
									window.localStorage.setItem(rate_ident, rates);
									callback(JSON.parse(rates));
								});
							}, 1000);
						},
						function(failureReason) {
							console.log("couldn't find a satisfying tab to send message to :(");
							set_watched_button_disabled(true, failureReason);
						}
					);
				} else {
					console.log("set rates: " + rates);
					window.localStorage.setItem(rate_ident, rates);
					try {
						callback(JSON.parse(rates));
					} catch (e) {
						callback(null);
					}
				}
			});
		} else {
			//console.dir(rates);
			callback(JSON.parse(rates));
		}
	});
}

function invalidate_user_rates(anime_id) {
	var rate_ident = 'rates-' + anime_id;
	window.localStorage.removeItem(rate_ident);
}

var is_watched_button_disabled = function(callback) {
	var anime_id = getUrlParameter(window.location.href, 'anime_id');
	var episode = getUrlParameter(window.location.href, 'episode');
	var watched_button_disabled = false;

	get_or_set_user_rate(anime_id, false, function(rates) {
		if (rates === null) {
			console.log("error retrieving user rates");
			return;
		}

		watched_button_disabled = false;
		console.dir(rates);

		if (rates.length > 0) {
			console.log("rates[0].episodes = " + rates[0].episodes + " episode=" + episode)

			if (parseInt(rates[0].episodes) >= parseInt(episode)) {
				//set_watched_button_disabled();
				watched_button_disabled = true;
			}
		}

		callback(watched_button_disabled);
	});
};
var watched_button_handler;

function set_watched_button_disabled(status, tooltip) {
	if (status) {
		$("#watched").addClass("b-ajax");
		$("#watched").addClass("disabled");
		$("#watched").click(function() {});
	} else {
		$("#watched").removeClass("b-ajax");
		$("#watched").removeClass("disabled");
		$("#watched").click(watched_button_handler);
	}

	if (!tooltip) {
		$("#watch_tooltip").empty();
		return;
	}

	var msg = "";
	var hosting = get_shikimori_hosting();
	if (tooltip == "no_more_tabs") {
		var msg = `<span>Упс! Для работы кнопки необходимо, чтобы была открыта хотя бы одна вкладка с сайтом <a target="_blank" id="shiki" href="https://${hosting}">Шикимори</a>. Кликните по ссылке выше, чтобы скрыть это сообщение.</span>`;
	} else if (tooltip == "no_alive_tabs") {
		var msg = `<span>Упс! Для работы кнопки необходимо, чтобы была открыта хотя бы одна вкладка с сайтом <a target="_blank" id="shiki" href="https://${hosting}">Шикимори</a>. Похоже, что уже открытые вкладки не работают. Кликните по ссылке выше, чтобы скрыть это сообщение.</span>`;
	}

	$("#watch_tooltip").empty();
	$("#watch_tooltip").append(msg);
	$("#shiki").click(function() {
		set_watched_button_disabled(false, false);
	});

}

function onLocalSessionStore() {
	is_watched_button_disabled(function(status) {
		console.log("watch button is " + status ? "disabled" : "enabled");
	});
}

function do_nothing() {
	console.log("click");
}

/**
 * Promise wrapper for chrome.tabs.executeScript
 * @param tabId
 * @param details
 * @returns {Promise<any>}
 */
function executeScriptPromise(tabId, details) {
	return new Promise((resolve, reject) => {
		//console.log("executeScriptPromise: " + tabId);
		chrome.tabs.executeScript(tabId, details, () => {
			if (chrome.runtime.lastError) {
				console.log("executeScriptPromise: " + tabId + " reject();");
				reject(chrome.runtime.lastError.message);
			} else {
				console.log("executeScriptPromise: " + tabId + " resolve(ok);");
				resolve("ok");
			}
		});
	});
}

/**
 * Promise wrapper for chrome.tabs.sendMessage
 * @param tabId
 * @param item
 * @returns {Promise<any>}
 */
function sendMessagePromise(tabId, item) {
	return new Promise((resolve, reject) => {
		chrome.tabs.sendMessage(tabId, item, response => {
			if (response && ("ok" in response)) {
				console.log("sendMessagePromise: " + tabId + " resolve(ok);");
				resolve("ok");
			} else {
				console.log("sendMessagePromise: " + tabId + " reject();");
				if (chrome.runtime.lastError)
					reject(chrome.runtime.lastError.message);
				else
					reject("Something went wrong");
			}
		});
	});
}

async function send_message_to_tab(method, options, onSuccess, onFailure, onResponse) {
	chrome.tabs.query({}, async function(tabs) {
		//console.dir(tabs);
		var foundTab = false;
		var lastError = null;
		var failureReason = "no_more_tabs";
		for (var i = 0; i < tabs.length; ++i) {
			if ((tabs[i].url.indexOf("shikimori.org") < 0 &&
					tabs[i].url.indexOf("shikimori.one") < 0) ||
				tabs[i].url.indexOf("chrome-extension://") >= 0)
				continue;
			try {
				failureReason = "no_alive_tabs";
				console.log("send_message_to_tab: " + tabs[i].url);

				const result1 = await executeScriptPromise(tabs[i].id, {
						file: "content/shikimori/js/main.js"
					},
					() => console.log(["executeScriptPromise ", chrome.runtime.lastError]));

				const result = await sendMessagePromise(tabs[i].id, {
						method: method,
						options: options
					},
					() => console.log(["sendMessagePromise ", chrome.runtime.lastError])
				);

				lastError = null;
				if (chrome.runtime.lastError) {
					lastError = "error: receiving end doesn't exist";
					//console.error(lastError);
				}

				if (lastError) {
					continue;
				}

				foundTab = true;
				onSuccess();

				break;
			} catch (e) {
				console.dir(e);
				continue;
			}
		}

		if (!foundTab)
			onFailure(failureReason);
	});
}

var lastClick = 0;

function set_player_controls_callbacks() {
	console.log("ready");
	var historyState = {};
	$("a").each(function(index) {
		var href = $(this).attr("url");
		if (href === undefined)
			return;

		if (href.indexOf("hostname=") === -1) {
			href += "&hostname=" + get_shikimori_hosting();
		}

		var handler = function(evt) {
			if (!window.event.ctrlKey) {
				if (history && history.pushState) {
					evt.preventDefault();

					//Change to new page with hash
					var newPage = window.location.href + "#" + href;
					window.location.href = newPage;

					//Remove hash from URL and replace with desired URL
					history.pushState(historyState, evt.target.innerHTML, href)
				}

				return rerender(href);
			}
		}

		if (href.indexOf("index.html") >= 0)
			$(this).click(handler);
	})

	is_watched_button_disabled(function(status) {
		set_watched_button_disabled(status, false);
	});

	$(".video_link").each(function(index) {
		$(this).click(do_nothing);
	})
	$(".b-video_variant").each(async function(index) {
		var handler = async function() {
			return await update_src($(this).attr("video_url"), $(this).attr("id"));
		}
		$(this).click(handler);
	})
	$(".video-variant-switcher").each(function(index) {
		var handler = function() {
			return set_active_group($(this));
		}
		$(this).click(handler);
	})

	watched_button_handler = function(ev) {
		var anime_id = getUrlParameter(window.location.href, 'anime_id');
		var episode = parseInt(getUrlParameter(window.location.href, 'episode'));

		// Dirty HACK to prevent triggering handler twice
		//console.log("ev.timeStamp = " + ev.timeStamp + " lastClick=" + lastClick);
		if (ev.timeStamp == lastClick) {
			//console.log("stopPropagation");
			return;
		}
		lastClick = ev.timeStamp;
		ev.stopPropagation();
		//console.log("click");
		// END HACK

		var historyState = {};

		get_or_set_user_rate(anime_id, true, function(rates) {
			if (!rates || rates.length == 0) {
				console.log("error retrieving user rates");
				return;
			}

			var rate = rates[0];
			rate.episodes = episode;

			console.log("send_message_to_tab");

			send_message_to_tab(
				"updateWatched", {
					"rate": rate
				},
				function() {
					invalidate_user_rates(anime_id);
					var href = chrome.runtime.getURL("index.html") + "?anime_id=" +
							anime_id + "&episode=" + (episode + 1) +
							"&hostname=" + get_shikimori_hosting();

					setTimeout(function() {
						if (history && history.pushState) {
							//Change to new page with hash
							var newPage = window.location.href + "#" + href;
							window.location.href = newPage;
							//Remove hash from URL and replace with desired URL
							history.pushState(historyState, ev.target.innerHTML, href)
						}

						rerender(href);
					}, 1000);
				},
				function(failureReason) {
					console.log("couldn't find a satisfying tab to send message to :(");
					set_watched_button_disabled(true, failureReason);
				}
			);
			set_watched_button_disabled(true, false);
		});
	};

	$("#watched").click(watched_button_handler);
}

function rerender(href) {
	var anime_id = getUrlParameter(href, 'anime_id');
	var episode = getUrlParameter(href, 'episode');

	onLocalSessionStore();

	render(anime_id, episode);
}

$(document).ready(function() {
	if ((window.location.href.indexOf("index.html") >= 0) &&
		(window.location.href.indexOf("?") >= 0) &&
		(window.location.href.indexOf("&") >= 0))
		rerender(window.location.href);
});

function set_active_group(el) {
	var anime_id = getUrlParameter(window.location.href, 'anime_id');
	console.log(el.data("kind"));

	update_storage_item(anime_id, {
		"kind": el.data("kind")
	});
	$(".video-variant-switcher").each(function(index) {
		$(this).removeClass("active");
	});
	$(".video-variant-group").each(function(index) {
		$(this).removeClass("active");
		if ($(this).attr("kind") == el.attr("data-kind"))
			$(this).addClass("active");
	});
	el.addClass("active");
}

function is_src_internal(url) {
	if (url.startsWith("https://www.anilibria.tv"))
		return true;

	return false;
}

function get_internal_src(url) {
	if (url.startsWith("https://www.anilibria.tv"))
		return chrome.runtime.getURL("players/anilibria/index.html") + "#/?url=" + url;
}

async function update_src(url, active_id) {
	if (active_id === undefined)
		return;

	if (is_src_internal(url))
		url = get_internal_src(url);

	var anime_id = getUrlParameter(window.location.href, 'anime_id');
	var episode = getUrlParameter(window.location.href, 'episode');

	var item = {};
	item["hosting"] = $("#video_hosting_" + active_id).text();
	item["author"] = $("#video_author_" + active_id).text();
	update_storage_item(anime_id, item);
	$("#direct_link").attr("href", url);
	var uploader = $("#video_uploader_" + active_id).val();
	$("#uploader").text(uploader);
	$("#uploader_img").attr("alt", uploader);

	document.getElementById("player").src = url;
	$(".b-video_variant").each(function(index) {
		$(this).removeClass("active");
	});
	console.log("set " + active_id + " active");
	document.getElementById(active_id).classList.add("active");
}

function update_storage_item(anime_id, item) {
	var id = "anime-" + anime_id;

	chrome.storage.sync.get([id], function(items) {
		if (chrome.runtime.error) {
			console.log("chrome runtime error");
			return;
		}

		if (items[id] === undefined) {
			items[id] = {};
		} else {
			items[id] = JSON.parse(items[id]);
		}

		//console.log("items[id]: " + JSON.stringify(items[id]));


		var new_val = {};
		for (const k of ["kind", "hosting", "author"]) {
			if (k in item) {
				new_val[k] = item[k];
			} else {
				new_val[k] = items[id][k];
			}
		}
		//console.log("new_val = " + JSON.stringify(new_val));

		var obj = {};
		obj[id] = JSON.stringify(new_val);

		chrome.storage.sync.set(obj, function(result) {
			console.log("set item = " + JSON.stringify(new_val));
		});

	});
}

function get_storage_item(anime_id, callback) {
	var id = "anime-" + anime_id;
	chrome.storage.sync.get([id], function(items) {
		if (chrome.runtime.error) {
			console.log("chrome runtime error");
			return;
		}

		if (!(id in items)) {
			callback({});
			return;
		}

		callback(JSON.parse(items[id]));

	});
}

async function get_anime_videos(anime_id, episode) {
	await getKeys();
	var anime_videos_body = await getData(HOST_URL + '/api/animes/' + anime_id + '/' + episode);

	if (!anime_videos_body || !g_key2 || !g_key) {
		console.log("either anime_videos or key2 couldn't been loaded");
		return;
	}

	var anime_videos;
	try {
		anime_videos = JSON.parse(XORCipher.decode(atob(g_key2), anime_videos_body));
	} catch (e) {
		console.dir(e);
		return;
	}

	for (kind of ["fandub", "raw", "subtitles"]) {
		for (var i = 0; i < anime_videos[kind].length; i++) {
			anime_videos[kind][i]["url"] = XORCipher.decode(atob(g_key), anime_videos[kind][i].url);
			anime_videos[kind][i]["video_hosting"] = anime_videos[kind][i]["url"].split("/")[2];
			if (is_src_internal(anime_videos[kind][i]["url"]))
				anime_videos[kind][i]["url"] = get_internal_src(anime_videos[kind][i]["url"]);
		}
	}

	try {
		anime_videos["active_video"].url = XORCipher.decode(atob(g_key), anime_videos["active_video"].url);
		if (is_src_internal(anime_videos["active_video"].url))
			anime_videos["active_video"].url = get_internal_src(anime_videos["active_video"].url);
	} catch (e) {
		console.dir(e);
		return;
	}

	return anime_videos;
}

async function get_anime_info(anime_id) {
	await getKeys();
	var anime_info_body = await getData(HOST_URL + '/animes/' + anime_id);


	if (!g_key2 || !anime_info_body || !g_key) {
		console.log("either anime_info or key2 couldn't been loaded");
		return;
	}

	try {
		return JSON.parse(XORCipher.decode(atob(g_key2), anime_info_body));
	} catch (e) {
		console.dir(e);
		return;
	}
}

async function get_render_kwargs(anime_id, episode) {
	var anime_videos = await get_anime_videos(anime_id, episode);
	if (!anime_videos) {
		console.log("!anime_videos");
		anime_videos = {};
	}

	var anime_info = await get_anime_info(anime_id);
	if (!anime_info) {
		console.log("!anime_info");
	}

	var render_kwargs = {
		'anime_id': anime_id,
		'episode': episode,
		'anime_info': anime_info,
		'anime_videos': anime_videos,
		'static': ''
	};

	return render_kwargs;
}

const DESIRED_VIDEO_AUTHOR_WEIGTH = 1.0;
const DESIRED_VIDEO_HOSTING_WEIGTH = 1.0;

const ELEMENTS_TO_RERENDER = ["video_player", "videos_list"];
var g_rendered_elements = [];

function render_element(id, render_kwargs) {
	if ((id in g_rendered_elements) && !(id in ELEMENTS_TO_RERENDER))
		return;

	$('#' + id).html(nunjucks.render(id + ".html", render_kwargs));
	g_rendered_elements.push(id);
}

var g_stats_rendered = false;

async function render_stats(anime_id) {
	if (g_stats_rendered)
		return;

	g_stats_rendered = true;

	console.log("stats");

	var rates_scores = await get_rates_scores_stats(anime_id);
	if (rates_scores) {
		var rates_score_max = rates_scores.reduce((a, b) => ({
			"value": Math.max(a["value"], b["value"])
		}))["value"];

		for (score of rates_scores) {
			score["title"] = score["value"];
			score["width"] = (score["value"] * 100 / rates_score_max).toFixed(2);
			if (score["width"] < 15)
				score["value"] = "";
		}
		render_element('rates_scores', {
			"rates_scores": rates_scores
		});
	}
}

var g_statuses_stats_rendered = false;

async function render_statuses_stats(anime_id) {
	if (g_statuses_stats_rendered)
		return;

	g_statuses_stats_rendered = true;

	console.log("statuses_stats");

	var rates_statuses_stats = await get_rates_statuses_stats(anime_id);
	if (rates_statuses_stats) {
		var rates_stat_max = rates_statuses_stats.reduce((a, b) => ({
			"value": Math.max(a["value"], b["value"])
		}))["value"];
		var rates_stat_total = rates_statuses_stats.reduce((a, b) => ({
			"value": a["value"] + b["value"]
		}))["value"];

		for (stat of rates_statuses_stats) {
			stat["title"] = stat["value"];
			stat["width"] = (stat["value"] * 100 / rates_stat_max).toFixed(2);
			if (stat["width"] < 15)
				stat["value"] = "";
		}
		render_element('rates_statuses', {
			"rates_statuses_stats": rates_statuses_stats,
			"rates_stat_total": rates_stat_total
		});
	}
}

function Video() {
	this.init = function() {
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');

		this.getVideo = function() {
			try {
				this.video = document.querySelector("iframe")
					.contentWindow.document.querySelector("video");
			} catch (e) {
				console.log(e);
			}
		}
	}

	this.saveFile = function(name, type, data) {
		if (data !== null && navigator.msSaveBlob)
			return navigator.msSaveBlob(new Blob([data], {
				type: type
			}), name);
		var a = $("<a style='display: none;'/>");
		var url = window.URL.createObjectURL(new Blob([data], {
			type: type
		}));
		a.attr("href", url);
		a.attr("download", name);
		$("body").append(a);
		a[0].click();
		window.URL.revokeObjectURL(url);
		a.remove();
	}

	this.currentTime = function() {
		var currentTime = this.video.currentTime;

		var hours = Math.floor(currentTime / 3600);
		currentTime %= 3600;
		var minutes = Math.floor(currentTime / 60);
		currentTime %= 60;
		var seconds = Math.floor(currentTime);
		currentTime %= 1;

		var millis = Math.floor(currentTime.toFixed(3) * 1000);

		return `${hours}-${minutes}-${seconds}.${millis}`;
	}

	this.capture = function(anime_name, episode) {
		this.getVideo();
		if (!this.video) {
			return;
		}

		var filename = "";
		if (anime_name)
			filename += `${anime_name} - `;

		if (episode)
			filename += `${episode} - `;

		filename += `${this.currentTime()}.jpg`;
		this.canvas.height = this.video.videoHeight;
		this.canvas.width = this.video.videoWidth;
		this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
		this.canvas.toBlob((blob) => this.saveFile(filename, "image/jpeg", blob), 'image/jpeg');
	}
}

try {
	g_video = new Video();
	g_video.init();
} catch (e) {
	console.log(e);
}

async function render(anime_id, episode) {
	var [anime_videos, anime_info] = await Promise.all([
		get_anime_videos(anime_id, episode),
		get_anime_info(anime_id)
	]);

	g_anime_name = anime_info["anime_english"];
	g_episode = episode;

	try {
		episode = parseInt(episode);
	} catch (e) {
		console.log(e);
		return await render(anime_id, 1);
	}

	if (episode > anime_info["duration"])
		return await render(anime_id, anime_info["duration"]);

	if (!episode || episode === 0) {
		return await render(anime_id, 1);
	}

	var render_kwargs = await get_render_kwargs(anime_id, episode);
	render_kwargs["hostname"] = get_shikimori_hosting();
	render_kwargs["player_page_url"] = chrome.runtime.getURL("index.html");

	render_element('menu_dropdown', render_kwargs);
	render_element('breadcrumbs', render_kwargs);

	try {
		var [shiki_genre_ru_name, shiki_main_genre_url] = await Promise.all([
			get_main_genre_ru_name(anime_id),
			get_main_genre_url(anime_id)
		]);
	} catch (e) {
		console.log(e);
		var shiki_genre_ru_name = "";
		var shiki_main_genre_url = "";
	}



	if (!anime_videos) {
		console.log("!anime_videos");
		return;
	}

	if (!anime_info) {
		console.log("!anime_info");
		return;
	}


	render_kwargs["shiki_main_genre_url"] = shiki_main_genre_url;
	render_kwargs["shiki_genre_ru_name"] = shiki_genre_ru_name;

	var active_kind = undefined;
	for (kind of ["fandub", "raw", "subtitles"]) {
		if (anime_videos[kind].length > 0 && active_kind === undefined)
			active_kind = kind;
	}

	if (active_kind !== undefined) {
		console.log("set active_kind = " + active_kind);
		anime_videos["active_video"].url = anime_videos[active_kind][0]["url"];
	}

	get_storage_item(anime_id, async function(result) {
		//console.dir(result);

		if ("kind" in result && result["kind"] in anime_videos) {
			var desired_video_idx = 0;
			var desired_video_score = 0.0;
			active_kind = result["kind"];
			if (anime_videos[active_kind].length == 0) {
				console.log("no videos found in the selected video kind, will try to find another one");

				for (const kind of ["fandub", "subtitles", "raw"]) {
					if (anime_videos[kind].length != 0) {
						active_kind = kind;
						break;
					}
				}
			}

			if (anime_videos[active_kind].length == 0) {
				console.log("no videos found, giving up");
				return;
			}

			console.log("override active_kind = " + active_kind);

			if (("author" in result) && ("hosting" in result)) {
				var idx = 0;
				for (const video of anime_videos[active_kind]) {
					var current_video_score = 0.0;

					if (video["author"] === result["author"]) {
						current_video_score += DESIRED_VIDEO_AUTHOR_WEIGTH;
						console.log(`author result ${result["author"]}`);
					}

					if (video["hosting"] === result["hosting"]) {
						current_video_score += DESIRED_VIDEO_HOSTING_WEIGTH;
						console.log(`hosting result ${result["hosting"]}`);
					}

					if (current_video_score > desired_video_score) {
						desired_video_idx = idx;
						desired_video_score = current_video_score;
					}

					idx++;
				}

				console.log("found matching video variant idx = " + desired_video_idx);
			}

			console.log(anime_videos[active_kind][desired_video_idx]["url"]);

			anime_videos["active_kind"] = active_kind;

			for (k in anime_videos[active_kind][desired_video_idx])
				anime_videos["active_video"][k] = anime_videos[active_kind][desired_video_idx][k];

			if (anime_videos["fandub"].length > 0)
				anime_videos["fandub"][0]["active"] = "";

			anime_videos[active_kind][desired_video_idx]["active"] = " active";
			render_kwargs["anime_videos"] = anime_videos;
		}

		update_storage_item(anime_id, {
			"kind": active_kind
		});

		render_element('video_switcher', render_kwargs);
		render_element('episodes_list', render_kwargs);
		render_element('videos_list', render_kwargs);
		render_element('video_player', render_kwargs);

		// must be set after rendering video_player
		set_player_controls_callbacks();

		get_or_set_user(function(user) {
			if (!user)
				return;

			var user_kwargs = {
				'user_login': user["nickname"],
				'user_avatar_src': user["image"]["x48"],
				'user_avatar_srcset': user["image"]["x80"]
			}

			var hosting = get_shikimori_hosting();
			user_kwargs["hostname"] = hosting;
			$("#mail_url").attr("href", `https://${hosting}/${user["nickname"]}/messages/news`);
			render_element('user_profile', user_kwargs);
		});

		render_element('breadcrumbs', render_kwargs);
		render_element('title', render_kwargs);
		render_element('menu_logo', render_kwargs);

		render_stats(anime_id);

		render_statuses_stats(anime_id);
	});
}
