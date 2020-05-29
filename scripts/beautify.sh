#!/usr/bin/bash

find src -name "*.js" \
	! -name "*.min.js" \
	! -name "nunjucks.js" \
	! -name "vendor.js" \
	! -wholename "src/static/js/application.js" \
	! -wholename "src/static/js/main.js" \
	! -wholename "src/players/videojs*" \
	! -name "hls.js" \
	-print0 | xargs -I file -0 \
		bash -c "echo file ; js-beautify file > /tmp/js-beautify.tmp \
				&& sed -i 's,    ,\t,g' /tmp/js-beautify.tmp && cp /tmp/js-beautify.tmp file"

rm -f /tmp/js-beautify.tmp
