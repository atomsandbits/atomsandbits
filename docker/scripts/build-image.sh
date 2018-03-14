#!/bin/bash

rm -rf ./images/$1/src
cp -r ../services/$1 ./images/$1/src
(cd ./images/$1/src && meteor reset >/dev/null)

# Load Environment Variables
set -a
source variables.env
if [ -f user-variables.env ]; then
    source user-variables.env
fi

# Run Docker Compose
docker-compose build --build-arg GITHUB_TOKEN=$GITHUB_TOKEN $1
rm -rf ./images/$1/src
