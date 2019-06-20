const HOST = "https://gist.github.com/Chronomonochrome/aad42e8ae1fea9c7ad570bdd2b090cfa/raw/"

var key;
var key2;

var HOST_URL = null;

function getData(ajaxurl) { 
  return $.ajax({
    url: ajaxurl,
    type: 'GET',
  });
};

async function getHost() {
	if (HOST_URL !== null)
		return;

	HOST_URL = await $.ajax(HOST);
}

async function getKeys() {
	await getHost();
	key = await getData(HOST_URL + "/static/keys/key");
	key2 = await getData(HOST_URL + "/static/keys/key2");
}

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
