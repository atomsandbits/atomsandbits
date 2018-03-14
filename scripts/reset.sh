# remove db data
rm -r data

# reset meteor services
(cd services/about && meteor reset)
(cd services/webapp && meteor reset)
(cd services/database && meteor reset)
(cd services/psi4 && meteor reset)
(cd services/image-generator && meteor reset)

# setup
./scripts/setup.sh
