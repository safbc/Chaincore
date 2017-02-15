'use strict';

exports.createAccount = function (args, res, next) {
  /**
   * Create new account on local node.
   *
   * request ChainRequest ChainRequest object with Connection and Account properties specified. (optional)
   * returns List
   **/

  const chain = require('chain-sdk');

  var request = args.request.value;

  // set up chain node connection properties
  const baseurl = request.connection.nodeURL;
  const clienttoken = request.connection.clientToken

  // Create new chain client connection
  const client = new chain.Client(baseurl, clienttoken)

  var accountAlias = request.account.alias;

  // TODO: Cater for multiple keys
  var keyAlias = '';
  if (request.account.keys.length == 0) {
    keyAlias = accountAlias + "Key";
  } else {
    keyAlias = request.keys[0].alias;
  }

  var quorum = request.account.quorum;
  var tags = request.account.tags;
  var accountId = void 0;
  let signKey;
  var accounts = [];
  var xpubs = [];

  Promise.all([
    client.mockHsm.keys.create({ alias: keyAlias }),
  ])
    .then(keys => {
      signKey = keys[0].xpub
      xpubs.push(signKey);
      console.log("Key created: " + signKey)
    })
    .then(() =>
      client.accounts.create({ alias: accountAlias, rootXpubs: xpubs, quorum: quorum, tags: tags }).then(account => {
        accountId = account.id;
        console.log("Account created: " + accountId + "(" + accountAlias + ")");
        if (accountId != 0) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(account || {}, null, 2));
        } else {
          res.end();
        }
      })

    ).catch(console.log.bind(console));
}



exports.getAccounts = function (args, res, next) {
  /**
   * Gets list of local accounts. If Account properties provided, will attempt search
   *
   * request ChainRequest ChainRequest object with Connection and optional Account properties specified. (optional)
   * returns List
   **/

  const chain = require('chain-sdk');

  var request = args.request.value;

  // set up chain node connection properties
  const baseurl = request.connection.nodeURL;
  const clienttoken = request.connection.clientToken

  // define chain client connection
  const client = new chain.Client(baseurl, clienttoken)

  var accounts = [];
  var filter = '';
  // Is this going to be filtered search or not?

  if (request.account.alias == undefined) {
    client.accounts.queryAll({}, (account, next, done) => {
      console.log('Account: ' + account.id + ' (' + account.alias + ')')
      accounts.push(account)
      next()
    })
      .then(() => {
        if (accounts.length > 0) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(accounts || {}, null, 2));
        } else {
          res.end();
        }
      });
  } else {
    client.accounts.queryAll({ filter: 'alias=$1', filterParams: [request.account.alias] }, (account, next, done) => {
      console.log('Account: ' + account.id + ' (' + account.alias + ')')
      accounts.push(account)
      next()
    })
      .then(() => {
        if (accounts.length > 0) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(accounts || {}, null, 2));
        } else {
          res.end();
        }
      }).catch(console.log.bind(console));
  }

  // var examples = {};
  // examples['application/json'] = [{
  //   "keys": [{
  //     "accountXpub": "48764b4efe18bbf1c3ad9f60ab60a5eb6f6a8d72d560bdf07e261d4a707cd50244db49b4e64547a2686bc3eb282815bf1337cab4a3343ea1c95948b81e6f3df0",
  //     "accountDerivationPath": ["AQYAAAAAAAAA"],
  //     "rootXpub": "4abb21e69072a7b17357cc514847f556afd6e007a7c92ef4f898208c1103212aef4d36e42441888cd25d5e7d61a13a2811777c0b2f25ce66abb898141abe8f4a",
  //     "alias": "aeiou"
  //   }],
  //   "controlProgram": "766baa20f19b55122a0404313b57fbdab7b59548a311dcf2fcf538f1d7cc025ca625e52b5151ad696c00c0",
  //   "quorum": "aeiou",
  //   "alias": "BobAccount1",
  //   "id": "acc0RSDADNVG0804",
  //   "tags": "{}"
  // }];
  // if (Object.keys(examples).length > 0) {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  // } else {
  //   res.end();
  // }
}

exports.getAssets = function (args, res, next) {
  /**
   * Gets list of local assets. If Asset properties provided, will attempt search
   *
   * request ChainRequest ChainRequest object with Connection and optional Asset properties specified. (optional)
   * returns List
   **/
  // TODO: Search on either Alias or Id

  const chain = require('chain-sdk');

  var request = args.request.value;

  // set up chain node connection properties
  const baseurl = request.connection.nodeURL;
  const clienttoken = request.connection.clientToken

  // define chain client connection
  const client = new chain.Client(baseurl, clienttoken)

  var assets = [];
  var filter = '';

  // Is this going to be filtered search or not?
  if (request.asset.alias == undefined) {
    client.assets.queryAll({}, (asset, next, done) => {
      console.log('Asset: ' + asset.id + ' (' + asset.alias + ')')
      assets.push(asset)
      next()
    })
      .then(() => {
        if (assets.length > 0) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(assets || {}, null, 2));
        } else {
          res.end();
        }
      }).catch(console.log.bind(console));
  } else {
    client.assets.queryAll({ filter: 'alias=$1', filterParams: [request.asset.alias] }, (asset, next, done) => {
      console.log('Asset: ' + asset.id + ' (' + asset.alias + ')')
      assets.push(asset)
      next()
    })
      .then(() => {
        if (assets.length > 0) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(assets || {}, null, 2));
        } else {
          res.end();
        }
      }).catch(console.log.bind(console));
  }




  // var examples = {};
  // examples['application/json'] = [{
  //   "keys": [{
  //     "accountXpub": "48764b4efe18bbf1c3ad9f60ab60a5eb6f6a8d72d560bdf07e261d4a707cd50244db49b4e64547a2686bc3eb282815bf1337cab4a3343ea1c95948b81e6f3df0",
  //     "accountDerivationPath": ["AQYAAAAAAAAA"],
  //     "rootXpub": "4abb21e69072a7b17357cc514847f556afd6e007a7c92ef4f898208c1103212aef4d36e42441888cd25d5e7d61a13a2811777c0b2f25ce66abb898141abe8f4a",
  //     "alias": "aeiou"
  //   }],
  //   "quorum": "aeiou",
  //   "alias": "BlockCoin",
  //   "definition": "{}",
  //   "id": "227f376b170560cc3c3243e09de3560b2ba732a9522217b3d87d0992a19e5341",
  //   "tags": "{}"
  // }];
  // if (Object.keys(examples).length > 0) {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  // } else {
  //   res.end();
  // }
}

exports.getKeys = function (args, res, next) {
  /**
   * Gets list of local HSM keys.
   *
   * request ChainRequest ChainRequest object with Connection and optional HSMKey properties specified. (optional)
   * returns List
   **/

  const chain = require('chain-sdk');

  var request = args.request.value;

  // set up chain node connection properties
  const baseurl = request.connection.nodeURL;
  const clienttoken = request.connection.clientToken

  // define chain client connection
  const client = new chain.Client(baseurl, clienttoken)

  var keys = [];
  var keyAliases = [];
  var filter = '';

  // Is this going to be filtered search or not?
  if (request.hsmkey.length == 0) {
    client.mockHsm.keys.queryAll({}, (key, next, done) => {
      console.log('Key: ' + key.id + ' (' + key.alias + ')')
      keys.push(key)
      next()
    })
      .then(() => {
        if (keys.length > 0) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(keys || {}, null, 2));
        } else {
          res.end();
        }
      }).catch(console.log.bind(console));
  } else {
    request.hsmkey.forEach(function (key) {
      keyAliases.push(key.alias);
    }, this);
    client.mockHsm.keys.queryAll({ aliases: keyAliases }, (key, next, done) => {
      console.log('Key: ' + key.id + ' (' + key.alias + ')')
      keys.push(key)
      next()
    })
      .then(() => {
        if (keys.length > 0) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(keys || {}, null, 2));
        } else {
          res.end();
        }
      }).catch(console.log.bind(console));
  }

  // var examples = {};
  // examples['application/json'] = [{
  //   "accountXpub": "48764b4efe18bbf1c3ad9f60ab60a5eb6f6a8d72d560bdf07e261d4a707cd50244db49b4e64547a2686bc3eb282815bf1337cab4a3343ea1c95948b81e6f3df0",
  //   "accountDerivationPath": ["AQYAAAAAAAAA"],
  //   "rootXpub": "4abb21e69072a7b17357cc514847f556afd6e007a7c92ef4f898208c1103212aef4d36e42441888cd25d5e7d61a13a2811777c0b2f25ce66abb898141abe8f4a",
  //   "alias": "aeiou"
  // }];
  // if (Object.keys(examples).length > 0) {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  // } else {
  //   res.end();
  // }
}

exports.getTransactions = function (args, res, next) {
  /**
   * Gets list of recent transactions.
   *
   * connection NodeConnection Connection data for Chain Node (optional)
   * returns List
   **/

  // TODO: Convert to ChainRequest query parameter for consistency.
  // TODO: Return fixed number of results? Paginate the result? What order is this returning in?

  const chain = require('chain-sdk');

  var connection = args.connection.value;

  // set up chain node connection properties
  const baseurl = connection.nodeURL;
  const clienttoken = connection.clientToken

  // define chain client connection
  const client = new chain.Client(baseurl, clienttoken)

  var transactions = [];

  client.transactions.queryAll({}, (transaction, next, done) => {
    console.log('Transaction: ' + transaction.id + ')')
    transactions.push(transaction)
    next()
  })
    .then(() => {
      if (transactions.length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(transactions || {}, null, 2));
      } else {
        res.end();
      }
    }).catch(console.log.bind(console));


  // var examples = {};
  // examples['application/json'] = [{
  //   "outputs": [{
  //     "amount": 123,
  //     "purpose": "receive or change",
  //     "asset_is_local": "aeiou",
  //     "account_tags": "{}",
  //     "reference_data": "{}",
  //     "asset_id": "aeiou",
  //     "type": "aeiou",
  //     "asset_definition": "{}",
  //     "account_id": "aeiou",
  //     "asset_tags": "{}",
  //     "position": 123,
  //     "account_alias": "aeiou",
  //     "is_local": "no",
  //     "control_program": "aeiou"
  //   }],
  //   "inputs": [{
  //     "amount": 123,
  //     "asset_is_local": "yes",
  //     "account_tags": "{}",
  //     "reference_data": "{}",
  //     "asset_id": "aeiou",
  //     "type": "aeiou",
  //     "asset_definition": "{}",
  //     "asset_alias": "aeiou",
  //     "account_id": "aeiou",
  //     "spent_output": "{}",
  //     "asset_tags": "{}",
  //     "account_alias": "aeiou",
  //     "is_local": "yes"
  //   }],
  //   "reference_data": "{}",
  //   "id": "af3c8f3e42f35072ab1286225e2b3cd73552b9ce3a3cf3cd936f6e3a9d3f40df",
  //   "block_height": 123,
  //   "position": 123,
  //   "is_local": "no",
  //   "block_id": "aeiou",
  //   "timestamp": "2017-02-09T14:20:24.000Z"
  // }];
  // if (Object.keys(examples).length > 0) {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  // } else {
  //   res.end();
  // }
}

exports.signTransaction = function (args, res, next) {
  /**
   * Submit transaction or sign transaction partial
   *
   * request ChainRequest Request includes Node connection details and transaction information  (optional)
   * returns List
   **/

  const chain = require('chain-sdk');

  var request = args.request.value;

  // set up chain node connection properties
  const baseurl = request.connection.nodeURL;
  const hsmurl = baseurl + '/mockhsm'
  const clienttoken = request.connection.clientToken

  // define chain client connection
  const client = new chain.Client(baseurl, clienttoken)
  const hsmConnection = new chain.Connection(hsmurl, clienttoken)
  const signer = new chain.HsmSigner()

  var keys = [];
  var keyAliases = [];
  var transactions = [];

  var accountSpender = request.transaction.spend.account.alias;
  var assetSpender = request.transaction.spend.asset.alias;
  var amountSpender = request.transaction.spend.amount;
  var accountSpenderXpub = '';

  var accountController = request.transaction.control.account.alias;
  var assetController = request.transaction.control.asset.alias;
  var amountController = request.transaction.control.amount;

  var allowAdditionalActions = request.transaction.allowAdditionalActions;

  //console.log('client is', client)
  console.log('Spend ' + amountSpender + ' ' + assetSpender + ' from ' + accountSpender);
  console.log('in return for ' + amountController + ' ' + assetController + ' from ' + accountController);
  let signKey

  // Step 1:Look up Seller Account information
  //        Get keys[0].rootXpub
  //        Add this xpub to the signer

  client.accounts.queryAll({ filter: 'alias=$1', filterParams: [accountSpender] }, (account, next, done) => {
    accountSpenderXpub = account.keys[0].rootXpub
    console.log('Account: ' + account.alias + ' (' + accountSpenderXpub + ')')
    next()
  })
    .then(() => {
      signer.addKey(accountSpenderXpub, hsmConnection)
      console.log(signer.signers)
    })
    .then(() =>
      // Step 2:Build Transaction template
      //        If this is muti-party phase 2 then add baseTransaction data
      client.transactions.build(builder => {
        // Check if basetransaction was supplied
        if (allowAdditionalActions == 'no' && request.transaction.baseTransaction != undefined) {
          builder.baseTransaction(request.transaction.baseTransaction)
        }
        builder.spendFromAccount({
          accountAlias: accountSpender,
          assetAlias: assetSpender,
          amount: amountSpender
        })
        builder.controlWithAccount({
          accountAlias: accountController,
          assetAlias: assetController,
          amount: amountController
        })
      })
        .then((transaction) => {
          // Step 3:If this is not multi-party transaction
          //        Sign and submit transaction to blockchain
          if (allowAdditionalActions == 'no') {
            signer.sign(transaction, (signed, next) => {
              return client.transactions.submit(signed)
            })
          } else {
            // Step 3:This is multi-party transaction
            //        Set allowAdditionalActions = true
            //        Sign and return HexData instead.
            transaction.allowAdditionalActions = true
            return signer.sign(transaction)
          }
        })
        .then(result => {
          if (result != undefined) {
            console.log(result)
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result || {}, null, 2));
          } else {
            res.end();
          }
        })).catch(err => process.nextTick(() => { throw err }))


}