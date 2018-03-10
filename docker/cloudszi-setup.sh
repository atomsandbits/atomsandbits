#!/bin/bash

# Download TensorMol networks from Google Drive
if [ ! -f ./images/tensormol-service/networks.zip ]; then
    echo "Downloading TensorMol Networks..."
    cd ./images/tensormol-service
    ggID='1YK5W7hzqNKyrNqwO2coyF5qX9b5iEqob'  
    ggURL='https://drive.google.com/uc?export=download'  
    filename="$(curl -sc /tmp/gcokie "${ggURL}&id=${ggID}" | grep -o '="uc-name.*</span>' | sed 's/.*">//;s/<.a> .*//')"  
    getcode="$(awk '/_warning_/ {print $NF}' /tmp/gcokie)"  
    curl -Lb /tmp/gcokie "${ggURL}&confirm=${getcode}&id=${ggID}" -o "${filename}"
    rm uc*
    cd ../../
fi

# Load Environment Variables
set -a
source variables.env
if [ -f ./user-variables.env ]; then
    source user-variables.env
fi

# Build Images
docker-compose build --build-arg GITHUB_TOKEN=$GITHUB_TOKEN webapp
docker-compose build --build-arg GITHUB_TOKEN=$GITHUB_TOKEN scheduler
docker-compose build --build-arg GITHUB_TOKEN=$GITHUB_TOKEN psi4-service
docker-compose build --build-arg GITHUB_TOKEN=$GITHUB_TOKEN pyscf-service
docker-compose build --build-arg GITHUB_TOKEN=$GITHUB_TOKEN tensormol-service
docker-compose build