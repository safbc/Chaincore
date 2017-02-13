'use strict';

var url = require('url');

var AppIO = require('./AppIOService');

module.exports.deleteTrade = function deleteTrade (req, res, next) {
  AppIO.deleteTrade(req.swagger.params, res, next);
};

module.exports.deleteUser = function deleteUser (req, res, next) {
  AppIO.deleteUser(req.swagger.params, res, next);
};

module.exports.getTrade = function getTrade (req, res, next) {
  AppIO.getTrade(req.swagger.params, res, next);
};

module.exports.getTrades = function getTrades (req, res, next) {
  AppIO.getTrades(req.swagger.params, res, next);
};

module.exports.getUser = function getUser (req, res, next) {
  AppIO.getUser(req.swagger.params, res, next);
};

module.exports.getUsers = function getUsers (req, res, next) {
  AppIO.getUsers(req.swagger.params, res, next);
};

module.exports.postTrade = function postTrade (req, res, next) {
  AppIO.postTrade(req.swagger.params, res, next);
};

module.exports.postUser = function postUser (req, res, next) {
  AppIO.postUser(req.swagger.params, res, next);
};

module.exports.updateTrade = function updateTrade (req, res, next) {
  AppIO.updateTrade(req.swagger.params, res, next);
};
