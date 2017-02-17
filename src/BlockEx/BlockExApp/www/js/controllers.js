angular.module('app.controllers', ['ionic', 'ngResource'])

  .controller('myProfileCtrl', function ($scope, $stateParams, $timeout, svcUsers) {

    $scope.start = function () {

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

  .controller('myAccountsCtrl', function ($scope, $stateParams, $timeout, svcUsers, svcAccounts, svcAssets, svcBalances) {

    $scope.start = function () {

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

      // Set up base request object
      $scope.Request = {
        "connection": {
          "nodeURL": "http://172.16.101.93:1999",
          "clientToken": "UbuntuDev:e72629518809db4f5176d084f80f2261a3f4c70e044c6339251977c79f73c4bb"
        },
        "account": {},
        "asset": {},
        "transaction": {},
        "hsmkey": [],
        "query": {}
      };



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
          //$scope.accountsList = data;
          return data;
        })
        .then(function (data) {
          // iterate through items to geta balances
          data.forEach(function (element) {
            // set the alias of the account to get balance for
            $scope.Request.query.accountAlias = element.alias;
            $scope.svcBalances.query($scope.Request).$promise
              .then(function (assets) {
                // insert the asset balance array into the element record
                element.assets = assets;
                $scope.accountsList.push(element);
              })
          }, this);
          console.log("did anything happen");
        })
        .finally(function () {
          console.log("did anything happen");
        });
    }


    $scope.start();

  }
  )

  .controller('availableTradeOffersCtrl', function ($scope, $stateParams, svcTrades, svcUsers) {

    $scope.start = function () {
      // Fetch the default system settings on load
      //$scope.settings = svcNodeSettings.getSettings();
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

  .controller('bidsMadeForOfferIdCtrl', function ($scope, $stateParams) {


  }
  )

  .controller('assetInfoCtrl', function ($scope, $stateParams) {


  }
  )

  .controller('menuCtrl', function ($scope, $stateParams) {


  }
  )

  .controller('transactionsCtrl', function ($scope, $stateParams) {


  }
  )

  .controller('transactionDetailCtrl', function ($scope, $stateParams) {


  }
  )

  .controller('newTradeCtrl', function ($scope, $stateParams) {


  }
  )

  .controller('bidOnTradeIDCtrl', function ($scope, $stateParams) {


  }
  )

  .controller('newAccountCtrl', function ($scope, $stateParams) {


  }
  )

  .controller('loginCtrl', function ($scope, $stateParams) {


  }
  )

  .controller('confirmTradeCtrl', function ($scope, $stateParams) {


  }
  )