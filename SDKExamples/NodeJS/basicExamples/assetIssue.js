/// Title   : assetIssue.js
/// Purpose : Issue amount of assets and assign them to an account
/// Author  : Gary de Beer
/// Creation: 24/01/2017
/// Updated : 27/01/2017
/// Usage   : node assetIssue.js assetAlias accountAlias assetAmount
/// Notes   : The values in the variables below are specific to a private instance of Chain
///           They need to be replaced if using in another environment.

const chain = require('chain-sdk')

const baseurl = 'http://172.16.101.93:1999'
const hsmurl = baseurl + '/mockhsm'
const clienttoken = 'nodejsclient:6fdbf32d489770615c906087fbea3dbdc0a89bada87811cb4afcc5123464ccd9'

const client = new chain.Client(baseurl, clienttoken)
const hsmConnection = new chain.Connection(hsmurl, clienttoken)
const signer = new chain.HsmSigner()

var argv = require('minimist')(process.argv.slice(2));

var assetAlias = argv._[0];
var accountAlias = argv._[1];
var assetAmount = argv._[2];

var signKeyAlias = 'OriginKey';

console.log('client is', client)
console.log('Intention: Issue ' + assetAmount + ' ' + assetAlias + ' and give it to ' + accountAlias)
let signKey

Promise.all([
    client.mockHsm.keys.queryAll({ aliases: [signKeyAlias] }, (key, next, done) => {
        if (key.alias == signKeyAlias) {
            signKey = key.xpub
            signer.addKey(signKey, hsmConnection)
            console.log(signer.signers)
        }
        next()
    })])
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
            .then(signed => client.transactions.submit(signed))
            .then(result => console.log(result))
    ).catch(err => process.nextTick(() => { throw err }))
