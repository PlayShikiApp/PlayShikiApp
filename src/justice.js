chrome.runtime.onMessage.addListener(function (message) {

        if (message.method === "addButton") {
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
    }
);

