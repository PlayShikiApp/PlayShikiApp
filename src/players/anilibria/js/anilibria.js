var getUrlParameter = function getUrlParameter(href, sParam) {
    if (href === undefined)
        return;

    var query = href.split("?");
    if (query === undefined)
        return;

    if (query[1] == undefined)
        return;

    return query[1].split(sParam + "=")[1].split("&")[0]
};

var div = document.getElementById("video");
var url = getUrlParameter(location.href, "url");

if (url) {
    if (url.startsWith("https://www.anilibria.tv/")) {
        url = url.split("https://www.anilibria.tv/")[1];
    }

    var urls = url.split(",").map(function(x) { let url = x.split("]")[1]; let q = x.split("[")[1].split("]")[0]; return [url, q];} );

    var playerHTML = `
        <video id="video_1" class="video-js vjs-default-skin vjs-big-play-centered" fluid="true" poster="` + chrome.runtime.getURL("players/anilibria/img/player2.png") +`" controls data-setup='{}' >`;

    for (const u of urls) {
        playerHTML += `<source src='` + u[0] + `' type='application/x-mpegURL' label='` + u[1] + `' res='` + u[1] + `' />`;
    }

    playerHTML += `</video>`;

    video.innerHTML = playerHTML;

    videojs('video_1').ready(function() {
       this.hotkeys({
           volumeStep: 0.1,
           seekStep: 5,
           enableModifiersForNumbers: false
       });
       videojs('video_1').videoJsResolutionSwitcher();
    });

}



