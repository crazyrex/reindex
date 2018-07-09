#!/bin/bash
source .env &&
if [ ! -d "src/app" ]; then
  cd src &&
  git clone $REINDEX_APP app &&
  cd app &&
  cd ../..
fi
echo "Building the app. Please wait" &&
sudo COMPOSE_PROJECT_NAME=$PROJECT_NAME docker-compose up --build -d &&
sleep 30 &&
echo "Done building the app, now performing some modifications." &&

# todo - should be based on container named from .env
sudo docker exec $PROJECT_NAME-rabbit bash -c 'rabbitmq-plugins enable rabbitmq_management' &&
sudo docker exec $PROJECT_NAME-api bash -c 'sh tools/catMapping.sh && sh tools/recordsMapping.sh' &&
sudo docker restart $PROJECT_NAME-api