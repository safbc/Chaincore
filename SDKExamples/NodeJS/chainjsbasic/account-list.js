const chain = require('chain-sdk')

var async = require('async');

const baseurl = 'http://172.16.101.93:1999'
const clienttoken = 'nodejsclient:6fdbf32d489770615c906087fbea3dbdc0a89bada87811cb4afcc5123464ccd9'

const client = new chain.Client(baseurl, clienttoken)
const signer = new chain.HsmSigner()


var aliceAlias = 'alice-';


var aliceKey = void 0,
    aliceId = void 0;

client.accounts.queryAll({ filter: 'alias=$1', filterParams: ['alice-'] }, (account, next, done) => {
    console.log('Account ' + account.id + ' (' + account.alias + ')');
});
