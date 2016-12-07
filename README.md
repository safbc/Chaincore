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

### Additional Documentation Links

* **RESTful API** - https://github.com/chain/chain/blob/main/core/api-spec.md
