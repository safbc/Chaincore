'use strict';
module.exports = function (sequelize, DataTypes) {
  var Trades = sequelize.define('Trade', {
    tradeId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    parentId: DataTypes.INTEGER,
    saleData: DataTypes.TEXT,
    bidData: DataTypes.TEXT,
    expiryDateTime: DataTypes.DATE,
    lastActionDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    trasactionHex: DataTypes.TEXT,
    status: DataTypes.STRING,
    postedBy: DataTypes.STRING,

  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    });
  return Trades;
};