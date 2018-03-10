#!/bin/bash

# Remove Docker Containers
docker rm $(docker ps -qa --no-trunc --filter "status=exited")

# Remove Docker Volumes
docker volume rm $(docker volume ls -qf dangling=true)