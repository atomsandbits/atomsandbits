#!/bin/bash

rm -rf ./docker/images/$1/$1
cp -r ../services/$1 ./images/$1/src

# Run Docker Compose
(cd ./images/$1 && docker build --build-arg GITHUB_TOKEN=$GITHUB_TOKEN .)
