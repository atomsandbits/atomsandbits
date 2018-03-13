# Set the base image
FROM continuumio/anaconda
# Dockerfile author /maintainer
MAINTAINER Jordan Garside <jordangarside@gmail.com>

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get install -y nodejs

# Install Forever
RUN npm install -g forever

# Install Meteor
RUN curl https://install.meteor.com/ > ./meteor && chmod +x ./meteor && ./meteor && rm ./meteor

# Install Psi4
RUN apt-get install -y libblas-dev build-essential gfortran cmake
RUN conda config --add channels http://conda.anaconda.org/psi4 && conda install psi4

# Download and Build Psi4-service
ARG GITHUB_TOKEN
ADD https://$GITHUB_TOKEN@api.github.com/repos/cloudszi/psi4-service/compare/master...HEAD /dev/null
RUN git clone https://$GITHUB_TOKEN@github.com/cloudszi/psi4-service.git
RUN cd ./psi4-service && meteor npm install
RUN cd ./psi4-service && meteor build ../build --allow-superuser --architecture os.linux.x86_64 && cd ../build && tar -xzvf ./psi4-service.tar.gz
RUN cd build/bundle/programs/server && npm install

# Cleanup
RUN rm /usr/local/bin/meteor && rm -rf ~/.meteor
RUN rm -r /psi4-service && rm /build/psi4-service.tar.gz

# Set Environment Variables
ENV PORT 4200

EXPOSE 4200

# Default Command
WORKDIR build/bundle
ENTRYPOINT forever -l ../forever.log -o ../node.log -e ../error.log --minUptime 1000 --spinSleepTime 1000 main.js