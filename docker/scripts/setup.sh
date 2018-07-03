#!/bin/bash
cd $(dirname $0) && cd ..

# Download TensorMol networks from Google Drive
if [ ! -f ./images/tensormol/networks.zip ]; then
    echo "Downloading TensorMol Networks..."
    cd ./images/tensormol
    ggID='1YK5W7hzqNKyrNqwO2coyF5qX9b5iEqob'
    ggURL='https://drive.google.com/uc?export=download'
    filename="$(curl -sc /tmp/gcokie "${ggURL}&id=${ggID}" | grep -o '="uc-name.*</span>' | sed 's/.*">//;s/<.a> .*//')"
    getcode="$(awk '/_warning_/ {print $NF}' /tmp/gcokie)"
    curl -Lb /tmp/gcokie "${ggURL}&confirm=${getcode}&id=${ggID}" -o "${filename}"
    cd $(dirname $0) && cd ..
fi

# Load Environment Variables
set -a
source variables.default.env
if [ -f variables.env ]; then
    source variables.env
fi

# Build Images
./scripts/docker/build-image.sh webapp
./scripts/docker/build-image.sh database
./scripts/docker/build-image.sh tensormol
./scripts/docker/build-image.sh psi4
./scripts/docker/build-image.sh pyscf
./scripts/docker/build-image.sh image-generator
docker-compose build mongo
docker-compose build elasticsearch
docker-compose build mongo-connector
