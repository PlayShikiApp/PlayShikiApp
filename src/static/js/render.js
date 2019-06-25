//require("../../jquery-3.4.1.min.js");

const HOST = "https://gist.github.com/Chronomonochrome/aad42e8ae1fea9c7ad570bdd2b090cfa/raw/"

var key;
var key2;

var HOST_URL = null;

function getData(ajaxurl) { 
  return $.ajax({
    url: ajaxurl,
    type: 'GET',
  });
};

async function getHost() {
	if (HOST_URL !== null)
		return;

	HOST_URL = await $.ajax(HOST);
}

async function getKeys() {
	await getHost();
	key = await getData(HOST_URL + "/static/keys/key");
	key2 = await getData(HOST_URL + "/static/keys/key2");
}

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
            $(".b-video_variant").each(function(index) {
                var handler = function() {
                    return update_src($(this).attr("video_url"), $(this).attr("id"));
                }
                $(this).click(handler);
            })
            $(".video-variant-switcher").each(function(index) {
                var handler = function() {
                    return set_active_group($(this));
                }
                $(this).click(handler);
            })
            $("a").each(function(index) {
                var href = $(this).attr("href");
                if (href === undefined)
                    return;

                var handler = function() {
                    return rerender(href);
                }

                if (href.indexOf("index.html") >= 0)
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

function update_src(url, active_id) {
    if (active_id === undefined)
        return;

    if (is_src_internal(url))
        url = get_internal_src(url);

    var anime_id = getUrlParameter(window.location.href, 'anime_id');

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

    document.getElementById('player').src = url;
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

const DESIRED_VIDEO_AUTHOR_WEIGTH = 1.0;
const DESIRED_VIDEO_HOSTING_WEIGTH = 1.0;

async function render(callback, anime_id, episode) {
    await getKeys();
    var anime_videos_body = await getData(HOST_URL + '/api/animes/' + anime_id + '/' + episode);
    var anime_info_body = await getData(HOST_URL + '/animes/' + anime_id);

    if (!anime_videos_body || !key2 || !anime_info_body || !key) {
        console.log("either anime_videos or key2 couldn't been loaded");
        return;
    }
    try {
        var anime_videos = JSON.parse(XORCipher.decode(atob(key2), anime_videos_body));
    } catch (e) {
        console.dir(e);
        return;
    }

    var active_kind = undefined;
    for (kind of ["fandub", "raw", "subtitles"]) {
        if (anime_videos[kind].length > 0 && active_kind === undefined)
            active_kind = kind;

        for (var i = 0; i < anime_videos[kind].length; i++) {
            anime_videos[kind][i]["url"] = XORCipher.decode(atob(key), anime_videos[kind][i].url);
            if (is_src_internal(anime_videos[kind][i]["url"]))
                anime_videos[kind][i]["url"] = get_internal_src(anime_videos[kind][i]["url"]);
            anime_videos[kind][i]["video_hosting"] = anime_videos[kind][i]["url"].split("/")[2];
        }
    }

    try {
        anime_videos["active_video"].url = XORCipher.decode(atob(key), anime_videos["active_video"].url);
        if (is_src_internal(anime_videos["active_video"].url))
            anime_videos["active_video"].url = get_internal_src(anime_videos["active_video"].url);
    } catch (e) {
        console.dir(e);
        return;
    }

    if (active_kind !== undefined) {
        console.log("set active_kind = " + active_kind);
        anime_videos["active_video"].url = anime_videos[active_kind][0]["url"];
    }

    get_storage_item(anime_id, function(result) {
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

        var render_kwargs = {
            'anime_id': anime_id,
            'episode': episode,
            'anime_info': JSON.parse(XORCipher.decode(atob(key2), anime_info_body)),
            'anime_videos': anime_videos,
            'static': ''
        };

        console.dir(render_kwargs);

        $('#title').html(nunjucks.render("title.html", render_kwargs));
        $('#video_switcher').html(nunjucks.render('video_switcher.html', render_kwargs));
        $('#videos_list').html(nunjucks.render('videos_list.html', render_kwargs));
        $('#episodes_list').html(nunjucks.render('episodes_list.html', render_kwargs));
        $('#breadcrumbs').html(nunjucks.render('breadcrumbs.html', render_kwargs));
        $('#video_player').html(nunjucks.render('video_player.html', render_kwargs));
        $('#menu_logo').html(nunjucks.render('menu_logo.html', render_kwargs));
        callback();
    });
}
