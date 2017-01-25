/**
 * Created by vikassaryal on 24/1/17.
 */
var Promise = require('promise')
const chain = require('chain-sdk')
const client = new chain.Client()
console.log('client is', client)
//let assetKey,aliceKey, bobKey
const signer = new chain.HsmSigner()
//const key = '5971253debbf683e1810d44216efdf5f27a6fd22ab0a42a1997a861fb7a0224bab00b9e0083bdb950ea623505975d562a6c7e7f5e87a3d365f1960804140c48c'
//signer.addKey(key, client.mockHsm.signerConnection)
let signKey
var signKeyAlias = 'aliceKey';
client.mockHsm.keys.queryAll({
    aliases: ['aliceKey']
}, (key, next, done) => {
    if (key.alias == signKeyAlias) {
        signKey = key.xpub
        signer.addKey(signKey, client.mockHsm.signerConnection)
        console.log('signers are :', signer.signers)
    }
    next()
}).then(
    client.transactions.build(builder => {
        builder.issue({
            assetAlias: 'gold',
            amount: 100
        })
        builder.controlWithAccount({
            accountAlias: 'alice',
            assetAlias: 'gold',
            amount: 100
        })
    })).then(issuance => {
        return signer.sign(issuance)
    }).then(signed => {
        return client.transactions.submit(signed)
    }).then(result => console.log(result)).catch(err =>  process.nextTick(() => { throw err }))
// endsnippet