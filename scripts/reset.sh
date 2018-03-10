# remove db data
rm -r data

# reset meteor services
(cd services/webapp && meteor reset)

# setup
./scripts/setup.sh
