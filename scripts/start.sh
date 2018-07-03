# set environment variables
set -a

source ./variables.default.env
# set custom environment variables
if [ -f ./variables.env ]; then
    source ./variables.env
fi

# run services
concurrently \
--prefix "[{time}] [{name}]" \
--names "mongo,database,tensormol,psi4,pyscf,webapp,image-generator" \
--prefix-colors "black,green,blue,red,red,cyan,yellow,magenta" \
"mongod --replSet rs0 --dbpath data/db --quiet" \
"(cd services/database && npm start -- --port 4000)" \
"(cd services/tensormol && ./autoreload python3 app.py)" \
"(source $PSI4_PATH/bin/activate && cd services/psi4 && npm start -- --port 4200)" \
"(cd services/pyscf && npm start -- --port 4300)" \
"(cd services/webapp && npm start)" \
"(cd services/image-generator && npm start -- --port 3200 )"
