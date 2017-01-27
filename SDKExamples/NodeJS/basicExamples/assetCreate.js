/// Title   : assetCreate.js
/// Purpose : Create a new asset in the blockchain
/// Author  : Gary de Beer
/// Date    : 24-01-2017
/// Updated : 27/01/2017
/// Usage   : node assetCreate.js assetAlias assetType
/// Notes   : The values in the variables below are specific to a private instance of Chain
///           They need to be replaced if using in another environment.


const chain = require('chain-sdk')

const baseurl = 'http://172.16.101.93:1999'
const clienttoken = 'nodejsclient:6fdbf32d489770615c906087fbea3dbdc0a89bada87811cb4afcc5123464ccd9'

const client = new chain.Client(baseurl, clienttoken)


var argv = require('minimist')(process.argv.slice(2));

var assetAlias = argv._[0];
var assetType = argv._[1];

var signKeyAlias = 'OriginKey';

//console.log('client is', client)
console.log('Intention: Create asset \'' + assetAlias + '\'')
let signKey

Promise.all([
    client.mockHsm.keys.queryAll({ aliases: [signKeyAlias] }, (key, next, done) => {
        if (key.alias == signKeyAlias) {
            signKey = key.xpub
        }
        next()
    })])
    .then(() =>
        Promise.all([
            client.assets.create({
                alias: assetAlias,
                rootXpubs: [signKey],
                quorum: 1,
                definition: { 'Type': assetType }
            })]))
    .then(() => {
        client.assets.queryAll({ filter: 'alias=$1', filterParams: [assetAlias] }, (asset, next, done) => {
            console.log(asset);
        })
    })