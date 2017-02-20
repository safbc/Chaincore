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


  .controller('myProfileCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, $timeout, $ionicHistory, svcUsers, svcNodeSettings) {
    if (!$ionicAuth.isAuthenticated()) {
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
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


  .controller('newAccountCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, $ionicHistory, svcNodeSettings) {
    if (!$ionicAuth.isAuthenticated()) {
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
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


  .controller('availableTradeOffersCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, $ionicHistory, svcTrades, svcUsers, svcNodeSettings) {
    if (!$ionicAuth.isAuthenticated()) {
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
      $state.go('menu.login');
    }

    $scope.start = function () {
      $ionicLoading.show({
        template: 'Retreiving offers ...'
      });
      $scope.noData = true;
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();

      $scope.Offers = { trades: [] };
      // Set up the API services
      $scope.SVCappTrades = svcTrades;

      $scope.SVCappTrades.query().$promise
        .then(function (data) {

          if (data.length > 0) {
            $scope.Offers.trades = data;
            $scope.noData = false;
            $scope.getUsers();
          } else {
            $scope.noData = true;
          }
          // $scope.Offers.trades.saleData = JSON.parse(data.saleData);
        })
        .finally(function () {
          $ionicLoading.hide({
            template: 'Retreiving offers ...'
          });
          $scope.$broadcast('scroll.refreshComplete');
        });



    }
    $scope.getUsers = function () {
      // Get User information
      $scope.userProfiles = [];
      $scope.SVCappUsers = svcUsers;

      $scope.SVCappUsers.query({}).$promise
        .then(function (data) {
          $scope.userProfiles = data;
        })
        .finally(function () {
          return;
        });
    };

    $scope.doRefresh = function () {
$scope.start();
    };

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


  .controller('newTradeCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, $ionicHistory, svcNodeSettings) {
    if (!$ionicAuth.isAuthenticated()) {
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
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


  .controller('transactionsCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, $ionicHistory, svcNodeSettings) {
    if (!$ionicAuth.isAuthenticated()) {
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
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


  .controller('transactionDetailCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, $ionicHistory, svcNodeSettings) {
    if (!$ionicAuth.isAuthenticated()) {
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
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


  .controller('loginCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, $ionicHistory) {
    if ($ionicAuth.isAuthenticated()) {
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
      $state.go('menu.myAccounts');
    }

    $scope.autheticatedUser = $ionicUser.email;

    $scope.loginForm = { name: '', email: '', password: '' };

    $scope.formLogin = function (details) {
      $ionicAuth.login('basic', details)
        .then(function (data) {
          $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
          });
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


  .controller('logoutCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, $ionicHistory) {

    $ionicAuth.logout();
    // $ionicGoogleAuth.logout();
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    $state.go('menu.login');

  })


  .controller('signupCtrl', function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, $ionicHistory, svcNodeSettings) {
    if ($ionicAuth.isAuthenticated()) {
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
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
            .then(function() {
              return $ionicAuth.login('basic', form.details);
            })
            .finally(function () {
              $ionicLoading.hide({
                template: 'Registered'
              });
              $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
              });
              
              $state.go('menu.myAccounts');

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

  .controller('aboutCtrl', function ($scope, $state) {

    $scope.authorAvatar = 'data:image/jpeg;utf8;base64,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'


    
  })