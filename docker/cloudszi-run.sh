# Load Environment Variables
set -a
source variables.env
if [ -f ./user-variables.env ]; then
    source user-variables.env
fi

# Run Docker Compose
docker-compose up >/dev/null 2>&1 & disown
docker-compose logs --tail=100 --follow
