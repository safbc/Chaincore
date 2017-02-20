echo "
Welcome to

  _____ ____  ____   ____  ____    ____  ____   _       ___     __  __  _
 / ___/|    \|    \ |    ||    \  /    ||    \ | |     /   \   /  ]|  |/ ]
(   \_ |  o  )  D  ) |  | |  _  ||   __||  o  )| |    |     | /  / |  ' /
 \__  ||   _/|    /  |  | |  |  ||  |  ||     || |___ |  O  |/  /  |    \
 /  \ ||  |  |    \  |  | |  |  ||  |_ ||  O  ||     ||     /   \_ |
 \    ||  |  |  .  \ |  | |  |  ||     ||     ||     ||     \     ||  .  |
  \___||__|  |__|\_||____||__|__||___,_||_____||_____| \___/ \____||__|\_|


The South African Blockchain Working Group Network


This script starts a daemon instance of the BlockEx API Server (NodeJS) in a Docker vm
The instance is configured for default settings.

This server provides the interface between the BockEx mobile App and its specified
Chain Core node, as well as a persistent data store for the BlockEx Trading application.

# Script name       : docker-chain-blockex-api.sh
# Author            : Gary De Beer (BankservAfrica)
# Last Modifiy Date : 20/02/2017

#USAGE NOTES:
=============

This script is installed as part of springblock/Chaincore Git repo and requires all
files from that repo to be present in the path as configured in the WORKDIR variable below.

See the Git repo instructions under "Starting the Chain Core Node"

Please also make appropriate changes to the WORKDIR value below for your environment.

Once the node is running you can access the Web gui at the specified URL

"

# remove any previous version of the docker image
docker rm blockex-api

# get IPs from ifconfig and dig and display for information
LOCALIP=$(ifconfig | grep 'inet ' | grep -v '172.17' | head -n1 | awk '{print $2}' | cut -d':' -f2)
#IP=$(dig +short myip.opendns.com @resolver1.opendns.com)

echo "Local IP: $LOCALIP"
#echo "Public IP: $IP"

#Set up operation parameters - change these as required

#DO NOT CHANGE THESE VALUES
PORT=1999
WORKDIR="/Chaincore/blockex"
APIDATA="$WORKDIR/data"

if [ ! -d "$WORKDIR" ]; then
 mkdir $WORKDIR
 if [ ! -d "$APIDATA" ]; then
  mkdir $APIDATA
#  mkdir $CHAINLOGS
 fi
fi


# Display the settings being used on startup
echo "Startup parameters: (edit script to alter)"
echo "WORKDIR    = $WORKDIR"
echo "DATA       = $APIDATA"
#echo "LOGS       = $CHAINLOGS"

echo "

Starting up API server...

"
docker run -d --name chain \
    --network="host" \
    -v $APIDATA:/data \
    -p $PORT:$PORT \
    springblock/blockex-api:latest

echo "

Please wait a few  seconds for the server to start:

docker logs blockex-api

"

echo "

Access the Swagger documentation interface at: http://$LOCALIP:$PORT/docs

"

