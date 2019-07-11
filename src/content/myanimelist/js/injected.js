(function(){

var mainObserver = new MutationObserver(start);
var observerConfig = { attributes: true, subtree: true, childList: true };
mainObserver.observe(document, observerConfig);

var g_button_added = false;
var g_callback_started = false;

function start() {
  var infoSection = document.querySelector('.user-status-block');

  var watchLink = document.querySelector('#_watchButton');

  if (infoSection === null || watchLink !== null)
    return;

  //console.log("found infoSection");

  var anime_id = location.pathname.split("/")[2].replace(/\D/g, "");
  var episode_num = 1;
  if (g_button_added)
     return;


       var loc = main_page_url + "#/?anime_id="+ anime_id + "&episode=" + episode_num;

       if (!document.querySelector('#_watchButton')) {
           var WatchButtonElement = document.createElement('a');

           WatchButtonElement.innerHTML = '<a id="_watchButton" target="_blank" href="#" class="btn-user-watch-button" style="margin-left: 10px">Watch online</a>';

           infoSection.appendChild(WatchButtonElement);
           watchLink = WatchButtonElement.querySelector('#_watchButton');
           watchLink.href = loc;
           g_button_added = true;
       }

       mainObserver.disconnect();
}

})();
