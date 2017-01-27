/// Title   : accountList.js
/// Purpose : List accounts in the blockchain with optional Alias filter
/// Author  : Gary de Beer @ BankservAfrica
/// Date    : 25/01/2017
/// Usage   : node accountList.js [accountAlias]
///         : The values in the variables below are specific to a private instance of Chain
///           They need to be replaced if using in another environment.

const baseurl = 'http://172.16.101.93:1999'
const clienttoken = 'nodejsclient:6fdbf32d489770615c906087fbea3dbdc0a89bada87811cb4afcc5123464ccd9'

const client = new chain.Client(baseurl, clienttoken)
const signer = new chain.HsmSigner()

var argv = require('minimist')(process.argv.slice(2));

var accountAlias = argv._[0];

client.accounts.queryAll({ filter: 'alias=$1', filterParams: [accountAlias] }, (account, next, done) => {
    console.log('Account: ' + account.id + ' (' + account.alias + ')');
});