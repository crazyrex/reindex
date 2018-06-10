

## Installation

The reindex project is built by two repositories - this one and [reindex-api](http://github.com/linnovate/reindex-api).  
Reindex is a cloud native application - built to be run with docker and a docker orchestrator (docker-compose , kubernetes)
To build the neccesary dockers you need to clone both repsitories in the same directory  
```git clone git@github.com:linnovate/reindex.git && git git@github.com:linnovate/reindex-api.git ```    
``` cd reindex ```  

Rename env-example to .env  
``` mv env-example .env```  
Build the docker compose file and start the services
``` ./build.sh```

## Credits
- Client side Forked from - React Universal Saga
