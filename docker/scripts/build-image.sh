#!/bin/bash

rm -rf ./docker/images/$1/$1
cp -r ./services/$1 ./docker/images/$1/$1

# Run Docker Compose
(cd ./docker/images/$1 && docker build .)
