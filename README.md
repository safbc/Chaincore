# About Springblock Chaincore
This is an exploratory project that will be used for research into using Chain Core Developer Edition as a blockchain platform.

## About Chain Core Developer Edition
Chain Core Developer Edition is a free, downloadable version of Chain Core that is open source and licensed under the AGPL. Individuals and organizations use Chain Core Developer Edition to learn, experiment, and build prototypes.

Chain Core Developer Edition can be run locally on Mac, Windows, or Linux to create a new blockchain network, connect to an existing blockchain network, or connect to the public Chain testnet, operated by Chain, Microsoft, and Cornell University’s IC3.

For more information about how to use Chain Core Developer Edition, see the docs: https://chain.com/docs

## Quick Start

### Docker
The fastest way to get a Chain node up and running is to use a Docker. A sample start script and more details are available in the ``docker`` folder.

The docker instance also includes full Chain documentation which is accessible via the web based interface after start up.
```
http://localhost:1999/docs
```

### Version upgrade notes
As Chain release newer versions of the Developer Edition, you will need to upgrade the docker image (and sometimes delete and reconfigure the data store).

To get the latest docker image version
```
sudo docker pull chaincore/developer:latest
```

When there is a breaking change in Chaincore, then you will need to delete all of your node's data to re-install. 
Remove all files and folders from the configured **`$CHAINDATA`** and **`$CHAINLOGS`** folders on your host server.

### Traditional instance
To install and run a host instance of Chain please see the official Chain repo documentation @ https://github.com/chain/chain

## Chain basics

### Components
The Chain based system consists of the following software components:
* Chain application (written in the GO language)
* Postgress based database
* Hardware Security Module (The DE provides a software emulated version for development)

### Functional Architecture
A node instance in a Chain network can be one of two types:

* **Generator** Node

   There is always one **Generator** node in the network and is the first to be configured.
   The **Generator** node is responsible for the establishment of the network identity and the creation of new blocks.

* **Participant** Node (also known as a Signer)

   All other nodes in a network are **Participant** type nodes and perform the function of block validation and local network interface.
   **Participant** nodes require authentication access keys in order to join a Chain network.

### Developing on Chaincore

* **Download Chain Core SDKs** - https://chain.com/docs/core/get-started/sdk

   SDKs for Java, Ruby and NodeJS are available.

* **Recommended Tools**

* NodeJS

  The examples I have provided where develped using Microsoft's Visual Studio Code (https://code.visualstudio.com/download).
  This editor is great because it really fast, customizable and runs on just about any OS.
