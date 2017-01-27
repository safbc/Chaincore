/// Title   : account-new.js
/// Purpose : Create accounts in the blockchain with Alias
/// Author  : Gary de Beer @ BankservAfrica
/// Creation: 24/01/2017
/// Updated : 27/01/2017
/// Usage   : node account-new.js [accountAlias]
///         : The values in the variables below are specific to a private instance of Chain
///           They need to be replaced if using in another environment.

const baseurl = 'http://172.16.101.93:1999'
const clienttoken = 'nodejsclient:6fdbf32d489770615c906087fbea3dbdc0a89bada87811cb4afcc5123464ccd9'

const client = new chain.Client(baseurl, clienttoken)

var argv = require('minimist')(process.argv.slice(2));

var accountAlias = argv._[0];
var keyAlias = 'OriginKey';
var accountId = void 0;
let signKey

/// Get HSM key - should be looking for key associated with account, but default key will do.
Promise.all([
  client.mockHsm.keys.queryAll({ aliases: [keyAlias] }, (key, next, done) => {
    if (key.alias == keyAlias) {
      signKey = key.xpub
    }
    next()
  })])
  .then(() =>
    client.accounts.create({ alias: accountAlias, rootXpubs: [signKey], quorum: 1 }).then(accounts => {
      accountId = accounts[0].id;
      console.log("Account created: " + accountId + "(" + accountAlias + ")");
    })

  );
