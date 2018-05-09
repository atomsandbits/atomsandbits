> TODO: dependency install instructions

[Install Docker](https://docs.docker.com/install/).

[Install GitLab Runner](https://docs.gitlab.com/runner/install/).
~~~sh
# run all tests
gitlab-runner exec docker test_all_services
~~~

## Requirements

```sh
sudo pip install pycodestyle
sudo pip install pydocstyle
sudo pip install yapf
sudo pip install tensorflow
```

* meteor
* node.js and npm
* mongodb
* TensorMol
* Psi4

## Setup

Set custom environment variables:

```sh
touch variables.env
```
