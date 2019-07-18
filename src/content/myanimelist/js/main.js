var g_injected = false;

function get(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            callback(xhr.responseText);
        }
    };
    xhr.send();
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.method === "addButton") {
		/* nothing */
        }

	sendResponse({ok: "ok"});
});

function add_button() {
	if (g_injected)
		return;

            if (window.location.href.indexOf('myanimelist.net/anime/') !== -1) {
				g_injected = true;
                setTimeout(function () {
                    var injected_script = document.createElement('script');
                    var injected_style = document.createElement('style');
                    var main_page_url = chrome.runtime.getURL("../index.html");
                    injected_script.text = 'var main_page_url = "' + main_page_url + '";';

		    get(chrome.runtime.getURL('/content/myanimelist/css/injected.css'), function(response_style) {
                        injected_style.innerHTML = response_style;
                        document.head.appendChild(injected_style);

                        get(chrome.runtime.getURL('/content/myanimelist/js/injected.js'), function(response_script) {
                            injected_script.text += response_script;
                            document.head.appendChild(injected_script);
                        });
                    });

                    injected_script.onload = function(){
                        var evt=document.createEvent("CustomEvent");
                        evt.initCustomEvent("yourCustomEvent", true, true, chrome.runtime.getURL("../index.html"));
                        document.dispatchEvent(evt);
                    };
                }, 0);
            }
}
