function do_nothing() {
    console.log("click");
}

function rerender(href) {
    var anime_id = getUrlParameter(href, 'anime_id');
    var episode = getUrlParameter(href, 'episode');

    render(function() {
        console.log("ready");
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
        if (innerElements[1].className === "video-hosting")
             update_storage_value(anime_id, "hosting", innerElements[1].innerText);

        if (innerElements[2].className === "video-author")
             update_storage_value(anime_id, "author", innerElements[2].innerText);
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

function update_storage_value(anime_id, key, value) {
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
		new_val["kind"] = items[id]["kind"];
		new_val["hosting"] = items[id]["hosting"];
		new_val["author"] = items[id]["author"];

		new_val[key] = value;
		//console.log("new_val = " + JSON.stringify(new_val));

		var obj = {};
		obj[id] = JSON.stringify(new_val);

		chrome.storage.sync.set(obj, function(result) {
			console.log("set key=" + key + " for anime_id=" + id + ", value=" + value);
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

                    update_storage_value(anime_id, "kind", active_kind);

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
