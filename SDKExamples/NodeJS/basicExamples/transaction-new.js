/// Title   : transaction-new.js
/// Purpose : Create transaction to spend from one account to another
/// Author  : Gary de Beer
/// Date    : 25/01/2017
/// Usage   : node transaction-new.js accountFrom accountTo assetAlias assetAmount
/// Notes   : The values in the variables below are specific to a private instance of Chain
///           They need to be replaced if using in another environment.
/// NOTE      This code will not work against a remote node due to unresolved bug in chain-sdk/core

const chain = require('chain-sdk')

const baseurl = 'http://172.16.101.93:1999'
const hsmurl = baseurl + '/mockhsm'
const clienttoken = 'nodejsclient:6fdbf32d489770615c906087fbea3dbdc0a89bada87811cb4afcc5123464ccd9'

const client = new chain.Client(baseurl, clienttoken)
client.mockHsm.signerConnection = { baseUrl: hsmurl, token: clienttoken }
const signer = new chain.HsmSigner()

var argv = require('minimist')(process.argv.slice(2));

var accountFrom = argv._[0];
var accountTo = argv._[1];
var assetAlias = argv._[2];
var assetAmount = argv._[3];

var signKeyAlias = 'OriginKey';

//console.log('client is', client)
console.log('Intention: Spend ' + assetAmount + ' ' + assetAlias + ' from ' + accountFrom + ' and give it to ' + accountTo)

// TODO: Implement actual code.