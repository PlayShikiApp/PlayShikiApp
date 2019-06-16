function start(url) {
  var ne = $(".current-episodes").text() - -1;
  var e = $(".watch-online-placeholer");
  var me = - -e.data('total_episodes');
  console.log(location.pathname);
  var anime_id = location.pathname.split("-")[0].split("/")[2].replace(/\D/g, "");;
  var loc =  url + "#/?anime_id="+ anime_id + "&episode=" + (ne > me ? 1 : ne);

  var link = $("<a/>", {
    'class': 'b-link_button dark watch-online',
    'id': 'myButton',
    'target': '_blank',
    'href': loc
  }).text('Смотреть онлайн');
  var block = $("<div/>", {
    'class': 'block'
  }).append(link);
  e.append(block);
}


document.addEventListener('yourCustomEvent', function (e)
{
	let url=e.detail;
	var myElem = document.getElementById('myButton');
	if (myElem === null){
		return start(url);
        }
});
