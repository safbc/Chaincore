'use strict';

exports.createAccount = function (args, res, next) {
  /**
   * Create new account on local node.
   *
   * request NewAccount New Account data and Connection info (optional)
   * returns List
   **/
  var data = args.NewAccount;
  const baseurl = args.NodeConnection.nodeUrl
  const clienttoken = args.NodeConnection.clientToken

  const client = new chain.Client(baseurl, clienttoken)

  var accountAlias = data.account.accountAlias;
  var keyAliases = data.account.keylist;
  var quorum = data.quorum;
  var accountId = void 0;
  var signKey = [];
  var accounts = [];

  /// Get HSM key - should be looking for key associated with account, but default key will do.
  Promise.all([
    client.mockHsm.keys.queryAll({ aliases: [keyAliases] }, (key, next, done) => {
      if (key.alias == keyAliases) {
        signKey.push = key.xpub
      }
      next()
    })])
    .then(() =>
      client.accounts.create({ alias: accountAlias, rootXpubs: [signKey], quorum: quorum }).then(accounts => {
        accountId = accounts[0].id;
        console.log("Account created: " + accountId + "(" + accountAlias + ")");
        if (accountId != 0) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(accounts || {}, null, 2));
        } else {
          res.end();
        }
      })

    );

  // var examples = {};
  // examples['application/json'] = [{
  //   "accountAlias": "BobAccount1",
  //   "accountId": "acc0RSDADNVG0804"
  // }];
  // if (Object.keys(examples).length > 0) {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  // } else {
  //   res.end();
  // }
}

exports.createAsset = function (args, res, next) {
  /**
   * Creates new Asset on local node.
   * Creates new Asset on local node.
   *
   * connection NewAsset New Asset and connection data for Chain Node (optional)
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [{
    "assetId": "227f376b170560cc3c3243e09de3560b2ba732a9522217b3d87d0992a19e5341",
    "assetAlias": "Dollars"
  }];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getAccount = function (args, res, next) {
  /**
   * Gets list of local accounts.
   * Gets list of local accounts.
   *
   * alias String Alias of account to find
   * connection NodeConnection Connection data for Chain Node (optional)
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [{
    "accountAlias": "BobAccount1",
    "accountId": "acc0RSDADNVG0804",
    "controlProgram": "766baa20f19b55122a0404313b57fbdab7b59548a311dcf2fcf538f1d7cc025ca625e52b5151ad696c00c0"
  }];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getAccounts = function (args, res, next) {
  /**
   * Gets list of local accounts.
   * Gets list of local accounts.
   *
   * connection NodeConnection Connection data for Chain Node (optional)
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [{
    "accountAlias": "BobAccount1",
    "accountId": "acc0RSDADNVG0804",
    "controlProgram": "766baa20f19b55122a0404313b57fbdab7b59548a311dcf2fcf538f1d7cc025ca625e52b5151ad696c00c0"
  }];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getAsset = function (args, res, next) {
  /**
   * Gets local asset.
   * Gets local account details.
   *
   * alias String Alias of account to find
   * connection NodeConnection Connection data for Chain Node (optional)
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [{
    "accountAlias": "BobAccount1",
    "accountId": "acc0RSDADNVG0804",
    "controlProgram": "766baa20f19b55122a0404313b57fbdab7b59548a311dcf2fcf538f1d7cc025ca625e52b5151ad696c00c0"
  }];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getAssets = function (args, res, next) {
  /**
   * Gets list of local assets.
   * Gets list of local assets.
   *
   * connection NodeConnection Connection data for Chain Node (optional)
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [{
    "assetId": "227f376b170560cc3c3243e09de3560b2ba732a9522217b3d87d0992a19e5341",
    "assetAlias": "Dollars"
  }];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getKey = function (args, res, next) {
  /**
   * Gets local key data.
   * Gets local HSM key data.
   *
   * alias String Alias of key to find
   * connection NodeConnection Connection data for Chain Node (optional)
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [{
    "alias": "aeiou",
    "xpub": "aeiou"
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
   * Gets list of local keys.
   * Gets list of local HSM keys.
   *
   * request NodeConnection Connection data for Chain Node (optional)
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [{
    "alias": "aeiou",
    "xpub": "aeiou"
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
   * sign this transaction partial
   *
   * request SignRequest Request includes Node connection details and transaction information  (optional)
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

