#!/bin/bash
sudo docker-compose up --build -d && echo @@@@@@@@@@@@@ done with docker-compose up @@@@@@@@@@@  && sleep 30 && echo @@@@@@@@@@@@2 done with sleeping @@@@@@@@@@@@ && sudo docker restart reindex-api && echo @@@@@@@@@@@@ done with restart reindex-api @@@@@@@@@@@@@ 


