echo "
Welcome to

  _____ ____  ____   ____  ____    ____  ____   _       ___     __  __  _ 
 / ___/|    \|    \ |    ||    \  /    ||    \ | |     /   \   /  ]|  |/ ]
(   \_ |  o  )  D  ) |  | |  _  ||   __||  o  )| |    |     | /  / |  ' / 
 \__  ||   _/|    /  |  | |  |  ||  |  ||     || |___ |  O  |/  /  |    \ 
 /  \ ||  |  |    \  |  | |  |  ||  |_ ||  O  ||     ||     /   \_ |     
 \    ||  |  |  .  \ |  | |  |  ||     ||     ||     ||     \     ||  .  |
  \___||__|  |__|\_||____||__|__||___,_||_____||_____| \___/ \____||__|\_|


The South African Private Blockchain Network


This script starts a daemon instance of the latest Chain Core Developer Edition node in a Docker vm
The instance is configured for default settings.

# Script name       : docker-chain-daemon.sh
# Author            : Gary De Beer (BankservAfrica)
# Last Modifiy Date : 26/10/2016 

#USAGE NOTES:
===========

This script is installed as part of springblock/Chaincore Git repo and requires all 
files from that repo to be present in the path as configured in the WORKDIR variable below. 

See the Git repo instructions under "Starting the Chain Core Node"

Please also make appropriate changes to the WORKDIR value below for your environment.

Once the node is running you can access the Web gui at the specified URL

"

# remove any previous version of the docker image
docker rm chain

# get IPs from ifconfig and dig and display for information
LOCALIP=$(ifconfig | grep 'inet ' | grep -v '172.17' | head -n1 | awk '{print $2}' | cut -d':' -f2)
#IP=$(dig +short myip.opendns.com @resolver1.opendns.com)

echo "Local IP: $LOCALIP"
#echo "Public IP: $IP"

#Set up operation parameters - change these as required

#DO NOT CHANGE THESE VALUES
PORT=1999
WORKDIR="/Chaincore/node"
CHAINDATA="$WORKDIR/data"
CHAINLOGS="$WORKDIR/logs"

if [ ! -d "$WORKDIR" ]; then
mkdir $WORKDIR
mkdir $CHAINDATA
mkdir $CHAINLOGS
fi


# Display the settings being used on startup
echo "Startup parameters: (edit script to alter)"
echo "WORKDIR    = $WORKDIR"
echo "DATA       = $POSTGRESS"
echo "LOGS       = $CHAINLOG"

echo " 

Starting up node...

"
docker run -d --name chain \
    --network="host" \
    -v $CHAINDATA:/var/lib/postgresql/data -v $CHAINLOGS:/var/log/chain \
    -p $PORT:$PORT \
    chaincore/developer 

echo "

Client token:"
tail $CHAINLOGS/client-token
#tail $CHAINLOGS/init.log

echo "

Web GUI: http://$LOCALIP:1999/"
#tail -f $CHAINLOGS/cored.log
