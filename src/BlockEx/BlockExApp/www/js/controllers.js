angular.module('app.controllers', ['ionic', 'ionic.cloud', 'ngResource'])

  .controller('menuCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, svcNodeSettings) {
    if (!$ionicAuth.isAuthenticated()) {
      $state.go('menu.login');
    }

    $scope.isAuthenticated = $ionicAuth.isAuthenticated();
    $scope.userInfo = $ionicUser.details;
    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();
    }

    $scope.start();
  }
  )


  .controller('myProfileCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, $timeout, svcUsers, svcNodeSettings) {
    if (!$ionicAuth.isAuthenticated()) {
      $state.go('menu.login');
    }

    $scope.isAuthenticated = $ionicAuth.isAuthenticated();
    $scope.userInfo = $ionicUser.details;
    $scope.passwordResetUrl = $ionicAuth.passwordResetUrl;

    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {

      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();

      $scope.userProfile = [];

      // Set up the API services
      $scope.SVCappUsers = svcUsers;

      $scope.SVCappUsers.query({ userName: $scope.userInfo.username }).$promise
        .then(function (data) {
          $scope.userProfile = data;
          if (data.length > 0) {
            $scope.userInfo.createdAt = data[0].createdAt;
          }
        })
        .finally(function () {
        });
    }

    $scope.start();


  }
  )


  .controller('myAccountsCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $timeout, $ionicLoading, svcUsers, svcAccounts, svcAssets, svcBalances, svcNodeSettings, accAliasFilter) {
    if (!$ionicAuth.isAuthenticated()) {
      $state.go('menu.login');
    }

    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      $ionicLoading.show({
        template: 'Loading ...'
      });
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
          $ionicLoading.show({
            template: 'Error!'
          });
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
            $ionicLoading.hide({
              template: 'Loading ...'
            });
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

  })


  .controller('newAccountCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, svcNodeSettings) {
    if (!$ionicAuth.isAuthenticated()) {
      $state.go('menu.login');
    }
    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();
    }

    $scope.start();
  }
  )


  .controller('assetInfoCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, svcNodeSettings, svcAssets, svcBalances, accAliasFilter) {
    if (!$ionicAuth.isAuthenticated()) {
      $state.go('menu.login');
    }


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


  .controller('availableTradeOffersCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, svcTrades, svcUsers, svcNodeSettings) {
    if (!$ionicAuth.isAuthenticated()) {
      $state.go('menu.login');
    }

    $scope.start = function () {
      $ionicLoading.show({
        template: 'Retreiving offers ...'
      });
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();

      $scope.Offers = { trades: [] };
      // Set up the API services
      $scope.SVCappTrades = svcTrades;

      $scope.SVCappTrades.query().$promise
        .then(function (data) {
          $scope.Offers.trades = data;
          $scope.Offers.trades.saleData = JSON.parse(data.saleData);
        })
        .finally(function () {
          $ionicLoading.hide({
            template: 'Retreiving offers ...'
          });
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


  .controller('bidsMadeForOfferIdCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, svcNodeSettings) {
    if (!$ionicAuth.isAuthenticated()) {
      $state.go('menu.login');
    }

    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();
    }

    $scope.start();

  }
  )


  .controller('newTradeCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, svcNodeSettings) {
    if (!$ionicAuth.isAuthenticated()) {
      $state.go('menu.login');
    }

    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();
    }

    $scope.start();
  }
  )


  .controller('bidOnTradeIDCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, svcNodeSettings) {
    if (!$ionicAuth.isAuthenticated()) {
      $state.go('menu.login');
    }

    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();
    }

    $scope.start();
  }
  )


  .controller('confirmTradeCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, svcNodeSettings) {
    if (!$ionicAuth.isAuthenticated()) {
      $state.go('menu.login');
    }

    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();
    }

    $scope.start();
  }
  )


  .controller('transactionsCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, svcNodeSettings) {
    if (!$ionicAuth.isAuthenticated()) {
      $state.go('menu.login');
    }

    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();
    }

    $scope.start();
  }
  )


  .controller('transactionDetailCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, svcNodeSettings) {
    if (!$ionicAuth.isAuthenticated()) {
      $state.go('menu.login');
    }

    // Set up the API services
    $scope.svcNodeSettings = svcNodeSettings;

    $scope.start = function () {
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();
    }

    $scope.start();
  }
  )


  .controller('loginCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading) {
    if ($ionicAuth.isAuthenticated()) {
      $state.go('menu.myAccounts');
    }

    $scope.autheticatedUser = $ionicUser.email;

    $scope.loginForm = { name: '', email: '', password: '' };

    $scope.formLogin = function (details) {
      $ionicAuth.login('basic', details)
        .then(function (data) {

          $state.go('menu.availableTradeOffers', {});
        }
        );
    }

    // Only used when deploying app to actual devices
    $scope.googleSignIn = function () {
      $ionicLoading.show({
        template: 'Logging in...'
      });

      $ionicGoogleAuth.login()
        .then(function (data) {
          $ionicLoading.hide({
            template: 'Logging in...'
          });
          $state.go('menu.myAccounts');
        });

    };
  }
  )


  .controller('logoutCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading) {

    $ionicAuth.logout();
    // $ionicGoogleAuth.logout();
    $state.go('menu.login');

  })


  .controller('signupCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, svcNodeSettings) {
    if ($ionicAuth.isAuthenticated()) {
      $state.go('menu.myAccounts');
    }

    $scope.start = function () {
      $scope.signupForm = { details: { username: '', name: '', email: '', password: '', image: '' }, passwordMatch: '' };
      $scope.avatarsList = [
        'http://megaicons.net/static/img/icons_sizes/189/462/256/tv-smith-icon.png',
        'http://icons.iconarchive.com/icons/mattahan/ultrabuuf/256/Comics-Older-Superman-icon.png',
        'http://icons.iconarchive.com/icons/mattahan/ultrabuuf/256/Comics-Hulk-Happy-icon.png',
        'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRsqG_v6UxjxQU4dXK70ih48ByBPffeqoYH2cYeF-R3HRMtOGew',
        'http://icons.iconarchive.com/icons/hopstarter/superhero-avatar/256/Avengers-Hawkeye-icon.png',
        'http://icons.iconarchive.com/icons/hopstarter/iron-man-avatar/512/Iron-Man-Mark-III-01-icon.png',
        "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU4IDU4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1OCA1ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxjaXJjbGUgc3R5bGU9ImZpbGw6I0Y3NjM2MzsiIGN4PSIyOSIgY3k9IjI5IiByPSIyOSIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRjdCNTYzOyIgZD0iTTUyLjkzMiw0NS4zNzZDNTIuMjc1LDM4Ljk4NSw0Ni44NzYsMzQsNDAuMzExLDM0aC01Ljk0NkMzMy42MTEsMzQsMzMsMzMuMzg5LDMzLDMyLjYzNVYzMS45OSAgYzAtMC41ODMsMC4zNzktMS4wODIsMC45MjUtMS4yODdjNS44MDQtMi4xODIsOS43NzgtMTEuNzA0LDguOTcxLTE4LjQzM0M0Mi4xMzQsNS45MTksMzYuOTcsMC44MDEsMzAuNjE0LDAuMDkgIGMtMC41MTctMC4wNTgtMS4wMjktMC4wODYtMS41MzUtMC4wODhjLTAuMDE2LDAtMC4wMzItMC4wMDEtMC4wNDgtMC4wMDFDMjEuMjg1LTAuMDE2LDE1LDYuMjU4LDE1LDE0ICBjMCw2LjAyNCwzLjgwNywxNC43NTUsOS4xNDUsMTYuNzI5QzI0LjY2OCwzMC45MjIsMjUsMzEuNDQyLDI1LDMydjAuNjM1QzI1LDMzLjM4OSwyNC4zODksMzQsMjMuNjM1LDM0aC01Ljk0NiAgYy02LjU2NSwwLTExLjk2NCw0Ljk4NS0xMi42MjEsMTEuMzc2QzEwLjI5Myw1Mi45OTgsMTkuMDYxLDU4LDI5LDU4UzQ3LjcwNyw1Mi45OTgsNTIuOTMyLDQ1LjM3NnoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0Y3RTcxNDsiIGQ9Ik0zMy40OTIsNi42MWMzLjcxNSwxLjAyMSw3LjIxMywzLjMwNiw5LjQ1Myw2LjMyMmMtMC4wMTYtMC4yMjEtMC4wMjMtMC40NDctMC4wNDktMC42NjMgIEM0Mi4xMzQsNS45MTksMzYuOTcsMC44MDEsMzAuNjE0LDAuMDljLTAuNTE3LTAuMDU4LTEuMDI5LTAuMDg2LTEuNTM1LTAuMDg4Yy0wLjAxNiwwLTAuMDMyLTAuMDAxLTAuMDQ4LTAuMDAxICBjLTYuOTItMC4wMTUtMTIuNjYsNC45OTUtMTMuODA4LDExLjU4M2wwLjAwNSwwYzAuMTc5LDAuMjUyLDAuMzU0LDAuNTA3LDAuNTQ1LDAuNzVjMC4wNy0wLjA4NywwLjE0MS0wLjE3MywwLjIxMy0wLjI1OCAgYzItMi4zOCw1LjM0MS0yLjkzMSw4LjE4My0xLjY3MUMyNS4wMzQsMTAuNzg3LDI1Ljk5MiwxMSwyNywxMUMyOS45NDIsMTEsMzIuNDU2LDkuMTgyLDMzLjQ5Miw2LjYxeiIvPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNGN0U3MTQ7IiBkPSJNMzMuOTI1LDMwLjcwM0MzMy4zNzksMzAuOTA4LDMzLDMxLjQwNywzMywzMS45OXYwLjY0NUMzMywzMy4zODksMzMuNjExLDM0LDM0LjM2NSwzNGg1Ljk0NiAgIGMwLjkyMywwLDEuODIyLDAuMTA0LDIuNjg5LDAuMjkyVjE0aC0wLjAxMkM0My4wMDIsMjAuMjQsMzkuMjM2LDI4LjcwNiwzMy45MjUsMzAuNzAzeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0Y3RTcxNDsiIGQ9Ik0xNy42ODksMzRoNS45NDZDMjQuMzg5LDM0LDI1LDMzLjM4OSwyNSwzMi42MzVWMzJjMC0wLjU1OC0wLjMzMi0xLjA3OC0wLjg1NS0xLjI3MSAgIEMxOC44MDcsMjguNzU1LDE1LDIwLjAyNCwxNSwxNHYyMC4yOTJDMTUuODY3LDM0LjEwNCwxNi43NjYsMzQsMTcuNjg5LDM0eiIvPgo8L2c+CjxwYXRoIHN0eWxlPSJmaWxsOiNEMzk0NTA7IiBkPSJNMzgsNDBjLTMuOTYxLDAtNy4zODIsMi4zMjItOSw1LjY3QzI3LjM4Miw0Mi4zMjIsMjMuOTYxLDQwLDIwLDQwYy0wLjU1MywwLTEsMC40NDctMSwxczAuNDQ3LDEsMSwxICBjNC40MTEsMCw4LDMuNTg5LDgsOHYzaDJ2LTNjMC00LjQxMSwzLjU4OS04LDgtOGMwLjU1MywwLDEtMC40NDcsMS0xUzM4LjU1Myw0MCwzOCw0MHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6IzI1QUU4ODsiIGQ9Ik01Mi45MzIsNDUuMzc2Yy0wLjM4My0zLjcyNi0yLjM4NS02Ljk2NS01LjI4My05LjAyNkwyOSw1M0wxMC4zNSwzNi4zNSAgYy0yLjg5OCwyLjA2MS00Ljg5OSw1LjMtNS4yODMsOS4wMjZDMTAuMjkzLDUyLjk5OCwxOS4wNjEsNTgsMjksNThTNDcuNzA3LDUyLjk5OCw1Mi45MzIsNDUuMzc2eiIvPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiMyMjk5NzQ7IiBkPSJNNDMsNDd2Ny4zOTJjMC42ODUtMC4zNzksMS4zNS0wLjc4OSwyLTEuMjJWNDdINDN6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojMjI5OTc0OyIgZD0iTTEzLDUzLjE3MmMwLjY1LDAuNDMxLDEuMzE1LDAuODQxLDIsMS4yMlY0N2gtMlY1My4xNzJ6Ii8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="
      ]
    };


    $scope.setAvatar = function (image) {
      $scope.signupForm.details.image = image;
    };

    $scope.formSignup = function (form) {
      if (form.details.password == form.passwordMatch) {
        $ionicLoading.show({
          template: 'Registering ...'
        });

        $ionicAuth.signup(form.details).then(function () {
          // `$ionicUser` is now registered


          var appUser = {
            "username": form.details.username,
            "fullname": form.details.name,
            "email": form.details.email,
            "avatar": form.details.image
          }

          // Save registered User information to app database
          $scope.SVCappUsers = svcUsers;

          $scope.SVCappUsers.save(appUser).$promise
            .then(function (data) {
              $scope.userProfiles = data;
            })
            .finally(function () {
              $ionicLoading.hide({
                template: 'Registered'
              });
              return $ionicAuth.login('basic', form.details);
            });

        }, function (err) {
          for (var e of err.details) {
            if (e === 'conflict_email') {
              alert('Email already exists.');
            } else {
              // handle other errors
            }
          }
        });
      } else {
        alert('Paswords do not match!');
      }

    }

    $scope.start();
  }
  )


  .controller('settingsCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, svcNodeSettings) {

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