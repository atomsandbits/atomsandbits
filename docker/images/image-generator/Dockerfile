# Set the base image
FROM nvidia/opengl:runtime
# Dockerfile author /maintainer
MAINTAINER Jordan Garside <jordangarside@gmail.com>

USER root

RUN apt-get update
RUN apt-get install -y git wget make g++ build-essential

# Install Node.js
RUN apt-get install -y curl && \
  curl -sL https://deb.nodesource.com/setup_9.x | bash - && \
  apt-get install -y nodejs

# Install Forever
RUN npm install -g forever

# Install Meteor
RUN curl https://install.meteor.com/ > ./meteor && chmod +x ./meteor && ./meteor && rm ./meteor

# Install Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | tee /etc/apt/sources.list.d/google-chrome.list && \
  apt-get update && \
  apt-get install -y google-chrome-stable

# Download and Build Service
COPY ./src /src
RUN cd /src && meteor reset --allow-superuser  && meteor npm install --allow-superuser
RUN cd /src && meteor build ../build --allow-superuser --architecture os.linux.x86_64 && cd ../build && tar -xzf ./src.tar.gz
RUN cd /build/bundle/programs/server && npm install

# Cleanup
RUN rm /usr/local/bin/meteor && rm -rf ~/.meteor
RUN rm -r /src && rm /build/src.tar.gz

# Set Environment Variables
ENV LD_LIBRARY_PATH /usr/local/cuda/extras/CUPTI/lib64:$LD_LIBRARY_PATH
ENV PORT 80
EXPOSE 80
EXPOSE 8080

RUN apt-get install -y software-properties-common
RUN add-apt-repository -y ppa:ubuntu-x-swat/updates
RUN apt-get update && apt -y dist-upgrade

RUN ls /usr/bin
RUN ls /lib/

# Default Command
WORKDIR /build/bundle
ENTRYPOINT forever -l ../forever.log -o ../node.log -e ../error.log --minUptime 1000 --spinSleepTime 1000 main.js
