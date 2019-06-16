var mainObserver = new MutationObserver(start);
var observerConfig = { attributes: true, subtree: true, childList: true };
mainObserver.observe(document, observerConfig);


function start() {
  var infoSection = document.querySelector('body#animes_show .c-info-right');
  var watchLink = document.querySelector('#watchButton');
  var placeHolder = document.querySelector(".watch-online-placeholer");

  //console.log("start");

  if (infoSection === null || placeHolder === null || watchLink !== null)
    return;

  var watched_episodes = parseInt(document.querySelector(".current-episodes").innerText) + 1;
  var total_episodes = parseInt(placeHolder.getAttribute("data-total_episodes"));
  console.log(location.pathname);
  var anime_id = location.pathname.split("-")[0].split("/")[2].replace(/\D/g, "");
  var loc = chrome.runtime.getURL("index.html") + "#/?anime_id="+ anime_id + "&episode=" + (watched_episodes > total_episodes ? 1 : watched_episodes);

  var WatchButtonElement = document.createElement('div');
  WatchButtonElement.classList.add('block');
  WatchButtonElement.innerHTML = `
	<a class="b-link_button dark watch-online" id="watchButton" href="#">Смотреть онлайн</a>
  `;

  infoSection.appendChild(WatchButtonElement);

  var WatchLink = WatchButtonElement.querySelector('#watchButton');
  console.log(loc);
  WatchLink.href = loc;
}

