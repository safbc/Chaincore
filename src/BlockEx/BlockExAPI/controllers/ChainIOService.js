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

}

exports.getBalances = function (args, res, next) {
  /**
   * Gets all asset balances on Node or of specified account.
   *
   * request ChainRequest ChainRequest object with Connection and Query [queryType=balance] properties specified. (optional)
   * returns List
   **/

  const chain = require('chain-sdk');

  var request = args.request.value;

  // set up chain node connection properties
  const baseurl = request.connection.nodeURL;
  const clienttoken = request.connection.clientToken

  // define chain client connection
  const client = new chain.Client(baseurl, clienttoken)

  var balances = [];

  if (request.query != undefined) {
    if (request.query.queryType == 'Balance') {
      if (request.query.accountAlias != undefined) {
        // Get ballances for this account
        client.balances.queryAll({
          filter: 'account_alias=$1',
          filterParams: [request.query.accountAlias],
          sumBy: ['asset_alias']
        }, (balance, next, done) => {
          // console.log('Bank 1 balance of ' + balance.sumBy.assetAlias + ': ' + balance.amount)
          balances.push(balance)
          next()
        })
          .then(() => {
            if (balances.length > 0) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(balances || {}, null, 2));
            } else {
              res.end();
            }
          }).catch(console.log.bind(console));
      } else {
        //  Get all balances
        client.balances.queryAll({ sumBy: ['asset_alias'] }, (balance, next, done) => {
          // console.log('Bank 1 balance of ' + balance.sumBy.assetAlias + ': ' + balance.amount)
          balances.push(balance)
          next()
        })
          .then(() => {
            if (balances.length > 0) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(balances || {}, null, 2));
            } else {
              res.end();
            }
          }).catch(console.log.bind(console));
      }

    }
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(balances || {}, null, 2));
  }


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

}

exports.getTransactions = function (args, res, next) {
  /**
   * Gets list of recent transactions. If Transaction properties provided, will attempt to search.
   *
   * request ChainRequest ChainRequest object with Connection and optional Transaction properties specified. (optional)
   * returns List
   **/

  const chain = require('chain-sdk');

  var request = args.request.value;

  // set up chain node connection properties
  const baseurl = request.connection.nodeURL;
  const clienttoken = request.connection.clientToken

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

  // Is this going to be filtered search or not?
  if (request.transaction == undefined) {
    client.transactions.queryAll({ filter: 'inputs(account_alias=$1 AND asset_alias=$2)', filterParams: [request.transaction.alias] }, (transaction, next, done) => {
      console.log('Transaction: ' + transaction.id + ')')
      transactions.push(transaction)
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
    client.transactions.queryAll({}, (transaction, next, done) => {
      console.log('Transaction: ' + transaction.id + ')')
      transactions.push(transaction)
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
        }))
    .catch(err => process.nextTick(() => { throw err }))
}