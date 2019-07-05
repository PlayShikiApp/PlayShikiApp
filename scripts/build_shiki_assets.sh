cd app
rm -f public/packs/*
./bin/webpack
cp public/packs/vendor-*.js ../src/static/js/vendor.js
cp public/packs/application-*.js ../src/static/js/application.js
cd ..
