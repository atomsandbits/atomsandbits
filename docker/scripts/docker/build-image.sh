#!/bin/bash
cd $(dirname $0) && cd ../..

rm -rf ./images/$1/src
cp -r ../services/$1 ./images/$1/src
(cd ./images/$1/src && meteor reset >/dev/null)

# Load Environment Variables
set -a
source variables.default.env
if [ -f variables.env ]; then
    source variables.env
fi

# Run Docker Compose
docker-compose build --build-arg GITHUB_TOKEN=$GITHUB_TOKEN $1
rm -rf ./images/$1/src
