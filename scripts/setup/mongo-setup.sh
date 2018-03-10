# create data directory
mkdir -p data/db
mkdir -p data/log/mongodb
touch data/log/mongodb/mongodb.log

# start mongodb
mongod --fork --replSet rs0 --dbpath data/db --logpath data/log/mongodb/mongodb.log
mongo < scripts/setup/replicaset-setup.js # create replicaset
mongo --host rs0/localhost:27017 < scripts/setup/add-oplogger.js # create oplogger
mongod --shutdown --dbpath data/db # shutdown mongodb
