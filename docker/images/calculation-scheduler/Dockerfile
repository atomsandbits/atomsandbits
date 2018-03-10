# Set the base image
FROM python:3
# Dockerfile author /maintainer
MAINTAINER Jordan Garside <jordangarside@gmail.com>

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get install -y nodejs

# Install Forever
RUN npm install -g forever

# Install Meteor
RUN curl https://install.meteor.com/ > ./meteor && chmod +x ./meteor && ./meteor && rm ./meteor

# Download and Build Scheduler
ARG GITHUB_TOKEN
ADD https://$GITHUB_TOKEN@api.github.com/repos/cloudszi/calculation-scheduler/compare/master...HEAD /dev/null
RUN git clone https://$GITHUB_TOKEN@github.com/cloudszi/calculation-scheduler.git
RUN cd ./calculation-scheduler && meteor npm install
RUN cd ./calculation-scheduler && meteor build ../build --allow-superuser --architecture os.linux.x86_64 && cd ../build && tar -xzvf ./calculation-scheduler.tar.gz
RUN cd build/bundle/programs/server && npm install

# Cleanup
RUN rm /usr/local/bin/meteor && rm -rf ~/.meteor
RUN rm -r /calculation-scheduler && rm /build/calculation-scheduler.tar.gz

# Set Environment Variables
ENV PORT 4000

EXPOSE 4000

# Default Command
WORKDIR build/bundle
ENTRYPOINT forever -l ../forever.log -o ../node.log -e ../error.log --minUptime 1000 --spinSleepTime 1000 main.js
