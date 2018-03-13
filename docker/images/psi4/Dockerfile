# Set the base image
FROM node
# Dockerfile author /maintainer
MAINTAINER Jordan Garside <jordangarside@gmail.com>

# Install Forever
RUN npm install -g forever

# Install Meteor
RUN curl https://install.meteor.com/ > ./meteor && chmod +x ./meteor && ./meteor && rm ./meteor

# Install Psi4
RUN wget http://vergil.chemistry.gatech.edu/psicode-download/psi4conda-1.1-py36-Linux-x86_64.sh
RUN apt-get install bzip2
RUN echo '/psi4conda' | bash /psi4conda-1.1-py36-Linux-x86_64.sh
RUN rm /psi4conda-1.1-py36-Linux-x86_64.sh

# Download and Build Service
COPY ./src src
RUN cd ./src && meteor npm install
RUN cd ./src && meteor build ../build --allow-superuser --architecture os.linux.x86_64 && cd ../build && tar -xzvf ./src.tar.gz
RUN cd build/bundle/programs/server && npm install

# Cleanup
RUN rm /usr/local/bin/meteor && rm -rf ~/.meteor
RUN rm -r /src && rm /build/src.tar.gz

# Set Environment Variables
ENV PORT 80
EXPOSE 80

# Default Command
WORKDIR build/bundle
ENTRYPOINT source /psi4conda/bin/activate && forever -l ../forever.log -o ../node.log -e ../error.log --minUptime 1000 --spinSleepTime 1000 main.js
