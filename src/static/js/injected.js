var mainObserver = new MutationObserver(start);
var observerConfig = { attributes: true, subtree: true, childList: true };
mainObserver.observe(document, observerConfig);


function start() {
  var infoSection = document.querySelector('body#animes_show .c-info-right');
  var placeHolder = document.querySelector(".watch-online-placeholer");
  var desc = document.querySelector(".c-description");

  var watchLink = document.querySelector('#watchButton');


  //console.log("start");

  if (infoSection === null || placeHolder === null || desc === null || watchLink !== null)
    return;

  var watched_episodes = 1;

  var watchedEl = document.querySelector(".current-episodes");

  if (watchedEl !== null) {
	  var watched_episodes = parseInt(watchedEl.innerText) + 1;
	  //console.log("watched_episodes = " + watched_episodes);
  }

  var total_episodes = parseInt(placeHolder.getAttribute("data-total_episodes"));
  console.log(location.pathname);
  var anime_id = location.pathname.split("-")[0].split("/")[2].replace(/\D/g, "");
  var loc = chrome.runtime.getURL("index.html") + "#/?anime_id="+ anime_id + "&episode=" + (watched_episodes > total_episodes ? 1 : watched_episodes);

  var WatchButtonElement = document.createElement('div');
  WatchButtonElement.classList.add('block');
  WatchButtonElement.innerHTML = `
        <div class="subheadline m10" style="margin-top: 10px;">Онлайн просмотр</div>
	<a class="b-link_button dark watch-online" id="watchButton" href="#" style="margin-top: 10px;">Смотреть онлайн</a>
  `;

  infoSection.appendChild(WatchButtonElement);
  watchLink = WatchButtonElement.querySelector('#watchButton');
  watchLink.href = loc;

  //console.dir(desc);
  mainObserver.disconnect();
  return;
}

