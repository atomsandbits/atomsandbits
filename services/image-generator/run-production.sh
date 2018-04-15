#!/bin/bash

# Load Environment Variables
set -a
source variables.env
if [ -f ./user-variables.env ]; then
    source user-variables.env
fi

DISPLAY=:0 npm start -- --production --port $PORT
