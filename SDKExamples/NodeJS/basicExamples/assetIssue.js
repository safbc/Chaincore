/**
 * Title   : assetIssue.js
 * Purpose : Issue amount of assets and assign them to an accountAlias
 * Author  : Gary de Beer
 * Creation: 24/01/2017
 * Updated : 27/01/2017
 * Usage   : node assetIssue.js assetAlias accountAlias assetAmount quorumKeys
 * Notes   : Insert your node specific connection and token details below.
 *           This program assumes that multiple keys using the assetAlias as the base where created when the asset was defined.
 *           eg. assetAlias = "MyAsset" with key(s) [MyAssetKey1, MyAssetKey2, MyAssetKey3 etc.]
 */

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
  signKeyAlias.push(assetAlias + 'Key' + k);
  //signKeyAlias.push('BankservCoinKey');
}

//console.log('client is', client)
console.log('Intention: Issue ' + assetAmount + ' ' + assetAlias + ' and give it to ' + accountAlias + ' signing with ' + signKeyAlias.length + ' keys.')
//let signKey

Promise.all([
    client.mockHsm.keys.queryAll({
      aliases: signKeyAlias
    }, (key, next, done) => {
      signer.addKey(key.xpub, hsmConnection)
      console.log('key: ' + key.alias + ' : ' + key.xpub)
      console.log('\nSigner:\n');
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
      console.log('\nSigned output:\n');
      console.log(signed)
      console.log('\nContents of  \'signed.signingInstructions[0].witnessComponents[0]\'\n');
      console.log(signed.signingInstructions[0].witnessComponents[0])
      client.transactions.submit(signed)
        .then(function (result) {
          console.log(result)
          return result
        })
        .catch(function (err) {
          console.log('\nError Output:\n');

          console.log(err)
          return err
        })
    })
    .catch(err => process.nextTick(() => {
      throw err
    })));