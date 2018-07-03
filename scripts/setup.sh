echo "Setting up MongoDB..."
./scripts/setup/mongo-setup.sh

echo "Installing packages for database-service..."
(cd services/database && meteor npm install)

echo "Installing packages for psi4-service..."
(cd services/psi4 && meteor npm install)

echo "Installing packages for pyscf-service..."
(cd services/pyscf && meteor npm install)

echo "Installing packages for webapp-service..."
(cd services/webapp && meteor npm install)

echo "Installing packages for image-generator-service..."
(cd services/image-generator && meteor npm install)
