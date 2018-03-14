# Set the base image
FROM mongo:latest
# Dockerfile author /maintainer
MAINTAINER Jordan Garside <jordangarside@gmail.com>

COPY replicaset-setup.js mongo-start.js
COPY add-oplogger.js add-oplogger.js

RUN apt-get update
RUN apt-get install -y coreutils

# Default Command
CMD mongod --replSet 'rs0' --fork --logpath /var/log/mongodb.log --bind_ip_all && \
    sed -i "s/\$MONGO_HOST/$MONGO_HOST/g" mongo-start.js && \
    mongo < mongo-start.js && \
    sed -i "s/\$OPLOG_USER/$OPLOG_USER/g" add-oplogger.js && \
    sed -i "s/\$OPLOG_PASSWORD/$OPLOG_PASSWORD/g" add-oplogger.js && \
    mongo --host rs0/$MONGO_HOST < add-oplogger.js && \
    tail -f /var/log/mongodb.log
