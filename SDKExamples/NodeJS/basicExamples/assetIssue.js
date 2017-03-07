/// Title   : assetIssue.js
/// Purpose : Issue amount of assets and assign them to an account
/// Author  : Gary de Beer
/// Creation: 24/01/2017
/// Updated : 27/01/2017
/// Usage   : node assetIssue.js assetAlias accountAlias assetAmount
/// Notes   : The values in the variables below are specific to a private instance of Chain
///           They need to be replaced if using in another environment.

const chain = require('chain-sdk')

const baseurl = 'http://41.76.226.170:1999'
const hsmurl = baseurl + '/mockhsm'
const clienttoken = 'AppDev:bd274a89e0d8fbe31d62a04353d83678c4c42acddf94420607bb6c0e5c28ffc5'

const client = new chain.Client(baseurl, clienttoken)
const hsmConnection = new chain.Connection(hsmurl, clienttoken)
const signer = new chain.HsmSigner()


var argv = require('minimist')(process.argv.slice(2));

var assetAlias = argv._[0];
var accountAlias = argv._[1];
var assetAmount = argv._[2];
var quorumKeys = argv._[3];

var signKeyAlias = [];

for (var k = 1; k <= quorumKeys; k++) {
  signKeyAlias.push(assetAlias + k);
  //signKeyAlias.push('BankservCoinKey');
}

console.log('client is', client)
console.log('Intention: Issue ' + assetAmount + ' ' + assetAlias + ' and give it to ' + accountAlias + ' signing with ' + signKeyAlias.length + ' keys.')
let signKey

Promise.all([
    client.mockHsm.keys.queryAll({
      aliases: signKeyAlias
    }, (key, next, done) => {
      signer.addKey(key.xpub, hsmConnection)
      console.log('key: ' + key.alias + ' : ' + key.xpub)
      console.log(signer.signers);
      next()
    })
  ])
  .then(() =>
    client.transactions.build(builder => {
      builder.issue({
        assetAlias: assetAlias,
        amount: assetAmount
      })
      builder.controlWithAccount({
        accountAlias: accountAlias,
        assetAlias: assetAlias,
        amount: assetAmount
      })
    }).then(issuance => signer.sign(issuance))
    .then(function (signed) {
      console.log(signed)
      console.log(signed.signingInstructions[0].witnessComponents[0])
      client.transactions.submit(signed)
        .then(function (result) {
          console.log(result)
          return result
        })
        .catch(function (err) {
          console.log(err)
          return err
        })
    })
    .catch(err => process.nextTick(() => {
      throw err
    })));