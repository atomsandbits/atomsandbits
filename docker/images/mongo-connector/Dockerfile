# Set the base image
FROM python:2
# Dockerfile author /maintainer
MAINTAINER Jordan Garside <jordangarside@gmail.com>

# Install Mongo Connector
RUN pip install mongo-connector
RUN pip install 'mongo-connector[elastic5]'
RUN pip install "elastic2-doc-manager[elastic5]"
COPY config.json ./config.json
RUN touch oplog.timestamp

# Default Command
ENTRYPOINT mongo-connector -c ./config.json -m "$MONGO_URL" -t "$ELASTICSEARCH_URL"
