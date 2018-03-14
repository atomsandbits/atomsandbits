#!/bin/bash

mkdir -p certs

# First start nginx (official image) with volumes
docker run -d -p 80:80 -p 443:443 \
  --name nginx \
  -v /etc/nginx/conf.d  \
  -v /etc/nginx/vhost.d \
  -v /usr/share/nginx/html \
  -v ./certs:/etc/nginx/certs:ro \
  --label com.github.jrcs.letsencrypt_nginx_proxy_companion.nginx_proxy \
  nginx

# Second start the docker-gen container with the shared volumes and the template file
docker run -d \
  --name nginx-gen \
  --volumes-from nginx \
  -v /path/to/nginx.tmpl:/etc/docker-gen/templates/nginx.tmpl:ro \
  -v /var/run/docker.sock:/tmp/docker.sock:ro \
  --label com.github.jrcs.letsencrypt_nginx_proxy_companion.docker_gen \
  jwilder/docker-gen \
  -notify-sighup nginx -watch -wait 5s:30s /etc/docker-gen/templates/nginx.tmpl /etc/nginx/conf.d/default.conf

docker run -d \
  --name nginx-letsencrypt \
  --volumes-from nginx \
  -v ./certs:/etc/nginx/certs:rw \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -e NGINX_DOCKER_GEN_CONTAINER=nginx-gen \
  -e NGINX_PROXY_CONTAINER=nginx \
  jrcs/letsencrypt-nginx-proxy-companion
