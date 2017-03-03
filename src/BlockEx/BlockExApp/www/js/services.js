angular.module('app.services', ['ngResource'])


  // App API endpoints -------------------------------------------------------------------------------------------------------------
  // These support all HTTP VERBS


  .factory('svcTrades', ['$resource', '$timeout', 'svcURI', function ($resource, $timeout, svcURI) {

    var restURI = svcURI.BaseURL + svcURI.restAppTrades;
    return $resource(restURI);

  }])

  .factory('svcUsers', ['$resource', '$timeout', 'svcURI', function ($resource, $timeout, svcURI) {

    var restURI = svcURI.BaseURL + svcURI.restAppUsers + ":username";
    return $resource(restURI, { username: '@username' }, {});

  }])

  // Chain API endpoints -------------------------------------------------------------------------------------------------------------
  // All these use POST or PUT only


  .factory('svcAccounts', ['$resource', '$timeout', 'svcURI', function ($resource, $timeout, svcURI) {

    var restURI = svcURI.BaseURL + svcURI.restChainAccounts;
    return $resource(restURI, {}, {
      'query': { method: 'POST', isArray: true }
    });
    // return $resource(restURI);

  }])

  .factory('svcAccount', ['$resource', '$timeout', 'svcURI', function ($resource, $timeout, svcURI) {

    var restURI = svcURI.BaseURL + svcURI.restChainAccounts;
    return $resource(restURI, {}, {
      'save': { method: 'PUT', isArray: false }
    });

  }])

  .factory('svcAssets', ['$resource', '$timeout', 'svcURI', function ($resource, $timeout, svcURI) {

    var restURI = svcURI.BaseURL + svcURI.restChainAssets;
    return $resource(restURI, {}, {
      'query': { method: 'POST', isArray: true }
    });
  }])

  .factory('svcKeys', ['$resource', '$timeout', 'svcURI', function ($resource, $timeout, svcURI) {

    var restURI = svcURI.BaseURL + svcURI.restChainKeys;
    return $resource(restURI, {}, {
      'query': { method: 'POST', isArray: true }
    });

  }])


  .factory('svcBalances', ['$resource', '$timeout', 'svcURI', function ($resource, $timeout, svcURI) {

    var restURI = svcURI.BaseURL + svcURI.restChainBalances;
    return $resource(restURI, {}, {
      'query': { method: 'POST', isArray: true }
    });

  }])

  .factory('svcTransactions', ['$resource', '$timeout', 'svcURI', function ($resource, $timeout, svcURI) {

    var restURI = svcURI.BaseURL + svcURI.restChainTransactions;
    return $resource(restURI, {}, {
      'query': { method: 'POST', isArray: true }
    });

  }])

  .factory('svcSign', ['$resource', '$timeout', 'svcURI', function ($resource, $timeout, svcURI) {

    var restURI = svcURI.BaseURL + svcURI.restChainSign;
    return $resource(restURI, {}, {
      'query': { method: 'POST', isArray: true }
    });

  }])


  .factory('svcNodeSettings', ['$rootScope', 'NODE_SETTINGS', function ($rootScope, NODE_SETTINGS) {

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
