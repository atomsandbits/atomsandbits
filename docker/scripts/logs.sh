#!/bin/bash
cd $(dirname $0) && cd ..

# Load Environment Variables
set -a
source variables.default.env
if [ -f variables.env ]; then
    source variables.env
fi

# Run Docker Compose
docker-compose logs --follow --tail 100
