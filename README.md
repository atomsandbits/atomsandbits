# [atoms+bits](https://atomsandbits.com/)

While atoms+bits is in alpha 0.0.x expect consistent changes breaking backwards compatibility. When a beta is created 0.x.x expect the site to respect semver.

## Requirements

~~~sh
sudo pip install pycodestyle
sudo pip install pydocstyle
sudo pip install pylint
sudo pip install yapf
sudo pip install tensorflow
~~~

- meteor
- node.js and npm
- mongodb
- TensorMol
- Psi4

## Setup

Set custom environment variables:
~~~sh
touch variables.env
~~~

Install dependencies:
~~~sh
npm install
~~~

## Development

Run all services:
~~~sh
npm start
~~~

## License

The current license is fairly restrictive. In the future we expect to create a community-edition (MIT License) and an enterprise-edition (open-source but proprietary license).
