# Reindex 
Reindex lets you upload a csv and use it's data to build an (really fast) index site.  
It uses react,node, mongodb and elasticsearch and is built to provide subsecond, seo driven index sites.  

# Prerequisites
docker , docker-compose  
Currently tested only on Linux and OSX 
# Installation 
```
mkdir reindex-repos
cd reindex-repos
git clone https://github.com/linnovate/reindex.git
git clone https://github.com/linnovate/reindex-api.git
cd reindex
mv env-example .env
modified name project  
source .env
docker-compose up --build -d
```

# Credits
 - This repository is forked from the awesome [react-universal-saga](https://github.com/xkawi/react-universal-saga/blob/master/README.md) project
 - Orit Rivka and Yehudit that helped create this boilerplate  
 - Israel David Isidor that sponsered the translation and rebuilding of the repository.
 - Avreimi Kliger that let us build the awesome (http://402.co.il ) site.


