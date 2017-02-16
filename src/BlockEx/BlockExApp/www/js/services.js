angular.module('app.services', ['ngResource'])


  // App API endpoints -------------------------------------------------------------------------------------------------------------
  // These support all HTTP VERBS


  .factory('svcTrades', ['$resource', '$timeout', 'svcURI', 'APP_SETTINGS', function ($resource, $timeout, svcURI, APP_SETTINGS) {

    var restURI = APP_SETTINGS.BaseURI + svcURI.restAppTrades //+ ":tradeId";
    return $resource(restURI, {}, {}, isArray = true);

  }])

  .factory('svcUsers', ['$resource', '$timeout', 'svcURI', 'APP_SETTINGS', function ($resource, $timeout, svcURI, APP_SETTINGS) {

    var restURI = APP_SETTINGS.BaseURI + svcURI.restAppUsers + ":username";
    return $resource(restURI, { username: '@username' }, {}, isArray = true);

  }])

  // Chain API endpoints -------------------------------------------------------------------------------------------------------------
  // All these use POST or PUT only


  .service('svcAccounts', ['$resource', '$timeout', 'svcURI', 'APP_SETTINGS', function ($resource, $timeout, svcURI, APP_SETTINGS) {

    var restURI = APP_SETTINGS.BaseURI + svcURI.restChainAccounts;
    return $resource(restURI, {}, {}, isArray = true);

  }])

  .service('svcAccount', ['$resource', '$timeout', 'svcURI', 'APP_SETTINGS', function ($resource, $timeout, svcURI, APP_SETTINGS) {

    var restURI = APP_SETTINGS.BaseURI + svcURI.restChainAccount;
    return $resource(restURI, {}, {}, isArray = true);

  }])

  .service('svcAssets', ['$resource', '$timeout', 'svcURI', 'APP_SETTINGS', function ($resource, $timeout, svcURI, APP_SETTINGS) {

    var restURI = APP_SETTINGS.BaseURI + svcURI.restChainAssets;
    return $resource(restURI, {}, {}, isArray = true);

  }])

  .service('svcKeys', ['$resource', '$timeout', 'svcURI', 'APP_SETTINGS', function ($resource, $timeout, svcURI, APP_SETTINGS) {

    var restURI = APP_SETTINGS.BaseURI + svcURI.restChainKeys;
    return $resource(restURI, {}, {}, isArray = true);

  }])


  .service('svcBalances', ['$resource', '$timeout', 'svcURI', 'APP_SETTINGS', function ($resource, $timeout, svcURI, APP_SETTINGS) {

    var restURI = APP_SETTINGS.BaseURI + svcURI.restChainBalances;
    return $resource(restURI, {}, {}, isArray = true);

  }])

  .service('svcTransactions', ['$resource', '$timeout', 'svcURI', 'APP_SETTINGS', function ($resource, $timeout, svcURI, APP_SETTINGS) {

    var restURI = APP_SETTINGS.BaseURI + svcURI.restChainTransactions;
    return $resource(restURI, {}, {}, isArray = true);

  }])

  .service('svcSign', ['$resource', '$timeout', 'svcURI', 'APP_SETTINGS', function ($resource, $timeout, svcURI, APP_SETTINGS) {

    var restURI = APP_SETTINGS.BaseURI + svcURI.restChainSign;
    return $resource(restURI, {}, {}, isArray = true);

  }])


  .factory('svcSettings', ['$rootScope', 'svcURI', 'APP_SETTINGS', function ($rootScope, svcURI, APP_SETTINGS) {

    var _settings = {};
    try {
      _settings = JSON.parse(window.localStorage['settings']);

    } catch (e) {

    }

    _settings = angular.extend({}, NODE_SETTINGS, _settings);
    if (!_settings) {
      window.localStorage['settings'] = JSON.stringify(_settings);
    }

    var obj = {
      getSettings: function () {
        return _settings;
      },
      save: function () {
        window.localStorage['settings'] = JSON.stringify(_settings);
        $rootScope.$broadcast('settings.changed', _settings);
      },
      get: function (k) {
        return _settings[k];
      },
      set: function (k, v) {
        _settings[k] = v;
        this.save();
      }
    }

    obj.save();
    return obj;
  }])


  .service('BlankService', [function () {

  }]);