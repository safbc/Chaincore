'use strict';
var db = require("./../models");

exports.getTrade = function (args, res, next) {
  /**
   * Gets specified trade details
   *
   * tradeId Integer Id of trade to work with
   * returns inline_response_200
   **/

  db.Trade.findAll({
      where: {
        tradeId: args.tradeId.value
      }
    })
    .then(trades => {
      if (trades != undefined) {
        console.log(trades)
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(trades || {}, null, 2));
      } else {
        res.end();
      }
    })

}

exports.getTrades = function (args, res, next) {
  /**
   * List Trades posted in the system
   *
   * returns inline_response_200
   **/
  db.Trade.findAll({
      order: 'createdAt DESC'
    })
    .then(trades => {

      res.setHeader('Content-Type', 'application/json');
      if (trades != undefined) {
        console.log(trades)
        res.end(JSON.stringify(trades));
      } else {
        var trades = [];
        res.end(JSON.stringify(trades));
      }
    })

}

exports.postTrade = function (args, res, next) {
  /**
   * Adds a new Trade to the system
   *
   * offerItem Trade Trade item to add to the system (optional)
   * returns inline_response_200
   **/

  var offerItem = args.offerItem.value;

  db.Trade.create({
      tradeAction: offerItem.tradeAction,
      // TODO: Figure out how to store JSON string properly
      // offerData: JSON.stringify(offerItem.offerData),
      offerData: offerItem.offerData,
      // bidData: offerItem.bidData,
      // TODO: CHECK FORMATTING OF TIMEZONE +2 TIMESTAMP
      expiryTimestamp: offerItem.expiryTimestamp,
      postedBy: offerItem.postedBy
    })
    .then(trade => {
      return db.Trade.findAll({
        where: {
          tradeId: trade.dataValues.tradeId
        }
      })
    })
    .then(trades => {
      if (trades != undefined) {
        console.log(trades)
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(trades || {}, null, 2));
      } else {
        res.end();
      }
    })
}

exports.updateTrade = function (args, res, next) {
  /**
   * Updates an Offer Item
   *
   * offerItem TradeItem Offer to be updated (optional)
   * returns inline_response_200
   **/
  // Connect to local sqlite db

}

exports.deleteTrade = function (args, res, next) {
  /**
   * Delete the specified trade from the system unless it has been completed
   *
   * tradeId Integer Id of trade to work with
   * returns inline_response_200
   **/

  db.Trade.destroy({
      where: {
        tradeId: args.tradeId.value,
        status: 'Cancelled'
      }
    })
    .then(trades => {
      if (trades != undefined) {
        console.log(trades)
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(trades));
      } else {
        res.end();
      }
    })

}

// NOT USED
exports.getUser = function (args, res, next) {
  /**
   * Gets the specified user details
   *
   * userName String Id of user to retrieve
   * returns inline_response_200_1
   **/

  var _username = args.userName.value;

  db.User.findAll({
      where: {
        username: _username
      }
    })
    .then(users => {
      if (users != undefined) {
        console.log(users)
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(users || {}, null, 2));
      } else {
        res.end();
      }
    })

}
// NOT USED
exports.getUsers = function (args, res, next) {
  /**
   * List users registered to use the app.
   *
   * returns List
   **/


  db.User.findAll({})
    .then(users => {
      if (users != undefined) {
        console.log(users)
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(users || {}, null, 2));
      } else {
        res.end();
      }
    })
}
// NOT USED
exports.postUser = function (args, res, next) {
  /**
   * Register a new User to the system
   *
   * user User Offer item to add to the system (optional)
   * no response value expected for this operation
   **/
  // Connect to local sqlite db

}
// Not used currently
exports.deleteUser = function (args, res, next) {
  /**
   * Delete the specified user from the system unless they have completed/pending transactions
   *
   * userName String Id of user to work with
   * returns inline_response_200
   **/

  // Connect to local sqlite db

}