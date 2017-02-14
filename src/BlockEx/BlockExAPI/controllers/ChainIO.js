'use strict';

var url = require('url');

var ChainIO = require('./ChainIOService');

module.exports.createAccount = function createAccount (req, res, next) {
  ChainIO.createAccount(req.swagger.params, res, next);
};

module.exports.getAccount = function getAccount (req, res, next) {
  ChainIO.getAccount(req.swagger.params, res, next);
};

module.exports.getAccounts = function getAccounts (req, res, next) {
  ChainIO.getAccounts(req.swagger.params, res, next);
};

module.exports.getAsset = function getAsset (req, res, next) {
  ChainIO.getAsset(req.swagger.params, res, next);
};

module.exports.getAssets = function getAssets (req, res, next) {
  ChainIO.getAssets(req.swagger.params, res, next);
};

module.exports.getKey = function getKey (req, res, next) {
  ChainIO.getKey(req.swagger.params, res, next);
};

module.exports.getKeys = function getKeys (req, res, next) {
  ChainIO.getKeys(req.swagger.params, res, next);
};

module.exports.getTransactions = function getTransactions (req, res, next) {
  ChainIO.getTransactions(req.swagger.params, res, next);
};

module.exports.signTransaction = function signTransaction (req, res, next) {
  ChainIO.signTransaction(req.swagger.params, res, next);
};
