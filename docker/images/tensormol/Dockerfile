# Set the base image
FROM nvidia/cuda:9.0-cudnn7-runtime
# Dockerfile author /maintainer
MAINTAINER Jordan Garside <jordangarside@gmail.com>

RUN apt-get update
RUN apt-get install -y git

# Install Node.js
RUN apt-get install -y curl && \
  curl -sL https://deb.nodesource.com/setup_9.x | bash - && \
  apt-get install -y nodejs

# Install Forever
RUN npm install -g forever

# Install Meteor
RUN curl https://install.meteor.com/ > ./meteor && chmod +x ./meteor && ./meteor && rm ./meteor

# Install TensorMol
RUN apt-get install -y python3-pip
RUN pip3 install numpy scipy h5py tensorflow-gpu
ARG GITHUB_TOKEN
ADD https://$GITHUB_TOKEN@api.github.com/repos/jparkhill/TensorMol_Dev/compare/master...HEAD /dev/null
RUN git clone https://$GITHUB_TOKEN@github.com/jparkhill/TensorMol_Dev.git && mv TensorMol_Dev TensorMol
COPY networks.zip /networks.zip
RUN apt-get install unzip
RUN unzip /networks.zip -d /TensorMol && rm /networks.zip
RUN pip3 install -e /TensorMol
RUN pip3 install socketIO_client

# Download and Build Service
COPY ./src src

# Set Environment Variables
ENV LD_LIBRARY_PATH /usr/local/cuda/extras/CUPTI/lib64:$LD_LIBRARY_PATH
ENV TENSORMOL_PATH /TensorMol
ENV PORT 80
EXPOSE 80

# Default Command
WORKDIR src
ENTRYPOINT python3 app.py
