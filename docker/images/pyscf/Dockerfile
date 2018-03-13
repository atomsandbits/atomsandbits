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

# Install PySCF
RUN apt-get install -y libblas-dev build-essential gfortran cmake
# ADD https://api.github.com/repos/sunqm/pyscf/compare/master...HEAD /dev/null
RUN git clone https://github.com/sunqm/pyscf.git
RUN cd pyscf/pyscf/lib && mkdir build && cd build && cmake .. && make
RUN pip install numpy scipy h5py

# Download and Build PySCF-service
ARG GITHUB_TOKEN
ADD https://$GITHUB_TOKEN@api.github.com/repos/cloudszi/pyscf-service/compare/master...HEAD /dev/null
RUN git clone https://$GITHUB_TOKEN@github.com/cloudszi/pyscf-service.git
RUN cd ./pyscf-service && meteor npm install
RUN cd ./pyscf-service && meteor build ../build --allow-superuser --architecture os.linux.x86_64 && cd ../build && tar -xzvf ./pyscf-service.tar.gz
RUN cd build/bundle/programs/server && npm install

# Cleanup
RUN rm /usr/local/bin/meteor && rm -rf ~/.meteor
RUN rm -r /pyscf-service && rm /build/pyscf-service.tar.gz

# Set Environment Variables
ENV PYTHONWARNINGS ignore
ENV PYTHONPATH /pyscf
ENV PORT 4300

EXPOSE 4300

# Default Command
WORKDIR build/bundle
ENTRYPOINT forever -l ../forever.log -o ../node.log -e ../error.log --minUptime 1000 --spinSleepTime 1000 main.js
