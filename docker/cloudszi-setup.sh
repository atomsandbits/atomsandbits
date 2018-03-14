#!/bin/bash

# Download TensorMol networks from Google Drive
if [ ! -f ./images/tensormol/networks.zip ]; then
    echo "Downloading TensorMol Networks..."
    cd ./images/tensormol
    ggID='1YK5W7hzqNKyrNqwO2coyF5qX9b5iEqob'
    ggURL='https://drive.google.com/uc?export=download'
    filename="$(curl -sc /tmp/gcokie "${ggURL}&id=${ggID}" | grep -o '="uc-name.*</span>' | sed 's/.*">//;s/<.a> .*//')"
    getcode="$(awk '/_warning_/ {print $NF}' /tmp/gcokie)"
    curl -Lb /tmp/gcokie "${ggURL}&confirm=${getcode}&id=${ggID}" -o "${filename}"
    cd ../../
fi

# Load Environment Variables
set -a
source variables.env
if [ -f ./user-variables.env ]; then
    source user-variables.env
fi

# Build Images
./scripts/build-image.sh about
./scripts/build-image.sh webapp
./scripts/build-image.sh database
./scripts/build-image.sh tensormol
./scripts/build-image.sh psi4
./scripts/build-image.sh image-generator
docker-compose build mongo
docker-compose build elasticsearch
docker-compose build mongo-connector
