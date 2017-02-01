/// Title   : assetList.js
/// Purpose : List assets in the blockchain with optional Alias filter
/// Author  : Gary de Beer
/// Date    : 25/01/2017
/// Updated : 27/01/2017
/// Usage   : node assetList.js [assetAlias]
/// Notes   : The values in the variables below are specific to a private instance of Chain
///           They need to be replaced if using in another environment.

const chain = require('chain-sdk')

const baseurl = 'http://172.16.101.93:1999'
const clienttoken = 'nodejsclient:6fdbf32d489770615c906087fbea3dbdc0a89bada87811cb4afcc5123464ccd9'

const client = new chain.Client(baseurl, clienttoken)

var argv = require('minimist')(process.argv.slice(2));

var assetAlias = argv._[0];

var signKeyAlias = 'OriginKey';

console.log('Intention: List Assets in system')
if (assetAlias == undefined) {
    client.asset.queryAll({}, (asset, next, done) => {
        console.log('Asset: ' + asset.id + ' (' + asset.alias + ')')
        next()
    });
} else {
    client.asset.queryAll({ filter: 'alias=$1', filterParams: [assetAlias] }, (asset, next, done) => {
        console.log('Asset: ' + asset.id + ' (' + asset.alias + ')')
        next()
    });
}
