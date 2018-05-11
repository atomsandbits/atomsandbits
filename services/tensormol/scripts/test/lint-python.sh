#!/bin/bash

cd $(dirname $0)
cd ../../ && \
flake8 .
