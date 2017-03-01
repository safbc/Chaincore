'use strict';
module.exports = function (sequelize, DataTypes) {
  var Trades = sequelize.define('Trade', {
    tradeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    parentId: DataTypes.INTEGER,
    tradeAction: DataTypes.STRING,
    offerData: DataTypes.TEXT,
    bidData: DataTypes.TEXT,
    expiryTimestamp: DataTypes.DATE,
    txHex: DataTypes.TEXT,
    status: DataTypes.STRING,
    postedBy: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  });
  return Trades;
};