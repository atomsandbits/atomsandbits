# Set the base image
FROM node
# Dockerfile author /maintainer
MAINTAINER Jordan Garside <jordangarside@gmail.com>

# Install Forever
RUN npm install -g forever

# Install Meteor
RUN curl https://install.meteor.com/ > ./meteor && chmod +x ./meteor && ./meteor && rm ./meteor

# Download and Build about.cloudszi
ARG GITHUB_TOKEN
ADD https://$GITHUB_TOKEN@api.github.com/repos/cloudszi/about.cloudszi/compare/master...HEAD /dev/null
RUN git clone https://$GITHUB_TOKEN@github.com/cloudszi/about.cloudszi.git
RUN cd ./about.cloudszi && meteor npm install
RUN cd ./about.cloudszi && meteor build ../build --allow-superuser --architecture os.linux.x86_64 && cd ../build && tar -xzvf ./about.cloudszi.tar.gz
RUN cd build/bundle/programs/server && npm install

# Cleanup
RUN rm /usr/local/bin/meteor && rm -rf ~/.meteor
RUN rm -r /about.cloudszi && rm /build/about.cloudszi.tar.gz

# Set Environment Variables
ENV PORT 80

# Default Command
WORKDIR build/bundle
ENTRYPOINT forever -l ../forever.log -o ../node.log -e ../error.log --minUptime 1000 --spinSleepTime 1000 main.js
