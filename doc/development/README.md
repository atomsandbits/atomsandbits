# Development Documentation

Use this to guide to setup and develop atoms+bits.

## Overview

- [Install Dependencies](#install-dependencies)
- [Development Environment](#development-environment)
- [Running the Server](#running-the-server)
- [Running the Tests](#running-the-tests)

## Install Dependencies

The following need to be installed:

1. Packages / Dependencies
1. Docker
1. GitLab Runner
1. MongoDB
1. Elasticsearch
1. Meteor.js
1. Psi4
1. TensorMol
1. atoms+bits

### 1. Packages / Dependencies

~~~sh
sudo pip install pycodestyle
sudo pip install pydocstyle
sudo pip install yapf
sudo pip install tensorflow-gpu
~~~
python3 is required

### 2. Docker

[Docker install instructions.](https://docs.docker.com/install/)

### 3. GitLab Runner
[Gitlab Runner install instructions.](https://docs.gitlab.com/runner/install/)

### 4. MongoDB
[MongoDB install instructions.](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#import-the-public-key-used-by-the-package-management-system)

### 5. Elasticsearch
[Elasticsearch install instructions.](https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html)

### 6. Meteor.js
[Meteor.js install instructions.](https://www.meteor.com/install)

### 7. Psi4
[Psi4 install instructions.](http://vergil.chemistry.gatech.edu/psicode-download/1.1.html)

### 8. TensorMol
[TenorMol install instructions.](https://github.com/jparkhill/TensorMol)

### 9. atoms+bits
~~~sh
git clone https://gitlab.com/atomsandbits/atomsandbits.git
~~~

## Development Environment

> TODO: add atom packages and chrome debugging info

## Running the Server

~~~sh
meteor npm install
meteor npm start
~~~

Set custom environment variables:

~~~sh
touch variables.env
~~~

## Running the Tests
~~~sh
# run all tests
gitlab-runner exec docker test_all_services
~~~
