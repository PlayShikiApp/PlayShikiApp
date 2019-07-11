#!/usr/bin/sh

#./scripts/build_shiki_assets.sh

#./node_modules/.bin/gulp && ./node_modules/.bin/webpack --config webpack.config.js

#SUPPORTED_BROWSERS="chrome firefox opera"
SUPPORTED_BROWSERS="chrome"

rm -fr dist

cp node_modules/hls.js/dist/hls.js src/players/playerjs

for i in $SUPPORTED_BROWSERS
do
	mkdir -p dist/$i
	cp -r src/* dist/$i
	mv dist/$i/index.html.dev dist/$i/index.html
done
