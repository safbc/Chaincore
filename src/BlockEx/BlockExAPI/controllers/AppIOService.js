'use strict';

exports.deleteTrade = function(args, res, next) {
  /**
   * deletes posted trade offer
   * Delete the specified trade from the system unless it has been completed
   *
   * tradeId Integer Id of trade to work with
   * returns inline_response_200
   **/
  var examples = {};
  examples['application/json'] = {
  "data" : [ {
    "seller" : {
      "amount" : 100.0,
      "asset" : {
        "assetId" : "227f376b170560cc3c3243e09de3560b2ba732a9522217b3d87d0992a19e5341",
        "assetAlias" : "Dollars"
      },
      "account" : {
        "accountAlias" : "BobAccount1",
        "accountId" : "acc0RSDADNVG0804",
        "controlProgram" : "766baa20f19b55122a0404313b57fbdab7b59548a311dcf2fcf538f1d7cc025ca625e52b5151ad696c00c0"
      }
    },
    "tradeDescription" : "User A sold X asset to User B for Y Asset",
    "transactionHex" : "aeiou",
    "lastActionDate" : "2017-01-31T09:00:00.002Z",
    "expiryDateTime" : "2017-01-31T09:00:00.002Z",
    "tradeId" : "d290f1ee",
    "parentId" : "d290f1ee",
    "buyer" : "",
    "status" : "Processed or Cancelled"
  } ],
  "meta" : {
    "code" : 123
  }
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.deleteUser = function(args, res, next) {
  /**
   * deletes posted trade offer
   * Delete the specified user from the system unless they have completed/pending transactions
   *
   * userName String Id of user to work with
   * returns inline_response_200
   **/
  var examples = {};
  examples['application/json'] = {
  "data" : [ {
    "seller" : {
      "amount" : 100.0,
      "asset" : {
        "assetId" : "227f376b170560cc3c3243e09de3560b2ba732a9522217b3d87d0992a19e5341",
        "assetAlias" : "Dollars"
      },
      "account" : {
        "accountAlias" : "BobAccount1",
        "accountId" : "acc0RSDADNVG0804",
        "controlProgram" : "766baa20f19b55122a0404313b57fbdab7b59548a311dcf2fcf538f1d7cc025ca625e52b5151ad696c00c0"
      }
    },
    "tradeDescription" : "User A sold X asset to User B for Y Asset",
    "transactionHex" : "aeiou",
    "lastActionDate" : "2017-01-31T09:00:00.002Z",
    "expiryDateTime" : "2017-01-31T09:00:00.002Z",
    "tradeId" : "d290f1ee",
    "parentId" : "d290f1ee",
    "buyer" : "",
    "status" : "Processed or Cancelled"
  } ],
  "meta" : {
    "code" : 123
  }
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getTrade = function(args, res, next) {
  /**
   * Gets specified trade details
   * Gets specified trade details 
   *
   * tradeId Integer Id of trade to work with
   * returns inline_response_200
   **/
  var examples = {};
  examples['application/json'] = {
  "data" : [ {
    "seller" : {
      "amount" : 100.0,
      "asset" : {
        "assetId" : "227f376b170560cc3c3243e09de3560b2ba732a9522217b3d87d0992a19e5341",
        "assetAlias" : "Dollars"
      },
      "account" : {
        "accountAlias" : "BobAccount1",
        "accountId" : "acc0RSDADNVG0804",
        "controlProgram" : "766baa20f19b55122a0404313b57fbdab7b59548a311dcf2fcf538f1d7cc025ca625e52b5151ad696c00c0"
      }
    },
    "tradeDescription" : "User A sold X asset to User B for Y Asset",
    "transactionHex" : "aeiou",
    "lastActionDate" : "2017-01-31T09:00:00.002Z",
    "expiryDateTime" : "2017-01-31T09:00:00.002Z",
    "tradeId" : "d290f1ee",
    "parentId" : "d290f1ee",
    "buyer" : "",
    "status" : "Processed or Cancelled"
  } ],
  "meta" : {
    "code" : 123
  }
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getTrades = function(args, res, next) {
  /**
   * Gets list of trade offers
   * List Trades posted in the system 
   *
   * returns inline_response_200
   **/
  var examples = {};
  examples['application/json'] = {
  "data" : [ {
    "seller" : {
      "amount" : 100.0,
      "asset" : {
        "assetId" : "227f376b170560cc3c3243e09de3560b2ba732a9522217b3d87d0992a19e5341",
        "assetAlias" : "Dollars"
      },
      "account" : {
        "accountAlias" : "BobAccount1",
        "accountId" : "acc0RSDADNVG0804",
        "controlProgram" : "766baa20f19b55122a0404313b57fbdab7b59548a311dcf2fcf538f1d7cc025ca625e52b5151ad696c00c0"
      }
    },
    "tradeDescription" : "User A sold X asset to User B for Y Asset",
    "transactionHex" : "aeiou",
    "lastActionDate" : "2017-01-31T09:00:00.002Z",
    "expiryDateTime" : "2017-01-31T09:00:00.002Z",
    "tradeId" : "d290f1ee",
    "parentId" : "d290f1ee",
    "buyer" : "",
    "status" : "Processed or Cancelled"
  } ],
  "meta" : {
    "code" : 123
  }
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getUser = function(args, res, next) {
  /**
   * Get user detail
   * Gets the specified user details
   *
   * userName String Id of user to work with
   * returns inline_response_200_1
   **/
  var examples = {};
  examples['application/json'] = {
  "data" : [ {
    "fullName" : "aeiou",
    "telephone" : "aeiou",
    "avatar" : "aeiou",
    "userName" : "aeiou",
    "email" : "aeiou"
  } ],
  "meta" : {
    "code" : 123
  }
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getUsers = function(args, res, next) {
  /**
   * Gets registered app users.
   * List users registered to use the app. 
   *
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "fullName" : "aeiou",
  "telephone" : "aeiou",
  "avatar" : "aeiou",
  "userName" : "aeiou",
  "email" : "aeiou"
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.postTrade = function(args, res, next) {
  /**
   * Adds a new offer item
   * Adds a new Offer Item to the system 
   *
   * offerItem TradeItem Offer item to add to the system (optional)
   * returns inline_response_200
   **/
  var examples = {};
  examples['application/json'] = {
  "data" : [ {
    "seller" : {
      "amount" : 100.0,
      "asset" : {
        "assetId" : "227f376b170560cc3c3243e09de3560b2ba732a9522217b3d87d0992a19e5341",
        "assetAlias" : "Dollars"
      },
      "account" : {
        "accountAlias" : "BobAccount1",
        "accountId" : "acc0RSDADNVG0804",
        "controlProgram" : "766baa20f19b55122a0404313b57fbdab7b59548a311dcf2fcf538f1d7cc025ca625e52b5151ad696c00c0"
      }
    },
    "tradeDescription" : "User A sold X asset to User B for Y Asset",
    "transactionHex" : "aeiou",
    "lastActionDate" : "2017-01-31T09:00:00.002Z",
    "expiryDateTime" : "2017-01-31T09:00:00.002Z",
    "tradeId" : "d290f1ee",
    "parentId" : "d290f1ee",
    "buyer" : "",
    "status" : "Processed or Cancelled"
  } ],
  "meta" : {
    "code" : 123
  }
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.postUser = function(args, res, next) {
  /**
   * Register a new User to the system
   * Register a new User to the system 
   *
   * user User Offer item to add to the system (optional)
   * no response value expected for this operation
   **/
  res.end();
}

exports.updateTrade = function(args, res, next) {
  /**
   * Updates an Offer Item
   * update an item in the system
   *
   * offerItem TradeItem Offer to be updated (optional)
   * returns inline_response_200
   **/
  var examples = {};
  examples['application/json'] = {
  "data" : [ {
    "seller" : {
      "amount" : 100.0,
      "asset" : {
        "assetId" : "227f376b170560cc3c3243e09de3560b2ba732a9522217b3d87d0992a19e5341",
        "assetAlias" : "Dollars"
      },
      "account" : {
        "accountAlias" : "BobAccount1",
        "accountId" : "acc0RSDADNVG0804",
        "controlProgram" : "766baa20f19b55122a0404313b57fbdab7b59548a311dcf2fcf538f1d7cc025ca625e52b5151ad696c00c0"
      }
    },
    "tradeDescription" : "User A sold X asset to User B for Y Asset",
    "transactionHex" : "aeiou",
    "lastActionDate" : "2017-01-31T09:00:00.002Z",
    "expiryDateTime" : "2017-01-31T09:00:00.002Z",
    "tradeId" : "d290f1ee",
    "parentId" : "d290f1ee",
    "buyer" : "",
    "status" : "Processed or Cancelled"
  } ],
  "meta" : {
    "code" : 123
  }
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

