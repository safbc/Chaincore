const chain = require('chain-sdk')

var async = require('async');

const baseurl = 'http://172.16.101.93:1999'
const clienttoken = 'nodejsclient:6fdbf32d489770615c906087fbea3dbdc0a89bada87811cb4afcc5123464ccd9'

const client = new chain.Client(baseurl, clienttoken)
const signer = new chain.HsmSigner()

var argv = require('minimist')(process.argv.slice(2));

var accountAlias = argv._[0];
var keyAlias = accountAlias + 'Key';
var keyList = [];
var accountList = [];
var accountKey = void 0,
  accountId = void 0;


/// Get HSM key
client.mockHsm.keys.queryAll({ aliases: [keyAlias] }, (key, next, done) => {
  keyList.push(key)
}).then(() =>
  Promise.all([function () {
    if (keyList.length != 1) {
      client.mockHsm.keys.create({ alias: keyAlias })
        .then(key => {
          keyList.push(key);
          console.log('KeyList length: ' + keyList.length);
        })
    }
  }])
  ).then(() =>
    /// Get Account list
    client.accounts.queryAll({ filter: 'alias=$1', filterParams: [accountAlias] }, (account, next, done) => {
      console.log(account);
      accountList.push(account)
      next()
    })
  ).then(() => {
    if (accountList.length != 1) {
      // If account doesn't exist create account
      client.accounts.create({ alias: accountAlias, rootXpubs: [accountKey.xpub], quorum: 1 }).then(accounts => {
        accountId = accounts[0].id;
        console.log("Account created: " + accountId + "(" + accountAlias + ")");
      });
    }
    else {
      console.log("Account already exists.");
    }

  });
