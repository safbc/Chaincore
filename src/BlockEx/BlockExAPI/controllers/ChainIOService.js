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
  const nodeURL = request.connection.nodeURL;
  const clientToken = request.connection.clientToken

  // Create new chain client connection
  const client = new chain.Client(nodeURL, clientToken)

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
  const nodeURL = request.connection.nodeURL;
  const clientToken = request.connection.clientToken

  // define chain client connection
  const client = new chain.Client(nodeURL, clientToken)

  var accounts = [];
  var filter = '';
  if (request.account == undefined) {
    request.account = {};
  }
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

exports.getFakeAccounts = function (args, res, next) {
  /**
   * Fake get
   *
   * returns inline_response_200_2
   **/
  var examples = {};
  examples['application/json'] = {
    "data": [{
      "keys": [{
        "accountXpub": "48764b4efe18bbf1c3ad9f60ab60a5eb6f6a8d72d560bdf07e261d4a707cd50244db49b4e64547a2686bc3eb282815bf1337cab4a3343ea1c95948b81e6f3df0",
        "accountDerivationPath": ["AQYAAAAAAAAA"],
        "rootXpub": "4abb21e69072a7b17357cc514847f556afd6e007a7c92ef4f898208c1103212aef4d36e42441888cd25d5e7d61a13a2811777c0b2f25ce66abb898141abe8f4a",
        "alias": "aeiou"
      }],
      "controlProgram": "766baa20f19b55122a0404313b57fbdab7b59548a311dcf2fcf538f1d7cc025ca625e52b5151ad696c00c0",
      "quorum": 1.3579000000000001069366817318950779736042022705078125,
      "alias": "BobAccount1",
      "id": "acc0RSDADNVG0804",
      "tags": "{}"
    }]
  };
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
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
  const nodeURL = request.connection.nodeURL;
  const clientToken = request.connection.clientToken

  // define chain client connection
  const client = new chain.Client(nodeURL, clientToken)

  var assets = [];
  var filter = {};

  if (request.asset == undefined) {
    request.asset = {};
    filter = {};
  } else if (request.asset.alias == undefined && request.asset.id == undefined) {
    filter = {};
  } else if (request.asset.alias != undefined && request.asset.alias != null && request.asset.alias != '') {
    filter = { filter: 'alias=$1', filterParams: [request.asset.alias] }
  } else if (request.asset.id != undefined) {
    filter = { filter: 'id=$1', filterParams: [request.asset.id] }
  }

  client.assets.queryAll(filter, (asset, next, done) => {
    console.log('Asset: ' + asset.id + ' (' + asset.alias + ')')
    assets.push(asset)
    next()
  })
    .then(() => {

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(assets));

    }).catch(console.log.bind(console));

  // Is this going to be filtered search or not?
  // if (request.asset.alias == undefined && request.asset.id == undefined) {

  // } else {
  //   client.assets.queryAll({ filter: 'alias=$1', filterParams: [request.asset.alias] }, (asset, next, done) => {
  //     console.log('Asset: ' + asset.id + ' (' + asset.alias + ')')
  //     assets.push(asset)
  //     next()
  //   })
  //     .then(() => {

  //       res.setHeader('Content-Type', 'application/json');
  //       res.end(JSON.stringify(assets));

  //     }).catch(console.log.bind(console));
  // }

}

exports.getBalances = function (args, res, next) {
  /**
   * Gets all asset balances on Node or of specified account.
   *
   * request ChainRequest ChainRequest object with Connection and Query [queryType=accountbalance or assetbalance] properties specified. (optional)
   * returns List
   **/

  const chain = require('chain-sdk');

  var request = args.request.value;
  console.log("Balances request for asset or acc: " + JSON.stringify(request.query));
  // set up chain node connection properties
  const nodeURL = request.connection.nodeURL;
  const clientToken = request.connection.clientToken

  // define chain client connection
  const client = new chain.Client(nodeURL, clientToken)

  var balances = [];
  var filter = {};

  // Exit if no querytype specified
  if (request.query == undefined) {
    res.setHeader('Content-Type', 'application/json');
    var out = JSON.stringify([])
    res.end(out);
  }
  else {
    if (request.query.queryType == undefined) {
      // fall through if incorrect parameters
      request.query.queryType = ""
    }

    switch (request.query.queryType) {


      case "AccountBalance":
        // Set up the search parameters
        if (request.query.alias == undefined && request.query.id == undefined) {
          filter = {};

        } else if (request.query.alias != undefined && request.query.alias != null && request.query.alias != '') {
          filter = { filter: 'account_alias=$1', filterParams: [request.query.alias] };

        } else if (request.query.id != undefined) {
          filter = { filter: 'asset_id=$1', filterParams: [request.query.asset_id] };

        }

        // Perform the search
        client.balances.queryAll(filter, (balance, next, done) => {
          console.log(JSON.stringify(balance))
          //balance.accountAlias = request.query.accountAlias;
          balances.push(balance)
          next()
        })
          .then(() => {

            res.setHeader('Content-Type', 'application/json');
            var out = JSON.stringify(balances)
            res.end(out);

          }).catch(function (err) { console.log("error:" + err) });
        break;




      case "AssetBalance":
        // Set up the search parameters
        if (request.query.alias == undefined && request.query.id == undefined) {
          filter = {};

        } else if (request.query.alias != undefined && request.query.alias != null && request.query.alias != '') {
          filter = { filter: 'asset_alias=$1', filterParams: [request.query.alias] }

        } else if (request.query.id != undefined) {
          filter = { filter: 'asset_id=$1', filterParams: [request.query.asset_id] }

        }

        // Perform the search
        client.balances.queryAll(filter, (balance, next, done) => {
          console.log(JSON.stringify(balance))
          //balance.accountAlias = request.query.accountAlias;
          balances.push(balance)
          next()
        })
          .then(() => {

            res.setHeader('Content-Type', 'application/json');
            var out = JSON.stringify(balances)
            res.end(out);

          }).catch(function (err) { console.log("error:" + err) });
        break;


      case "TxSpender":

        break;
      case "TxController":

        break;

      case "TxAsset":

        break;

      case "TxDateRange":

        break;

      default:
        res.setHeader('Content-Type', 'application/json');
        var out = JSON.stringify([])
        res.end(out);
        break;
    }
  }

  // } else if (request.query.alias == undefined && request.query.id == undefined) {
  //   filter = {};

  // } else if (request.query.alias != undefined && request.query.alias != null && request.query.alias != '') {
  //   filter = { filter: 'account_alias=$1', filterParams: [request.query.alias] }

  // } else if (request.query.id != undefined) {
  //   filter = { filter: 'asset_id=$1', filterParams: [request.query.asset_id] }

  // }


  // if (request.query != undefined) {
  //   if (request.query.queryType == 'Balance') {
  //     if (request.query.accountAlias != undefined) {
  //       // Get ballances for this account
  //       client.balances.queryAll({
  //         filter: 'account_alias=$1',
  //         filterParams: [request.query.accountAlias]
  //       }, (balance, next, done) => {
  //         console.log(request.query.accountAlias + '\'s balance of ' + balance.sumBy.assetAlias + ': ' + balance.amount)
  //         //balance.accountAlias = request.query.accountAlias;
  //         balances.push(balance)
  //         next()
  //       })
  //         .then(() => {

  //           res.setHeader('Content-Type', 'application/json');
  //           var out = JSON.stringify(balances)
  //           // var out = JSON.stringify(balances || {}, null, 2)
  //           res.end(out);

  //         }).catch(function (err) { console.log("error:" + err) });
  //     } else {
  //       //  Get all balances
  //       client.balances.queryAll({ sumBy: ['asset_alias'] }, (balance, next, done) => {
  //         // console.log('Bank 1 balance of ' + balance.sumBy.assetAlias + ': ' + balance.amount)
  //         balances.push(balance)
  //         next()
  //       })
  //         .then(() => {

  //           res.setHeader('Content-Type', 'application/json');
  //           res.end(JSON.stringify(balances));

  //         })
  //       // .catch(console.log.bind(console));
  //     }

  //   }
  // } else {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.end(JSON.stringify(balances || [], null, 2));
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
  const nodeURL = request.connection.nodeURL;
  const clientToken = request.connection.clientToken

  // define chain client connection
  const client = new chain.Client(nodeURL, clientToken)

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
   * Gets list of recent transactions. If Query properties provided, will attempt to search.
   *
   * request ChainRequest ChainRequest object with Connection and Query [queryType=tx???] properties specified. (optional)
   *         TxAsset requires assetId be specified (not assetAlias) as some assets may have come from other nodes.
   * returns List
   **/

  const chain = require('chain-sdk');

  var request = args.request.value;

  // set up chain node connection properties
  const nodeURL = request.connection.nodeURL;
  const clientToken = request.connection.clientToken

  // define chain client connection
  const client = new chain.Client(nodeURL, clientToken)

  var myFilter = {};
  var transactions = [];

  // Decide which action to perform based on value of queryType
  switch (request.query.queryType) {
    case 'TxSpender':
      myFilter.filter = '\'inputs(account_alias=\'' + request.query.accountAlias + '\')\'';
      // myFilter.filterParams = [request.query.accountAlias];

      // if (request.query.dateRange != undefined) {
      //   myFilter.setStartTime = request.query.dateRange[0];
      //   myFilter.setEndTime = request.query.dateRange[1];
      // }
      break;
    case 'TxController':
      myFilter.filter = '\'outputs(account_alias =\'' + request.query.accountAlias + '\')\'';

      if (request.query.dateRange != undefined) {
        myFilter.setStartTime = request.query.dateRange[0]
        myFilter.setEndTime = request.query.dateRange[1]
      }
      break;
    case 'TxAsset':
      myFilter.filter = '\'inputs(asset_id=\$1) OR outputs(asset_id =\$1\'';
      myFilter.filterParams = [request.query.assetId]
      // if (request.query.dateRange != undefined) {
      //   myFilter.setStartTime = request.query.dateRange[0]
      //   myFilter.setEndTime = request.query.dateRange[1]
      // }
      break;
    case 'TxDateRange':
      // must add checks for invalid params
      myFilter = {
        setStartTime: request.query.dateRange[0],
        setEndTime: request.query.dateRange[1]
      }
      break;
    default:
      myFilter = {}
  }
  client.transactions.queryAll({ myFilter }, (transaction, next, done) => {
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
  const nodeURL = request.connection.nodeURL;
  const hsmurl = nodeURL + '/mockhsm'
  const clientToken = request.connection.clientToken

  // define chain client connection
  const client = new chain.Client(nodeURL, clientToken)
  const hsmConnection = new chain.Connection(hsmurl, clientToken)
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
        // Check if valid basetransaction was supplied
        if (allowAdditionalActions == 'no' && (request.transaction.baseTransaction != undefined && request.transaction.baseTransaction != '')) {
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
          if (allowAdditionalActions == 'yes') {
            transaction.allowAdditionalActions = true;
          }
          return signer.sign(transaction)
        })
        .then((signed) => {
          if (allowAdditionalActions == 'no') {
            return client.transactions.submit(signed)
          } else {
            return signed
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