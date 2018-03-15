#!/bin/bash

# Load Environment Variables
set -a
source variables.env
if [ -f ./user-variables.env ]; then
    source user-variables.env
fi

meteor run --production --port $PORT
