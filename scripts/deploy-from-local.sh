#!/bin/bash

git init
git remote add origin git@github.com:edm00se/iot-pi.git
git checkout -b gh-pages
git add .
git push -q origin gh-pages
cd ..
git checkout writing
