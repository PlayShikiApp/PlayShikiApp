//require("../../jquery-3.4.1.min.js");

const HOST = "https://gist.github.com/Chronomonochrome/aad42e8ae1fea9c7ad570bdd2b090cfa/raw/"

var g_key;
var g_key2;

var HOST_URL = null;

var g_data = {};

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

async function get_shiki_anime_info(id) {
	if (anime_info[id])
		return anime_info[id];

	anime_info[id] = await $.get(`https://shikimori.org/api/animes/${id}`);
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
	return `https://shikimori.one/animes/genre/${genre_id}-${genre_en}`;
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

	return query[1].split(sParam + "=")[1].split("&")[0]
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

    if (user === null || !IsJsonString(user)) {
        $.get("https://shikimori.one/api/users/whoami", function(data) {
            user = JSON.stringify(data);
            window.localStorage.setItem('user', user);
            try {
                callback(JSON.parse(user));
            } catch (e) {
                callback(null);
            }
        });
    } else {
        callback(JSON.parse(user));
    }
}

function get_user_rate(anime_id, user_id, callback) {
    $.get("https://shikimori.one/api/v2/user_rates?user_id=" + user_id +
        "&target_id=" + anime_id + "&target_type=Anime", function(data) {
            rates = [];
            try {
                rates = JSON.stringify(data);
            } catch (e) {
                console.dir(e);
            }

            callback(rates);
     });
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
				"createRate",
                 		{
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
				function() {
	                    		console.log("couldn't find a satisfying tab to send message to :(");
	                    		set_watched_button_disabled(true, "no_more_tabs");
				});
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
    if (tooltip == "no_more_tabs") {
        var msg = '<span>Упс! Для работы кнопки необходимо, чтобы была открыта хотя бы одна вкладка с сайтом <a target="_blank" id="shiki" href="https://shikimori.one">Шикимори</a>. Кликните по ссылке выше, чтобы скрыть это сообщение.</span>';
    } else if (tooltip == "no_alive_tabs") {
        var msg = '<span>Упс! Для работы кнопки необходимо, чтобы была открыта хотя бы одна вкладка с сайтом <a target="_blank" id="shiki" href="https://shikimori.one">Шикимори</a>. Похоже, что уже открытые вкладки не работают. Кликните по ссылке выше, чтобы скрыть это сообщение.</span>';
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

function send_message_to_tab(method, options, onSuccess, onFailure, onResponse) {
    chrome.tabs.query({}, function(tabs) {
	//console.dir(tabs);
	var foundTab = false;
        for (var i = 0; i < tabs.length; ++i) {
	    //console.log(tabs[i].url);
            if (tabs[i].url.indexOf("shikimori.org") < 0 &&
                tabs[i].url.indexOf("shikimori.one") < 0)
                continue;
            try {
                chrome.tabs.sendMessage(tabs[i].id, {
                    method: method,
                    options: options
                }, function(response) {
		    if (onResponse)
	                    onResponse(response);
                });

		foundTab = true;
                onSuccess();

                break;
            } catch (e) {
                console.dir(e);
                continue;
            }
        }

	if (!foundTab)
		onFailure();
    });
}

var lastClick = 0;

function rerender(href) {
    var anime_id = getUrlParameter(href, 'anime_id');
    var episode = getUrlParameter(href, 'episode');

    onLocalSessionStore();

    render(function() {
            console.log("ready");
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

                get_or_set_user_rate(anime_id, true, function(rates) {
                    if (!rates || rates.length == 0) {
                        console.log("error retrieving user rates");
			return;
                    }

                    var rate = rates[0];
                    rate.episodes = episode;

		    console.log("send_message_to_tab");

		    send_message_to_tab(
			"updateWatched",
                 	{"rate": rate},
                        function() {
                            invalidate_user_rates(anime_id);
                        },
			function() {
	                    console.log("couldn't find a satisfying tab to send message to :(");
	                    set_watched_button_disabled(true, "no_more_tabs");
			}
                    );
		    set_watched_button_disabled(true, false);
                    setTimeout(function() {
                        window.location.href = "#/?anime_id=" + anime_id + "&episode=" + (episode + 1);
                        rerender(window.location.href);
                    }, 1000);
                });
            };

        $("#watched").click(watched_button_handler);
    }, anime_id, episode);
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

    update_storage_item(anime_id, {"kind": el.data("kind")});
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

    innerElements = $($("#" + active_id).children()[0]).children();
    //console.dir(innerElements);
    if (innerElements.length == 3) {
        var item = {};
        if (innerElements[1].className === "video-hosting")
            item["hosting"] = innerElements[1].innerText;

        if (innerElements[2].className === "video-author")
            item["author"] = innerElements[2].innerText;

        update_storage_item(anime_id, item);
    }

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
        return;
    }

    var anime_info = await get_anime_info(anime_id);
    if (!anime_info) {
        console.log("!anime_info");
        return;
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

async function render(callback, anime_id, episode) {
    await getKeys();
    var anime_videos = await get_anime_videos(anime_id, episode);
    if (!anime_videos) {
        console.log("!anime_videos");
        return;
    }
    var anime_info = await get_anime_info(anime_id);
    if (!anime_info) {
        console.log("!anime_info");
        return;
    }

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

                    if (video["author"] === result["author"])
                        current_video_score += DESIRED_VIDEO_AUTHOR_WEIGTH;

                    if (video["hosting"] === result["hosting"])
                        current_video_score += DESIRED_VIDEO_HOSTING_WEIGTH;

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
        }

        update_storage_item(anime_id, {
            "kind": active_kind
        });

	get_or_set_user(function(user) {
		var user_kwargs = {
			'user_login': user["nickname"],
			'user_avatar_src': user["image"]["x48"],
			'user_avatar_srcset': user["image"]["x80"]
		}

		$('#user_profile').html(nunjucks.render('user_profile.html', user_kwargs));
	});


        $('#breadcrumbs').html(nunjucks.render('breadcrumbs.html', render_kwargs));
	var rates_scores = await get_rates_scores_stats(anime_id);
	if (rates_scores) {
	     var rates_score_max = rates_scores.reduce((a, b) => ({"value": Math.max(a["value"], b["value"])}))["value"];

	     for (score of rates_scores) {
                 score["title"] = score["value"];
                 score["width"] = (score["value"] * 100 / rates_score_max).toFixed(2);
                 if (score["width"] < 15)
                     score["value"] = "";
             }
	     $('#rates_scores').html(nunjucks.render('rates_scores.html', {"rates_scores": rates_scores}));
	}

        var render_kwargs = await get_render_kwargs(anime_id, episode);

        $('#title').html(nunjucks.render("title.html", render_kwargs));
        $('#video_switcher').html(nunjucks.render('video_switcher.html', render_kwargs));
        $('#videos_list').html(nunjucks.render('videos_list.html', render_kwargs));
        $('#episodes_list').html(nunjucks.render('episodes_list.html', render_kwargs));
        $('#video_player').html(nunjucks.render('video_player.html', render_kwargs));
        $('#menu_logo').html(nunjucks.render('menu_logo.html', render_kwargs));
	callback();

	const shiki_main_genre_url = await get_main_genre_url(anime_id);
	const shiki_genre_ru_name = await get_main_genre_ru_name(anime_id);
	render_kwargs["shiki_main_genre_url"] = shiki_main_genre_url;
	render_kwargs["shiki_genre_ru_name"] = shiki_genre_ru_name;

        var rates_statuses_stats = await get_rates_statuses_stats(anime_id);
        if (rates_statuses_stats) {
             var rates_stat_max = rates_statuses_stats.reduce((a, b) => ({"value": Math.max(a["value"], b["value"])}))["value"];
             var rates_stat_total = rates_statuses_stats.reduce((a, b) => ({"value": a["value"] + b["value"]}))["value"];

	     for (stat of rates_statuses_stats) {
                 stat["title"] = stat["value"];
                 stat["width"] = (stat["value"] * 100 / rates_stat_max).toFixed(2);
                 if (stat["width"] < 15)
                     stat["value"] = "";
             }
	     $('#rates_statuses').html(nunjucks.render('rates_statuses.html', {
                                   "rates_statuses_stats": rates_statuses_stats,
                                   "rates_stat_total": rates_stat_total
             }));
        }
    });
}
