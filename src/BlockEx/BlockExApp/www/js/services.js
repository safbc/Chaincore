angular.module('app.services', ['ngResource'])


  // App API endpoints -------------------------------------------------------------------------------------------------------------
  // These support all HTTP VERBS


  .factory('svcTrades', ['$resource', '$timeout', 'svcURI', 'APP_SETTINGS', function ($resource, $timeout, svcURI, APP_SETTINGS) {

    var restURI = APP_SETTINGS.BaseURI + svcURI.restAppTrades;
    return $resource(restURI);

  }])

  .factory('svcUsers', ['$resource', '$timeout', 'svcURI', 'APP_SETTINGS', function ($resource, $timeout, svcURI, APP_SETTINGS) {

    var restURI = APP_SETTINGS.BaseURI + svcURI.restAppUsers + ":username";
    return $resource(restURI, { username: '@username' }, {});

  }])

  // Chain API endpoints -------------------------------------------------------------------------------------------------------------
  // All these use POST or PUT only


  .factory('svcAccounts', ['$resource', '$timeout', 'svcURI', 'APP_SETTINGS', function ($resource, $timeout, svcURI, APP_SETTINGS) {

    var restURI = APP_SETTINGS.BaseURI + svcURI.restChainAccounts;
    return $resource(restURI, {}, {
      'query': { method: 'POST', isArray: true }
    });
    // return $resource(restURI);

  }])

  .factory('svcAccount', ['$resource', '$timeout', 'svcURI', 'APP_SETTINGS', function ($resource, $timeout, svcURI, APP_SETTINGS) {

    var restURI = APP_SETTINGS.BaseURI + svcURI.restChainAccount;
    return $resource(restURI, {}, {
      'save': { method: 'PUT', isArray: true }
    });

  }])

  .factory('svcAssets', ['$resource', '$timeout', 'svcURI', 'APP_SETTINGS', function ($resource, $timeout, svcURI, APP_SETTINGS) {

    var restURI = APP_SETTINGS.BaseURI + svcURI.restChainAssets;
    return $resource(restURI, {}, {
      'query': { method: 'POST', isArray: true }
    });
  }])

  .factory('svcKeys', ['$resource', '$timeout', 'svcURI', 'APP_SETTINGS', function ($resource, $timeout, svcURI, APP_SETTINGS) {

    var restURI = APP_SETTINGS.BaseURI + svcURI.restChainKeys;
    return $resource(restURI, {}, {
      'query': { method: 'POST', isArray: true }
    });

  }])


  .factory('svcBalances', ['$resource', '$timeout', 'svcURI', 'APP_SETTINGS', function ($resource, $timeout, svcURI, APP_SETTINGS) {

    var restURI = APP_SETTINGS.BaseURI + svcURI.restChainBalances;
    return $resource(restURI, {}, {
      'query': { method: 'POST', isArray: true }
    });

  }])

  .factory('svcTransactions', ['$resource', '$timeout', 'svcURI', 'APP_SETTINGS', function ($resource, $timeout, svcURI, APP_SETTINGS) {

    var restURI = APP_SETTINGS.BaseURI + svcURI.restChainTransactions;
    return $resource(restURI, {}, {
      'query': { method: 'POST', isArray: true }
    });

  }])

  .factory('svcSign', ['$resource', '$timeout', 'svcURI', 'APP_SETTINGS', function ($resource, $timeout, svcURI, APP_SETTINGS) {

    var restURI = APP_SETTINGS.BaseURI + svcURI.restChainSign;
    return $resource(restURI, {}, {
      'query': { method: 'POST', isArray: true }
    });

  }])


  .factory('svcNodeSettings', ['$rootScope', 'svcURI', 'NODE_CONNECTION', function ($rootScope, svcURI, NODE_CONNECTION) {

    var _settings = {};
    try {
      _settings = JSON.parse(window.localStorage['settings']);

    } catch (e) {

    }

    _settings = angular.extend({}, NODE_CONNECTION, _settings);
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