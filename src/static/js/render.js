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

function update_src(url, active_id) {
    if (active_id === undefined)
	return;

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

function render(callback, anime_id, episode) {
    $.get('http://playshikiapp.tk:8101/api/animes/' + anime_id + '/' + episode, function(anime_videos_body, anime_videos_textStatus, anime_videos_jqXHR) {
        $.get('http://playshikiapp.tk:8101/animes/' + anime_id, function(anime_info_body, anime_info_textStatus, anime_info_jqXHR) {
	     var anime_videos = JSON.parse(XORCipher.decode(atob(key2), anime_videos_body));
	     for (kind of ["fandub", "raw", "subtitles"]) {
		for (var i = 0; i < anime_videos[kind].length; i++) {
			anime_videos[kind][i]["url"] = XORCipher.decode(atob(key), anime_videos[kind][i].url);
			anime_videos[kind][i]["video_hosting"] = anime_videos[kind][i]["url"].split("/")[2];
		}
	     }
	     anime_videos["active_video"].url = XORCipher.decode(atob(key), anime_videos["active_video"].url);

            var render_kwargs = {
                'anime_id': anime_id,
                'episode': episode,
                'anime_info': JSON.parse(XORCipher.decode(atob(key2), anime_info_body)),
                'anime_videos': anime_videos,
                'static': ''
            };

            $('#title').html(nunjucks.render("title.html", render_kwargs));
            $('#videos_list').html(nunjucks.render('videos_list.html', render_kwargs));
            $('#episodes_list').html(nunjucks.render('episodes_list.html', render_kwargs));
            $('#breadcrumbs').html(nunjucks.render('breadcrumbs.html', render_kwargs));
            $('#video_player').html(nunjucks.render('video_player.html', render_kwargs));
            $('#menu_logo').html(nunjucks.render('menu_logo.html', render_kwargs));
            callback();
            //$('#update_src_script').html(nunjucks.render('script_video_src.html', render_kwargs));

        });
    });
}
