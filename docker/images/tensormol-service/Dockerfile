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

# Install TensorMol
# ADD https://api.github.com/repos/jparkhill/TensorMol/compare/master...HEAD /dev/null
RUN git clone https://github.com/jparkhill/TensorMol.git && cd TensorMol && git checkout cloudszi
COPY networks.zip /networks.zip 
RUN apt-get install unzip
RUN unzip /networks.zip -d /TensorMol && rm /networks.zip
RUN pip install numpy scipy h5py tensorflow
RUN pip install -e /TensorMol

# Download and Build TensorMol-service
ARG GITHUB_TOKEN
ADD https://$GITHUB_TOKEN@api.github.com/repos/cloudszi/tensormol-service/compare/master...HEAD /dev/null
RUN git clone https://$GITHUB_TOKEN@github.com/cloudszi/tensormol-service.git
RUN cd ./tensormol-service && meteor npm install
RUN cd ./tensormol-service && meteor build ../build --allow-superuser --architecture os.linux.x86_64 && cd ../build && tar -xzvf ./tensormol-service.tar.gz
RUN cd build/bundle/programs/server && npm install

# Cleanup
RUN rm /usr/local/bin/meteor && rm -rf ~/.meteor
RUN rm -r /tensormol-service && rm /build/tensormol-service.tar.gz

# Set Environment Variables
ENV PYTHONWARNINGS ignore
ENV TENSORMOL_PATH /TensorMol
ENV PORT 4100

EXPOSE 4100

# Default Command
WORKDIR build/bundle
ENTRYPOINT forever -l ../forever.log -o ../node.log -e ../error.log --minUptime 1000 --spinSleepTime 1000 main.js
