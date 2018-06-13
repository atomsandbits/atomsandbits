# Set the base image
FROM atomsandbits/ani-1:latest
# Dockerfile author /maintainer
MAINTAINER Jordan Garside <jordangarside@gmail.com>

# Install TensorMol
RUN pip install numpy scipy h5py tensorflow-gpu
ARG GITHUB_TOKEN
ADD https://$GITHUB_TOKEN@api.github.com/repos/jparkhill/TensorMol_Dev/compare/master...HEAD /dev/null
RUN git clone https://$GITHUB_TOKEN@github.com/jparkhill/TensorMol_Dev.git && mv TensorMol_Dev TensorMol
COPY networks.zip /networks.zip
RUN apt-get install unzip
RUN unzip /networks.zip -d /TensorMol && rm /networks.zip
RUN pip install -e /TensorMol
RUN pip install socketIO-client-nexus

# Download and Build Service
COPY ./src src

# Set Environment Variables
ENV LD_LIBRARY_PATH /usr/local/cuda/extras/CUPTI/lib64:$LD_LIBRARY_PATH
ENV ANI_PATH /ASE_ANI
ENV TENSORMOL_PATH /TensorMol
ENV PORT 80
EXPOSE 80

# Default Command
WORKDIR src
ENTRYPOINT python3 app.py
