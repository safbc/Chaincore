'use strict';

exports.deleteTrade = function (args, res, next) {
    /**
     * Delete the specified trade from the system unless it has been completed
     *
     * tradeId Integer Id of trade to work with
     * returns inline_response_200
     **/

    // Connect to local sqlite db
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

}

exports.deleteUser = function (args, res, next) {
    /**
     * Delete the specified user from the system unless they have completed/pending transactions
     *
     * userName String Id of user to work with
     * returns inline_response_200
     **/

}

exports.getTrade = function (args, res, next) {
    /**
     * Gets specified trade details
     *
     * tradeId Integer Id of trade to work with
     * returns inline_response_200
     **/

}

exports.getTrades = function (args, res, next) {
    /**
     * List Trades posted in the system
     *
     * returns inline_response_200
     **/


}

exports.getUser = function (args, res, next) {
    /**
     * Gets the specified user details
     *
     * userName String Id of user to work with
     * returns inline_response_200_1
     **/

}

exports.getUsers = function (args, res, next) {
    /**
     * List users registered to use the app.
     *
     * returns List
     **/

}

exports.postTrade = function (args, res, next) {
    /**
     * Adds a new Trade Offer Item to the system
     *
     * offerItem TradeItem Offer item to add to the system (optional)
     * returns inline_response_200
     **/

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

}

