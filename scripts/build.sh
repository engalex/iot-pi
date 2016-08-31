#!/bin/bash

rm -rf _site
git clone git@github.com:edm00se/iot-pi.git -b gh-pages _site
./node_modules/.bin/gulp build
cd _site
git add .
