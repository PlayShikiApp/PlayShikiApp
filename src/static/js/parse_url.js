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
