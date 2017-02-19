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

  .controller('myAccountsCtrl', function ($scope, $stateParams, $timeout, svcUsers, svcAccounts, svcAssets, svcBalances, svcNodeSettings, accAliasFilter) {

    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();

      $scope.connection = {};
      $scope.connection.nodeURL = $scope.settings.nodeURL;
      $scope.connection.clientToken = $scope.settings.clientToken;

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

      // Base request object example
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
      // $scope.Request.connection.nodeURL = "http://41.76.226.170:1999";
      // $scope.Request.connection.clientToken = "AppDev:18bbc4a6fab7a3f27ce4ea636ec5cd6470b3a1b84449590125f1191d069ab0a2";
      $scope.Request.connection.nodeURL = $scope.settings.nodeURL;
      $scope.Request.connection.clientToken = $scope.settings.clientToken;

      $scope.Request.query = {};



      $scope.svcAccounts.query($scope.Request).$promise
        .then(function (data) {
          return data;
        })
        .then(function (data) {
          $scope.accountsList = data;
        })
        .catch(function (data) {
          console.log('Error: ' + data);
        }).finally(function () {

          //TODO: Kick of ballance queries
          $scope.getBalances();
          console.log('Done: ');
        });

    }// end of start()


    // Update the asset balances for all accounts in the current accountsList
    $scope.getBalances = function () {
      var a = [];
      $scope.accountsList.forEach(function (element) {
        this['sr' + element.alias] = {};
        this['sr' + element.alias].connection = JSON.parse(JSON.stringify($scope.connection));
        this['sr' + element.alias].query = {};
        this['sr' + element.alias].query = { queryType: "AccountBalance", alias: element.alias };
        //console.log(JSON.stringify(this['sr' + element.alias]));
        a.push($scope.getAssetBalances(this['sr' + element.alias]));
      }, this);

      function pr(requests) {
        //console.log(JSON.stringify(requests));
        Promise.all(requests)
          .then(function (items) {
            //console.log("results: " + JSON.stringify(items));

            // Inject results values into $scope.accountList
            for (var index = 0; index < items.length; index++) {
              $scope.accountsList[index].assets = items[index];
            }

            items.forEach(function (element) {

            }, this);

          })
          .catch(function (err) {
            console.log("err: " + err);
          })
      };

      pr(a);
    }

    // $scope.click = function () {
    //   var a = [];
    //   $scope.accountsList.forEach(function (element) {
    //     this['sr' + element.alias] = {};
    //     this['sr' + element.alias].connection = JSON.parse(JSON.stringify($scope.connection));
    //     this['sr' + element.alias].query = {};
    //     this['sr' + element.alias].query = { queryType: "Balance", accountAlias: element.alias };
    //     console.log(JSON.stringify(this['sr' + element.alias]));
    //     a.push($scope.getAssetBalances(this['sr' + element.alias]));
    //   }, this);

    //   function pr(requests) {
    //     //console.log(JSON.stringify(requests));
    //     Promise.all(requests)
    //       .then(function (items) {
    //         console.log("results: " + JSON.stringify(items));

    //         // Inject results values into $scope.accountList
    //         for (var index = 0; index < items.length; index++) {
    //           $scope.accountsList[index].assets = items[index];
    //         }

    //         items.forEach(function (element) {

    //         }, this);

    //       })
    //       .catch(function (err) {
    //         console.log("err: " + err);
    //       })
    //   };

    //   pr(a);

    // };

    $scope.getAssetBalances = function (r) {
      //console.log('getBalances: ' + JSON.stringify(r));
      //var data = [];
      return new Promise(function (resolve, reject) {
        var v = null;
        $scope.svcBalances.query(r).$promise
          .then(function (data) {
            //console.log("did resolve " + r.query.accountAlias + "data:" + data);
            v = data;
          })
          .catch(function (err) {
            //console.log("did reject " + r.query.accountAlias + "data:" + err);
            //v = err;

          }).finally(function () {
            resolve(v);
          })

      })
    };


    $scope.start();

  })

  .controller('assetInfoCtrl', function ($scope, $stateParams, svcNodeSettings, svcAssets, svcBalances, accAliasFilter) {

    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();

      // Set up the API services
      $scope.svcAssets = svcAssets;
      $scope.svcBalances = svcBalances;
      // $scope.svcUsers = svcUsers;
      // $scope.svcAccounts = svcAccounts;

      // Create Chain Node connection object
      $scope.connection = {};
      $scope.connection.nodeURL = $scope.settings.nodeURL;
      $scope.connection.clientToken = $scope.settings.clientToken;

      // Base request object example
      // $scope.Request = {
      //   "connection": {
      //     "nodeURL": "http://172.16.101.93:1999",
      //     "clientToken": "UbuntuDev:e72629518809db4f5176d084f80f2261a3f4c70e044c6339251977c79f73c4bb"
      //   },
      //   "asset": {},
      // };

      $scope.Request = {};
      $scope.Request.connection = $scope.connection;
      $scope.Request.asset = { alias: "BankservCoin" };


      $scope.assetList = [];

      $scope.svcAssets.query($scope.Request).$promise
        .then(function (data) {
          return data;
        })
        .then(function (data) {
          $scope.assetList = data;
        })
        .catch(function (data) {
          console.log('Error: ' + data);
        }).finally(function () {

          console.log('Done: ');
        });


    }

    // Update the asset balances for all accounts in the current accountsList
    $scope.getBalances = function () {
      var a = [];
      $scope.assetList.forEach(function (element) {
        this['sr' + element.alias] = {};
        this['sr' + element.alias].connection = JSON.parse(JSON.stringify($scope.connection));
        this['sr' + element.alias].query = {};
        this['sr' + element.alias].query = { queryType: "AssetBalance", alias: element.alias };
        //console.log(JSON.stringify(this['sr' + element.alias]));
        a.push($scope.getAssetBalances(this['sr' + element.alias]));
      }, this);

      function pr(requests) {
        //console.log(JSON.stringify(requests));
        Promise.all(requests)
          .then(function (items) {
            //console.log("results: " + JSON.stringify(items));

            // Inject results values into $scope.accountList
            for (var index = 0; index < items.length; index++) {
              $scope.accountsList[index].assets = items[index];
            }

            items.forEach(function (element) {

            }, this);

          })
          .catch(function (err) {
            console.log("err: " + err);
          })
      };

      pr(a);
    }

    $scope.getAssetBalances = function (r) {
      //console.log('getBalances: ' + JSON.stringify(r));
      //var data = [];
      return new Promise(function (resolve, reject) {
        var v = null;
        $scope.svcBalances.query(r).$promise
          .then(function (data) {
            //console.log("did resolve " + r.query.accountAlias + "data:" + data);
            v = data;
          })
          .catch(function (err) {
            //console.log("did reject " + r.query.accountAlias + "data:" + err);
            //v = err;

          }).finally(function () {
            resolve(v);
          })

      })
    };

    $scope.start();

  }
  )

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