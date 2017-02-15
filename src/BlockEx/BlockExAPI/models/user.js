'use strict';
module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true, primaryKey: true },
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    avatar: DataTypes.STRING,
    password: DataTypes.STRING

  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    });
  return Users;
};