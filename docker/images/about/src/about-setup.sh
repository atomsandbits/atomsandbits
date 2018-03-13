#!/bin/bash

# Load Environment Variables
set -a
source variables.env
if [ -f user-variables.env ]; then
    source user-variables.env
fi

docker-compose build --build-arg GITHUB_TOKEN=$GITHUB_TOKEN webapp
docker-compose up