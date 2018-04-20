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
RUN pip install pyscf numpy scipy h5py
# RUN apt-get install -y libblas-dev build-essential gfortran cmake
# ADD https://api.github.com/repos/sunqm/pyscf/compare/master...HEAD /dev/null
# RUN git clone https://github.com/sunqm/pyscf.git
# RUN cd pyscf/pyscf/lib && mkdir build && cd build && cmake .. && make

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
ENTRYPOINT /bin/bash -c "forever -l ../forever.log -o ../node.log -e ../error.log --minUptime 1000 --spinSleepTime 1000 main.js"
