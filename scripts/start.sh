# set environment variables
set -a
DB_NAME=cloudszi
MONGO_URL=mongodb://localhost:27017/cloudszi
MONGO_OPLOG_URL=mongodb://oplogger:password@localhost:27017/local?authSource=admin
TENSORMOL_PATH=~/Packages/TensorMol
PYTHONPATH=${PYTHONPATH}:~/Packages/pyscf

OMP_NUM_THREADS=2
PSI4_MAX_MEMORY=4000
PYSCF_MAX_MEMORY=4000

# set custom environment variables
if [ -f ./variables.env ]; then
    source variables.env
fi

# run services
concurrently \
--prefix "[{time}] [{name}]" \
--names "mongo,database,tensormol,psi4,webapp,about,image-generator" \
--prefix-colors "black,green,blue,red,cyan,yellow,magenta" \
"mongod --replSet rs0 --dbpath data/db --quiet" \
"(cd services/database && npm start -- --port 4000)" \
"(cd services/tensormol && ./autoreload python app.py)" \
"(cd services/psi4 && npm start -- --port 4200)" \
"(cd services/webapp && npm start)" \
"(cd services/about && npm start -- --port 3100 )" \
"(cd services/image-generator && npm start -- --port 3200 )"
