#!/bin/bash

cd _site
git init
git remote add origin git@github.com:edm00se/iot-pi.git
git checkout gh-pages
git add .
git commit -m "adding in latest for live site"
git push -q origin gh-pages
cd ..
