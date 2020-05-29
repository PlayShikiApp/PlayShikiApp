#!/bin/sh

./node_modules/.bin/gulp && ./node_modules/.bin/webpack --config webpack.config.js

SUPPORTED_BROWSERS="chrome firefox opera"

rm -fr dist

for i in $SUPPORTED_BROWSERS
do
	mkdir -p dist/$i
	cp -r src/* dist/$i
	rm dist/$i/index.html.dev
	rm -f dist/$i/static/js/render.js
done

rm -f dist/chrome/manifest_mozilla.json
rm -f dist/opera/manifest_mozilla.json
cd dist/chrome
zip -9r ../PlayShikiApp.zip *
cd ../firefox
mv manifest_mozilla.json manifest.json
zip -9r ../PlayShikiApp.xpi *
cd ..
../node_modules/.bin/crx pack opera -o PlayShikiApp.crx
