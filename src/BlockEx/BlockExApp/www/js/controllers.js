angular.module('app.controllers', ['ionic', 'ngResource'])

  .controller('myProfileCtrl', function ($scope, $stateParams, $timeout, svcUsers, svcNodeSettings) {

    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();

      $scope.mockUser = 'GaryD';
      $scope.userProfile = [];

      // Set up the API services
      $scope.SVCappUsers = svcUsers;

      $scope.SVCappUsers.query({ userName: $scope.mockUser }).$promise
        .then(function (data) {
          $scope.userProfile = data;
        })
        .finally(function () {
        });
    }

    $scope.start();
  }
  )

  .controller('myAccountsCtrl', function ($scope, $stateParams, $timeout, svcUsers, svcAccounts, svcAssets, svcBalances, svcNodeSettings) {

    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();

      // Set up the API services
      //$scope.SVCNode = svcNodeSettings;
      $scope.svcUsers = svcUsers;
      $scope.svcAccounts = svcAccounts;
      $scope.svcAssets = svcAssets;
      $scope.svcBalances = svcBalances;

      // Fetch the default system settings on load
      //FIXME: head scratcher here
      //$scope.settings = SVCNode.getSettings();

      $scope.mockUser = 'GaryD';
      $scope.accountsList = [];
      $scope.accountBalances = [];

      // Set up base request object
      // $scope.Request = {
      //   "connection": {
      //     "nodeURL": "http://172.16.101.93:1999",
      //     "clientToken": "UbuntuDev:e72629518809db4f5176d084f80f2261a3f4c70e044c6339251977c79f73c4bb"
      //   },
      //   "account": {},
      //   "asset": {},
      //   "transaction": {},
      //   "hsmkey": [],
      //   "query": {}
      // };

      $scope.Request = {};
      $scope.Request.connection = {};
      $scope.Request.account = {};
      $scope.Request.query = {};
      $scope.Request.connection.nodeURL = "http://41.76.226.170:1999";
      $scope.Request.connection.clientToken = "AppDev:18bbc4a6fab7a3f27ce4ea636ec5cd6470b3a1b84449590125f1191d069ab0a2";
      $scope.Request.account = {};
      $scope.Request.query.type = "Balance";


      $scope.svcAccounts.query($scope.Request).$promise
        .then(function (data) {
          return data;
        })
        .then(function (data) {
          $scope.accountsList = data;
          //return Promise.all([$scope.getbalances(data[0])]);
          $scope.getBalances();
        })
        .catch(function (data) {
          //TODO: handle the error conditions...
          console.log('Error: ' + data);
        }).finally(function () {
          console.log('Done: ');
        });

    }// end of start()


    // Update the asset balances for all accounts in the current accountsList
    $scope.getBalances = function () {

      if ($scope.accountsList.length != 0) {

        $scope.accountsList.forEach(function (acc) {
          var request = $scope.Request;
          request.query = { queryType: "Balance", accountAlias: acc.alias };


          $scope.svcBalances.query(request).$promise
            .then(function (data) {
              console.log(acc + ' : ' + data);
              if (data != undefined) {
                var assets = [];
                data.forEach(function (ass) {
                  if (ass.sumBy.assetAlias == null) {
                    ass.sumBy.assetAlias = 'external';
                  }
                  assets.push({ assetAlias: ass.sumBy.assetAlias, balance: ass.amount });
                });
                acc.assets = assets;
              }

            })
        })

      }

    }

    $scope.start();


  })

  .controller('availableTradeOffersCtrl', function ($scope, $stateParams, svcTrades, svcUsers, svcNodeSettings) {

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();

      $scope.Offers = { trades: [] };
      // Set up the API services
      $scope.SVCappTrades = svcTrades;

      $scope.SVCappTrades.query().$promise
        .then(function (data) {
          $scope.Offers.trades = data;
        })
        .finally(function () {
          // $scope.hideLoading();
          //$scope.login();
        });

      // Get User information
      $scope.userProfiles = [];
      $scope.SVCappUsers = svcUsers;

      $scope.SVCappUsers.query({}).$promise
        .then(function (data) {
          $scope.userProfiles = data;
        })
        .finally(function () {
        });
    }

    $scope.start();
  }
  )

  .controller('bidsMadeForOfferIdCtrl', function ($scope, $stateParams, svcNodeSettings) {

    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();
    }

    $scope.start();

  }
  )

  .controller('assetInfoCtrl', function ($scope, $stateParams, svcNodeSettings) {

    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();
    }

    $scope.start();

  }
  )

  .controller('menuCtrl', function ($scope, $stateParams, svcNodeSettings) {

    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();
    }

    $scope.start();
  }
  )

  .controller('transactionsCtrl', function ($scope, $stateParams, svcNodeSettings) {

    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();
    }

    $scope.start();
  }
  )

  .controller('transactionDetailCtrl', function ($scope, $stateParams, svcNodeSettings) {

    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();
    }

    $scope.start();
  }
  )

  .controller('newTradeCtrl', function ($scope, $stateParams, svcNodeSettings) {

    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();
    }

    $scope.start();
  }
  )

  .controller('bidOnTradeIDCtrl', function ($scope, $stateParams, svcNodeSettings) {

    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();
    }

    $scope.start();
  }
  )

  .controller('newAccountCtrl', function ($scope, $stateParams, svcNodeSettings) {

    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();
    }

    $scope.start();
  }
  )

  .controller('loginCtrl', function ($scope, $stateParams, svcNodeSettings) {

    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();
    }

    $scope.start();
  }
  )

  .controller('confirmTradeCtrl', function ($scope, $stateParams, svcNodeSettings) {

    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();
    }

    $scope.start();
  }
  )

  .controller('settingsCtrl', function ($scope, $stateParams, svcNodeSettings) {

    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();
    }

    $scope.saveSettings = function (_settings) {
      $scope.svcNodeSettings.set("BaseURL", _settings.BaseURL);
      $scope.svcNodeSettings.set("nodeURL", _settings.nodeURL);
      $scope.svcNodeSettings.set("clientToken", _settings.clientToken);
    };

    $scope.start();

  })