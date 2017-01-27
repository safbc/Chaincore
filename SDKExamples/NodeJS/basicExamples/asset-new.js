/// Title   : asset-new.js
/// Purpose : Create a new asset in the blockchain
/// Author  : Gary de Beer
/// Date    : 24-01-2017
/// Usage   : node asset-new.js assetAlias


const chain = require('chain-sdk')

const baseurl = 'http://172.16.101.93:1999'
const hsmbaseurl = 'http://172.16.101.93:1999/mockhsm'
const clienttoken = 'nodejsclient:6fdbf32d489770615c906087fbea3dbdc0a89bada87811cb4afcc5123464ccd9'

const client = new chain.Client(baseurl, clienttoken)
client.mockHsm.signerConnection = { baseUrl: hsmbaseurl, token: clienttoken }
const signer = new chain.HsmSigner()

var argv = require('minimist')(process.argv.slice(2));

var assetAlias = argv._[0];

var signKeyAlias = 'OriginKey';

//console.log('client is', client)
console.log('Intention: Create asset \'' + assetAlias + '\'')
let signKey

Promise.all([
    client.mockHsm.keys.queryAll({ aliases: [signKeyAlias] }, (key, next, done) => {
        if (key.alias == signKeyAlias) {
            signKey = key.xpub
            signer.addKey(signKey, client.mockHsm.signerConnection)
        }
        next()
    })])
    .then(() =>
        Promise.all([
            client.assets.create({
                alias: assetAlias,
                rootXpubs: [signKey],
                quorum: 1,
                definition: { "Type": "Commodity" }
            })]))
    .then(() => {
        client.assets.queryAll({ filter: 'alias=$1', filterParams: [assetAlias] }, (asset, next, done) => {
            console.log(asset);
        })
    })