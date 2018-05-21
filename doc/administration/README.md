# Administrator Documentation

Use this to guide to setup and manage a production version of atoms+bits.

## Overview

- [Install](#install)
- [Running and Updating](#running-and-updating)
- [Configuration](#configuration)

## Install

The atoms+bits installation consists of setting up:

1. Packages / Dependencies
1. Nvidia Drivers
1. Docker
1. Docker Compose
1. atoms+bits

### 1. Packages / Dependencies

`sudo` is not installed on Debian by default. Make sure your system is
up-to-date and install it.

~~~sh
# run as root!
apt-get update -y
apt-get upgrade -y
apt-get install sudo -y
~~~

### 2. Nvidia drivers

~~~sh
# remove older nvidia drivers
sudo apt-get purge nvidia*

# add graphics-driver PPA
sudo add-apt-repository ppa:graphics-drivers
sudo apt-get update

# install
sudo apt-get install nvidia-390
~~~

### 3. Docker

~~~sh
# remove older docker versions
sudo apt-get remove docker docker-engine docker.io

# allow apt to use HTTPS
sudo apt-get install \
  apt-transport-https \
  ca-certificates \
  curl \
  software-properties-common

# add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# add docker PPA
sudo add-apt-repository \
  "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) \
  stable"
sudo apt-get update

# install
sudo apt-get install docker-ce

# give docker non-root access WARNING: The docker group is root-equivalent.
# https://www.projectatomic.io/blog/2015/08/why-we-dont-let-non-root-users-run-docker-in-centos-fedora-or-rhel/
sudo groupadd docker
sudo gpasswd -a $USER docker
sudo systemctl restart docker
~~~

Add `"default-runtime": "nvidia"` to `/etc/docker/daemon.json` to make the nvidia runtime enabled by default.

### 4. Docker Compose

~~~sh
# download the latest version of Docker Compose
sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/bin/docker-compose

# make executable
sudo chmod +x /usr/bin/docker-compose
~~~

### 5. atoms+bits

~~~sh
git clone https://gitlab.com/atomsandbits/atomsandbits.git
~~~

## Running and Updating
~~~sh
cd atomsandbits/docker

# build the docker images
./scripts/setup.sh

# run the docker images
./scripts/run.sh
~~~

To update simply `git pull origin master`, then run `setup.sh` followed by `run.sh`. This can be done while the server is still running.

## Configuration

~~~sh
cd atomsandbits/docker

# copy the default variables
cp variables.default.env variables.env

# modify the variables
vim variables.env
~~~
