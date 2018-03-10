# cloudszi_docker

Docker images for [cloudszi](https://www.cloudszi.com/).

## Dependencies

[Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) | [Docker Compose](https://docs.docker.com/compose/install/)

## Quickstart

Running (use sudo if you're not in docker group):
~~~bash
./cloudszi-setup.sh
./cloudszi-run.sh
~~~

Custom environment variables:
~~~bash
cp ./variables.env ./user-variables.env
~~~

Rebuild images with:
~~~bash
docker-compose build
~~~

Redeploy single service:
~~~bash
./scripts/update-service.sh service_name
~~~

## Documentation

Check out [the wiki](https://github.com/cloudszi/cloudszi/wiki):

* [Running Locally](https://github.com/cloudszi/cloudszi/wiki/Running-Locally)
* [Deploying on a Server](https://github.com/cloudszi/cloudszi/wiki/Deploying-to-Production-Server)

## Contributing

**TODO**

## License

cloudszi_docker is [GPLv3 licensed](https://github.com/cloudszi/cloudszi_docker/blob/master/LICENSE).