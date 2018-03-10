echo "Setting up Mongodb..."
./scripts/setup/mongo-setup.sh

echo "Installing Packages for about-service..."
(cd services/about && meteor npm install)

echo "Installing Packages for database-service..."
(cd services/database && meteor npm install)

echo "Installing Packages for webapp-service..."
(cd services/webapp && meteor npm install)
