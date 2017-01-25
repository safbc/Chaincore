const chain = require('chain-sdk')

const client = new chain.Client()
const signer = new chain.HsmSigner()

let callback = (err, data) => {
    // operate on data
    console.log(data)
}

chain.transactions.query({}, callback)
