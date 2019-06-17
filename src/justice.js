chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

	if (request.method === "updateWatched") {
		console.log("updateWatched");
		var rate = request.rate;
		var matches = location.href.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);

		$.get(matches[0] + "user_rates/" + rate.id + "/edit", function(rateData) {
			if (!rateData) {
				console.log("couldn't retrieve user_rate edit form");
				return;
			}

			const userRatesForm = $(rateData);
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
					console.log("posted increment user_rates");
					console.dir(data);
				},
				dataType: "json"
			});
		});
	}

        if (request.method === "addButton") {
            if (window.location.href.indexOf('shikimori.org/animes/') !== -1 ||
               window.location.href.indexOf('shikimori.one/animes/') !== -1) {
                setTimeout(function () {
                    let s = document.createElement('script');
                    s.src = chrome.extension.getURL('/static/js/injected.js');
                    document.head.appendChild(s);

                    s.onload = function(){
                        let evt=document.createEvent("CustomEvent");
                        evt.initCustomEvent("yourCustomEvent", true, true, chrome.runtime.getURL("../index.html"));
                        document.dispatchEvent(evt);
                    };
                }, 200);
            }
        }

	sendResponse({ok: "ok"});
});

