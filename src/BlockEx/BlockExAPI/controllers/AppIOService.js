'use strict';

exports.deleteTrade = function (args, res, next) {
  /**
   * Delete the specified trade from the system unless it has been completed
   *
   * tradeId Integer Id of trade to work with
   * returns inline_response_200
   **/

  // Add sqlite 
  var sqlite3 = require('sqlite3').verbose();
  var db = new sqlite3.Database('data/blockex.db');
  var check;
  db.serialize(function () {

    // db.run("CREATE TABLE if not exists user_info (info TEXT)");
    // var stmt = db.prepare("INSERT INTO user_info VALUES (?)");
    // for (var i = 0; i < 10; i++) {
    //   stmt.run("Ipsum " + i);
    // }
    // stmt.finalize();

    db.each("SELECT rowid AS id, * FROM users", function (err, row) {
      console.log(row);
    });
  });

  db.close();

  //   var examples = {};
  //   examples['application/json'] = {
  //   "data" : [ {
  //     "seller" : {
  //       "amount" : 100.0,
  //       "asset" : {
  //         "keys" : [ {
  //           "accountXpub" : "48764b4efe18bbf1c3ad9f60ab60a5eb6f6a8d72d560bdf07e261d4a707cd50244db49b4e64547a2686bc3eb282815bf1337cab4a3343ea1c95948b81e6f3df0",
  //           "accountDerivationPath" : [ "AQYAAAAAAAAA" ],
  //           "rootXpub" : "4abb21e69072a7b17357cc514847f556afd6e007a7c92ef4f898208c1103212aef4d36e42441888cd25d5e7d61a13a2811777c0b2f25ce66abb898141abe8f4a",
  //           "alias" : "aeiou"
  //         } ],
  //         "quorum" : "aeiou",
  //         "alias" : "BlockCoin",
  //         "definition" : "{}",
  //         "id" : "227f376b170560cc3c3243e09de3560b2ba732a9522217b3d87d0992a19e5341",
  //         "tags" : "{}"
  //       },
  //       "account" : {
  //         "keys" : [ "" ],
  //         "controlProgram" : "766baa20f19b55122a0404313b57fbdab7b59548a311dcf2fcf538f1d7cc025ca625e52b5151ad696c00c0",
  //         "quorum" : "aeiou",
  //         "alias" : "BobAccount1",
  //         "id" : "acc0RSDADNVG0804",
  //         "tags" : "{}"
  //       }
  //     },
  //     "tradeDescription" : "User A sold X asset to User B for Y Asset",
  //     "transactionHex" : "aeiou",
  //     "lastActionDate" : "2017-01-31T09:00:00.002Z",
  //     "expiryDateTime" : "2017-01-31T09:00:00.002Z",
  //     "tradeId" : "d290f1ee",
  //     "parentId" : "d290f1ee",
  //     "buyer" : "",
  //     "status" : "Processed or Cancelled"
  //   } ],
  //   "meta" : {
  //     "code" : 123
  //   }
  // };
  //   if (Object.keys(examples).length > 0) {
  //     res.setHeader('Content-Type', 'application/json');
  //     res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  //   } else {
  //     res.end();
  //   }
}

exports.deleteUser = function (args, res, next) {
  /**
   * Delete the specified user from the system unless they have completed/pending transactions
   *
   * userName String Id of user to work with
   * returns inline_response_200
   **/
  var examples = {};
  examples['application/json'] = {
    "data": [{
      "seller": {
        "amount": 100.0,
        "asset": {
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
        },
        "account": {
          "keys": [""],
          "controlProgram": "766baa20f19b55122a0404313b57fbdab7b59548a311dcf2fcf538f1d7cc025ca625e52b5151ad696c00c0",
          "quorum": "aeiou",
          "alias": "BobAccount1",
          "id": "acc0RSDADNVG0804",
          "tags": "{}"
        }
      },
      "tradeDescription": "User A sold X asset to User B for Y Asset",
      "transactionHex": "aeiou",
      "lastActionDate": "2017-01-31T09:00:00.002Z",
      "expiryDateTime": "2017-01-31T09:00:00.002Z",
      "tradeId": "d290f1ee",
      "parentId": "d290f1ee",
      "buyer": "",
      "status": "Processed or Cancelled"
    }],
    "meta": {
      "code": 123
    }
  };
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getTrade = function (args, res, next) {
  /**
   * Gets specified trade details
   *
   * tradeId Integer Id of trade to work with
   * returns inline_response_200
   **/
  var examples = {};
  examples['application/json'] = {
    "data": [{
      "seller": {
        "amount": 100.0,
        "asset": {
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
        },
        "account": {
          "keys": [""],
          "controlProgram": "766baa20f19b55122a0404313b57fbdab7b59548a311dcf2fcf538f1d7cc025ca625e52b5151ad696c00c0",
          "quorum": "aeiou",
          "alias": "BobAccount1",
          "id": "acc0RSDADNVG0804",
          "tags": "{}"
        }
      },
      "tradeDescription": "User A sold X asset to User B for Y Asset",
      "transactionHex": "aeiou",
      "lastActionDate": "2017-01-31T09:00:00.002Z",
      "expiryDateTime": "2017-01-31T09:00:00.002Z",
      "tradeId": "d290f1ee",
      "parentId": "d290f1ee",
      "buyer": "",
      "status": "Processed or Cancelled"
    }],
    "meta": {
      "code": 123
    }
  };
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getTrades = function (args, res, next) {
  /**
   * List Trades posted in the system
   *
   * returns inline_response_200
   **/
  var examples = {};
  examples['application/json'] = {
    "data": [{
      "seller": {
        "amount": 100.0,
        "asset": {
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
        },
        "account": {
          "keys": [""],
          "controlProgram": "766baa20f19b55122a0404313b57fbdab7b59548a311dcf2fcf538f1d7cc025ca625e52b5151ad696c00c0",
          "quorum": "aeiou",
          "alias": "BobAccount1",
          "id": "acc0RSDADNVG0804",
          "tags": "{}"
        }
      },
      "tradeDescription": "User A sold X asset to User B for Y Asset",
      "transactionHex": "aeiou",
      "lastActionDate": "2017-01-31T09:00:00.002Z",
      "expiryDateTime": "2017-01-31T09:00:00.002Z",
      "tradeId": "d290f1ee",
      "parentId": "d290f1ee",
      "buyer": "",
      "status": "Processed or Cancelled"
    }],
    "meta": {
      "code": 123
    }
  };
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getUser = function (args, res, next) {
  /**
   * Gets the specified user details
   *
   * userName String Id of user to work with
   * returns inline_response_200_1
   **/
  var examples = {};
  examples['application/json'] = {
    "data": [{
      "password": "aeiou",
      "fullName": "aeiou",
      "telephone": "aeiou",
      "avatar": "aeiou",
      "userName": "aeiou",
      "email": "aeiou"
    }],
    "meta": {
      "code": 123
    }
  };
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getUsers = function (args, res, next) {
  /**
   * List users registered to use the app.
   *
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [{
    "password": "aeiou",
    "fullName": "aeiou",
    "telephone": "aeiou",
    "avatar": "aeiou",
    "userName": "aeiou",
    "email": "aeiou"
  }];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.postTrade = function (args, res, next) {
  /**
   * Adds a new Trade Offer Item to the system
   *
   * offerItem TradeItem Offer item to add to the system (optional)
   * returns inline_response_200
   **/
  var examples = {};
  examples['application/json'] = {
    "data": [{
      "seller": {
        "amount": 100.0,
        "asset": {
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
        },
        "account": {
          "keys": [""],
          "controlProgram": "766baa20f19b55122a0404313b57fbdab7b59548a311dcf2fcf538f1d7cc025ca625e52b5151ad696c00c0",
          "quorum": "aeiou",
          "alias": "BobAccount1",
          "id": "acc0RSDADNVG0804",
          "tags": "{}"
        }
      },
      "tradeDescription": "User A sold X asset to User B for Y Asset",
      "transactionHex": "aeiou",
      "lastActionDate": "2017-01-31T09:00:00.002Z",
      "expiryDateTime": "2017-01-31T09:00:00.002Z",
      "tradeId": "d290f1ee",
      "parentId": "d290f1ee",
      "buyer": "",
      "status": "Processed or Cancelled"
    }],
    "meta": {
      "code": 123
    }
  };
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.postUser = function (args, res, next) {
  /**
   * Register a new User to the system
   *
   * user User Offer item to add to the system (optional)
   * no response value expected for this operation
   **/
  res.end();
}

exports.updateTrade = function (args, res, next) {
  /**
   * Updates an Offer Item
   *
   * offerItem TradeItem Offer to be updated (optional)
   * returns inline_response_200
   **/
  var examples = {};
  examples['application/json'] = {
    "data": [{
      "seller": {
        "amount": 100.0,
        "asset": {
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
        },
        "account": {
          "keys": [""],
          "controlProgram": "766baa20f19b55122a0404313b57fbdab7b59548a311dcf2fcf538f1d7cc025ca625e52b5151ad696c00c0",
          "quorum": "aeiou",
          "alias": "BobAccount1",
          "id": "acc0RSDADNVG0804",
          "tags": "{}"
        }
      },
      "tradeDescription": "User A sold X asset to User B for Y Asset",
      "transactionHex": "aeiou",
      "lastActionDate": "2017-01-31T09:00:00.002Z",
      "expiryDateTime": "2017-01-31T09:00:00.002Z",
      "tradeId": "d290f1ee",
      "parentId": "d290f1ee",
      "buyer": "",
      "status": "Processed or Cancelled"
    }],
    "meta": {
      "code": 123
    }
  };
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}