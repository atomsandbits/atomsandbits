#!/bin/bash
cd $(dirname $0) && cd ../..

# Load Environment Variables
set -a
source variables.default.env
if [ -f variables.env ]; then
    source variables.env
fi

# Run Docker Compose
./scripts/docker/build-image.sh $1

# Run the new Image
docker-compose up --no-deps -d $1
