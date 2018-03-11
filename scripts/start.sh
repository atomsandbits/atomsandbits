# set environment variables
set -a
DB_NAME=cloudszi
MONGO_URL=mongodb://localhost:27017/cloudszi
MONGO_OPLOG_URL=mongodb://oplogger:password@localhost:27017/local?authSource=admin
TENSORMOL_PATH=~/Packages/TensorMol
PYTHONPATH=${PYTHONPATH}:~/Packages/pyscf

# run services
concurrently \
--names "mongo,database,tensormol,webapp,about" \
--prefix-colors "black,green,blue,cyan,yellow" \
"mongod --replSet rs0 --dbpath data/db --quiet" \
"(cd services/database && npm start -- --port 4000)" \
"(cd services/tensormol && ./autoreload python3 app.py)" \
"(cd services/webapp && npm start)" \
"(cd services/about && npm start -- --port 3100)"
