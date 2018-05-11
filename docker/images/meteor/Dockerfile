# Set the base image
FROM node
# Dockerfile author /maintainer
MAINTAINER Jordan Garside <jordangarside@gmail.com>

# Install Forever
RUN npm install -g forever

# Install Meteor
RUN curl https://install.meteor.com/ > ./meteor && chmod +x ./meteor && ./meteor && rm ./meteor

ENTRYPOINT /bin/bash
