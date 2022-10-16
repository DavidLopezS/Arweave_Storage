# README #

This repository will store all the Proof Of Concept projects that are conducted on the marketplace team.

### Proof Of Concept folders ###

* Arweave-Storage-Solution_POC

### Arweave-Storage-Solution_POC ###

This folder consists in two js projects than upload any kind of file to Arweave permaweb. 

 * sendDataTxBndlr.js uploads data through Bndlr tool.
 * sendDataTxAr.js uploads data through arweave-js sdk.
 
In order to run them you must enter through terminal the following commands:

 * ```yarn sendDataTxBndlr``` for the Bndlr example.
 * ```yarn sendDataTxAr```for the arweave-js sdk.
 
The Bndlr project can be changed for devnet and permaweb uploads. The arweave-js part is only executable on arlocal, so if you want to test it open a new
terminal and run the following command ```bash npx arlocal```.

The following packages must be installed in order to run this projects:

 * ```npm install arweave```.
 * ```npm install -g @bundlr-network/client```.
 * ```npm i dotenv```.
 * ```npm install ar-gql``` of ```yarn add ar-gql```.