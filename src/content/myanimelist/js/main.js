(function () {
  function get(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        callback(xhr.responseText);
      }
    };
    xhr.send();
  }

  var g_button_added = false;
  var g_style_added = false;

  var mainObserver = new MutationObserver(start);
  var observerConfig = {
    attributes: true,
    subtree: true,
    childList: true,
  };

  function inject_style(callback) {
    if (g_style_added) return callback();

    var injected_style = document.createElement("style");
    injected_style.id = "watchbutton_style";
    if (document.querySelector("#watchbutton_style")) {
      return callback();
    }

    get(
      chrome.runtime.getURL("/content/myanimelist/css/injected.css"),
      function (response_style) {
        injected_style.innerHTML = response_style;
        document.head.appendChild(injected_style);
        g_style_added = true;
        callback();
      }
    );
  }

  function inject_button(infoSection, loc) {
    if (g_button_added) return;
    var WatchButtonElement = document.createElement("a");

    WatchButtonElement.innerHTML =
      '<a id="_watchButton" target="_blank" href="#" class="btn-user-watch-button" style="margin-left: 10px">Watch online</a>';

    document.querySelectorAll(".btn-affiliate").forEach(function (element) {
      element.remove();
    });
    infoSection.appendChild(WatchButtonElement);
    watchLink = WatchButtonElement.querySelector("#_watchButton");
    watchLink.href = loc;

    g_button_added = true;
    mainObserver.disconnect();
  }

  function start() {
    var infoSection = document.querySelector(".user-status-block");

    var watchLink = document.querySelector("#_watchButton");

    if (infoSection === null || watchLink !== null) return;

    //console.log("found infoSection");

    var anime_id = location.pathname.split("/")[2].replace(/\D/g, "");
    var episode_num = 1;
    if (g_button_added) return;

    var loc =
      chrome.runtime.getURL("index.html") +
      "?anime_id=" +
      anime_id +
      "&episode=" +
      episode_num;

    if (!document.querySelector("#_watchButton")) {
      inject_style(function () {
        inject_button(infoSection, loc);
      });
    }
  }

  function add_button() {
    if (window.location.href.indexOf("myanimelist.net/anime/") === -1) {
      return;
    }

    mainObserver.observe(document, observerConfig);

    start();
  }

  add_button();
})();
