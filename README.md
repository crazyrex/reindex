

## Installation


Reindex is a cloud native application - built to be run with docker and a docker orchestrator (docker-compose , kubernetes)

Rename env-example from src/api to .env  
``` mv env-example .env```  
Build the docker compose file and start the services  
``` ./build.sh```  

## Credits
- Client side Forked from - React Universal Saga

if you want to update the app:
cd src/app
git init
git remote add app <your new git repo>
git add .
git commit -m "Initial commit"
git push -u app master