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

    );
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
      });
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
  var examples = {};
  examples['application/json'] = [{
    "keys": [{
      "accountXpub": "48764b4efe18bbf1c3ad9f60ab60a5eb6f6a8d72d560bdf07e261d4a707cd50244db49b4e64547a2686bc3eb282815bf1337cab4a3343ea1c95948b81e6f3df0",
      "accountDerivationPath": ["AQYAAAAAAAAA"],
      "rootXpub": "4abb21e69072a7b17357cc514847f556afd6e007a7c92ef4f898208c1103212aef4d36e42441888cd25d5e7d61a13a2811777c0b2f25ce66abb898141abe8f4a",
      "alias": "aeiou"
    }],
    "quorum": "aeiou",
    "alias": "BlockCoin",
    "definition": "{}",
    "id": "227f376b170560cc3c3243e09de3560b2ba732a9522217b3d87d0992a19e5341",
    "tags": "{}"
  }];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getKeys = function (args, res, next) {
  /**
   * Gets list of local HSM keys.
   *
   * request ChainRequest ChainRequest object with Connection and optional HSMKey properties specified. (optional)
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [{
    "accountXpub": "48764b4efe18bbf1c3ad9f60ab60a5eb6f6a8d72d560bdf07e261d4a707cd50244db49b4e64547a2686bc3eb282815bf1337cab4a3343ea1c95948b81e6f3df0",
    "accountDerivationPath": ["AQYAAAAAAAAA"],
    "rootXpub": "4abb21e69072a7b17357cc514847f556afd6e007a7c92ef4f898208c1103212aef4d36e42441888cd25d5e7d61a13a2811777c0b2f25ce66abb898141abe8f4a",
    "alias": "aeiou"
  }];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getTransactions = function (args, res, next) {
  /**
   * Gets list of recent transactions.
   *
   * connection NodeConnection Connection data for Chain Node (optional)
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [{
    "outputs": [{
      "amount": 123,
      "purpose": "receive or change",
      "asset_is_local": "aeiou",
      "account_tags": "{}",
      "reference_data": "{}",
      "asset_id": "aeiou",
      "type": "aeiou",
      "asset_definition": "{}",
      "account_id": "aeiou",
      "asset_tags": "{}",
      "position": 123,
      "account_alias": "aeiou",
      "is_local": "no",
      "control_program": "aeiou"
    }],
    "inputs": [{
      "amount": 123,
      "asset_is_local": "yes",
      "account_tags": "{}",
      "reference_data": "{}",
      "asset_id": "aeiou",
      "type": "aeiou",
      "asset_definition": "{}",
      "asset_alias": "aeiou",
      "account_id": "aeiou",
      "spent_output": "{}",
      "asset_tags": "{}",
      "account_alias": "aeiou",
      "is_local": "yes"
    }],
    "reference_data": "{}",
    "id": "af3c8f3e42f35072ab1286225e2b3cd73552b9ce3a3cf3cd936f6e3a9d3f40df",
    "block_height": 123,
    "position": 123,
    "is_local": "no",
    "block_id": "aeiou",
    "timestamp": "2017-02-09T14:20:24.000Z"
  }];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.signTransaction = function (args, res, next) {
  /**
   * sign this transaction partial
   *
   * request ChainRequest Request includes Node connection details and transaction information  (optional)
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [{
    "outputs": [{
      "amount": 123,
      "purpose": "receive or change",
      "asset_is_local": "aeiou",
      "account_tags": "{}",
      "reference_data": "{}",
      "asset_id": "aeiou",
      "type": "aeiou",
      "asset_definition": "{}",
      "account_id": "aeiou",
      "asset_tags": "{}",
      "position": 123,
      "account_alias": "aeiou",
      "is_local": "no",
      "control_program": "aeiou"
    }],
    "inputs": [{
      "amount": 123,
      "asset_is_local": "yes",
      "account_tags": "{}",
      "reference_data": "{}",
      "asset_id": "aeiou",
      "type": "aeiou",
      "asset_definition": "{}",
      "asset_alias": "aeiou",
      "account_id": "aeiou",
      "spent_output": "{}",
      "asset_tags": "{}",
      "account_alias": "aeiou",
      "is_local": "yes"
    }],
    "reference_data": "{}",
    "id": "af3c8f3e42f35072ab1286225e2b3cd73552b9ce3a3cf3cd936f6e3a9d3f40df",
    "block_height": 123,
    "position": 123,
    "is_local": "no",
    "block_id": "aeiou",
    "timestamp": "2017-02-09T14:20:24.000Z"
  }];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

