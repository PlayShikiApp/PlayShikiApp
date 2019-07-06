(function(){

var mainObserver = new MutationObserver(start);
var observerConfig = { attributes: true, subtree: true, childList: true };
mainObserver.observe(document, observerConfig);

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

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

var g_user_rates;
var g_button_added = false;
var g_callback_started = false;

function get_user_rates(anime_id, callback) {
    if (g_user_rates)
        return callback(g_user_rates);

    get("https://" + location.hostname + "/api/users/whoami", function(data) {
        var user = JSON.parse(data);
        get("https://" + location.hostname + "/api/v2/user_rates?user_id=" + user.id +
                    "&target_id=" + anime_id + "&target_type=Anime", function(data1) {
            if (IsJsonString(data1)) {
                var rates = JSON.parse(data1);
                g_user_rates = rates;
                callback(rates);
            }
        });
    });
}

function start() {
  var infoSection = document.querySelector('body#animes_show .c-info-right');
  var placeHolder = document.querySelector(".watch-online-placeholer");
  var desc = document.querySelector(".c-description");

  var watchLink = document.querySelector('#watchButton');

  if (infoSection === null || placeHolder === null || desc === null || watchLink !== null)
    return;

  var anime_id = location.pathname.split("-")[0].split("/")[2].replace(/\D/g, "");
  var episode_num = 1;
  if (g_callback_started)
     return;

  return get_user_rates(anime_id, function(rates) {
       g_callback_started = true;
       if (g_button_added)
             return;

       //console.log(rates);
       if (rates && rates.length > 0 && (rates[0]["status"] === "watching" || rates[0]["status"] === "rewatching")) {
             episode_num = rates[0].episodes + 1;
       }
       var loc = main_page_url + "#/?anime_id="+ anime_id + "&episode=" + episode_num;

       if (!document.querySelector('#_watchButton')) {
           var WatchButtonElement = document.createElement('div');
           WatchButtonElement.classList.add('block');

           WatchButtonElement.innerHTML = '<div class="subheadline m10" style="margin-top: 10px;">Онлайн просмотр</div><a class="b-link_button dark watch-online" target="_blank" id="_watchButton" href="#" style="margin-top: 10px;">Смотреть онлайн</a>';

           infoSection.appendChild(WatchButtonElement);
           watchLink = WatchButtonElement.querySelector('#_watchButton');
           watchLink.href = loc;
           g_button_added = true;
       }

       //console.dir(desc);
       mainObserver.disconnect();
       return;
  });
}

})();
