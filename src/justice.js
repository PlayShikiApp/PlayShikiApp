chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
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

		sendResponse({ok: "ok"});
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

		sendResponse({ok: "ok"});

	} else if (request.method === "addButton") {
            if (window.location.href.indexOf('shikimori.org/animes/') !== -1 ||
               window.location.href.indexOf('shikimori.one/animes/') !== -1) {
                setTimeout(function () {
                    var injected = document.createElement('script');
                    var main_page_url = chrome.runtime.getURL("../index.html");
                    injected.text = `var main_page_url = "${main_page_url}";`;

                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', chrome.extension.getURL('/static/js/injected.js'), true);
                    xhr.onreadystatechange = function()
                    {
                        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
                        {
                              injected.text += xhr.responseText;
                              document.head.appendChild(injected);
                        }
                    };
                    xhr.send();

                    injected.onload = function(){
                        var evt=document.createEvent("CustomEvent");
                        evt.initCustomEvent("yourCustomEvent", true, true, chrome.runtime.getURL("../index.html"));
                        document.dispatchEvent(evt);
                    };
                }, 200);
            }

            sendResponse({ok: "ok"});
        }

	sendResponse({ok: "ok"});
});

