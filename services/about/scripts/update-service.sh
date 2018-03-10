#!/bin/bash

# Load Environment Variables
set -a
source variables.env
if [ -f user-variables.env ]; then
    source user-variables.env
fi

# Run Docker Compose
docker-compose build --build-arg GITHUB_TOKEN=$GITHUB_TOKEN webapp

# Run the new Image
 docker-compose up --no-deps -d $1