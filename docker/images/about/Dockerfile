# Set the base image
FROM node
# Dockerfile author /maintainer
MAINTAINER Jordan Garside <jordangarside@gmail.com>

# Install Forever
RUN npm install -g forever

# Install Meteor
RUN curl https://install.meteor.com/ > ./meteor && chmod +x ./meteor && ./meteor && rm ./meteor

# Download and Build Service
COPY ./src src
RUN cd ./src && meteor reset --allow-superuser  && meteor npm install --allow-superuser 
RUN cd ./src && meteor build ../build --allow-superuser --architecture os.linux.x86_64 && cd ../build && tar -xzf ./src.tar.gz
RUN cd build/bundle/programs/server && npm install

# Cleanup
RUN rm /usr/local/bin/meteor && rm -rf ~/.meteor
RUN rm -r /src && rm /build/src.tar.gz

# Set Environment Variables
ENV PORT 80
EXPOSE 80

# Default Command
WORKDIR build/bundle
ENTRYPOINT echo "hello"
