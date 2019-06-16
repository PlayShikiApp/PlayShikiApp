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
			} catch(e) {
				callback(null);
			}
		});
	} else {
		callback(JSON.parse(user));
	}
}

function get_user_rates(anime_id, callback) {
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
			$.get("https://shikimori.one/api/v2/user_rates?user_id=" + user.id + 
					  "&target_id=" + anime_id + "&target_type=Anime", function(data) {
				rates = JSON.stringify(data);
				console.log("set rates: " + rates);
				window.localStorage.setItem(rate_ident, rates);
				try {
					callback(JSON.parse(rates));
				} catch (e) {
					callback(null);
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

	get_user_rates(anime_id, function(rates) {
		if (rates === null) {
			console.log("error retrieving user rates");
			return;
		}

 		console.dir(rates);
		console.log("rates[0].episodes = " + rates[0].episodes + " episode=" + episode)

		if (parseInt(rates[0].episodes) >= parseInt(episode)) {
			//set_watched_button_disabled();
			watched_button_disabled = true;
		}

		callback(watched_button_disabled);
	});
};
var watched_button_handler;

function set_watched_button_disabled(status) {
	if (status) {
		$("#watched").addClass("b-ajax");
		$("#watched").addClass("disabled");
		$("#watched").click(function(){});
	} else {
		$("#watched").removeClass("b-ajax");
		$("#watched").removeClass("disabled");
		$("#watched").click(watched_button_handler);
	}
	
}

function onLocalSessionStore() {
	is_watched_button_disabled(function(status) { 
		console.log("watch button is " + status ? "disabled" : "enabled");
	});
}

function do_nothing() {
    console.log("click");
}

function rerender(href) {
    var anime_id = getUrlParameter(href, 'anime_id');
    var episode = getUrlParameter(href, 'episode');

    onLocalSessionStore();

    render(function() {
        console.log("ready");
	is_watched_button_disabled(function(status) {
		set_watched_button_disabled(status);
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

	watched_button_handler = function() { 
		chrome.tabs.query({}, function(tabs) {
			var foundTab = undefined;
			for (var i = 0; i < tabs.length; ++i) {
				//console.log(tabs[i].url);
				if (tabs[i].url.indexOf("shikimori.org") > 0 || tabs[i].url.indexOf("shikimori.one") > 0) {
					console.log("found tab with url=" + tabs[i].url);
					foundTab = tabs[i];
					break;
				}
			}

			var anime_id = getUrlParameter(window.location.href, 'anime_id');
			var episode = parseInt(getUrlParameter(window.location.href, 'episode'));

			if (foundTab !== undefined) {
				get_user_rates(anime_id, function(rates) {
					if (rates === null || rates.length == 0) {
						console.log("error retrieving user rates, rates = " + rates);
						return;
					}

					var rate = rates[0];
					rate.episodes = episode;

					try {
				                chrome.tabs.sendMessage(foundTab.id, {method: "incrementRate", "rate": rate}, function(response) {
							console.dir(response);
						});
						invalidate_user_rates(anime_id);
					} catch (e) {
						console.dir(e);
					}

					set_watched_button_disabled(true);
					setTimeout(function() {
						window.location.href = "#/?anime_id=" + anime_id + "&episode=" + (episode + 1);
						rerender(window.location.href);
					}, 1000);

				});
			} else {
				console.log("couldn't find a satisfying tab to send message to :(");
			}
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

	update_storage_value(anime_id, "kind", el.data("kind"));
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

function link_id_to_db(id) {
	id = Number("id".split("_")[1])

	return id;
}

function update_src(url, active_id) {
    if (active_id === undefined)
	return;

    var anime_id = getUrlParameter(window.location.href, 'anime_id');

    innerElements = $($("#" + active_id).children()[0]).children();
    console.dir(innerElements);
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


function xor(arr1, arr2) {
	var res = new Int32Array(arr1.length);
	for (var i = 0; i < arr1.length; i++) {
		res[i] = (arr1[i] ^ arr2[i]);
	}

	return res;
}

function bufferToString(arr){
	var str = "";
	for (i in arr){
		str+=String.fromCharCode(arr[i]);
	}
	return str;
}

function decode(body, key) {
	if (body === undefined)
		return "";

	console.dir(body);

	var buff = btoa(body)
	//console.dir(buff);
	//console.dir(key);
	var r = xor(buff, key);

	return bufferToString(r);
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

function render(callback, anime_id, episode) {
$.get('http://playshikiapp.tk:8101/static/keys/key', function(key, key_textStatus, key_jqXHR) {
  $.get('http://playshikiapp.tk:8101/static/keys/key2', function(key2, key2_textStatus, key2_jqXHR) {
    $.get('http://playshikiapp.tk:8101/api/animes/' + anime_id + '/' + episode, function(anime_videos_body, anime_videos_textStatus, anime_videos_jqXHR) {
        $.get('http://playshikiapp.tk:8101/animes/' + anime_id, function(anime_info_body, anime_info_textStatus, anime_info_jqXHR) {
	     var anime_videos = JSON.parse(XORCipher.decode(atob(key2), anime_videos_body));

             var active_kind = undefined;
	     for (kind of ["fandub", "raw", "subtitles"]) {
                if (anime_videos[kind].length > 0 && active_kind === undefined)
                    active_kind = kind;

		for (var i = 0; i < anime_videos[kind].length; i++) {
			anime_videos[kind][i]["url"] = XORCipher.decode(atob(key), anime_videos[kind][i].url);
			anime_videos[kind][i]["video_hosting"] = anime_videos[kind][i]["url"].split("/")[2];
		}
	     }

             anime_videos["active_video"].url = XORCipher.decode(atob(key), anime_videos["active_video"].url);

             if (active_kind !== undefined) {
                     console.log("set active_kind = " + active_kind);
		     anime_videos["active_video"].url = anime_videos[active_kind][0]["url"];
             }

             get_storage_item(anime_id, function(result) {
                    console.dir(result);

                    if ("kind" in result && result["kind"] in anime_videos) {
                         var desired_video_idx = 0;
			 active_kind = result["kind"];
                         console.log("override active_kind = " + active_kind);

			 if (("author" in result) && ("hosting" in result)) {
				 var idx = 0;
				 for (const video of anime_videos[active_kind]) {
				      if (video["author"] === result["author"])
				          desired_video_idx = idx;

				      if (video["hosting"] === result["hosting"]) {
				          break;
				      }
				      idx++;
				 }

			         console.log("found matching video variant idx = " + desired_video_idx);
			 }

	                 console.log(anime_videos[active_kind][desired_video_idx]["url"]);

			 anime_videos["active_kind"] = active_kind;

			 for (k in anime_videos[active_kind][desired_video_idx])
                      	   anime_videos["active_video"][k] = anime_videos[active_kind][desired_video_idx][k];

			 anime_videos["fandub"][0]["active"] = "";
			 anime_videos[result["kind"]][desired_video_idx]["active"] = " active";
	            }

                    update_storage_item(anime_id, {"kind": active_kind});

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
        });
    });
  });
});
}
