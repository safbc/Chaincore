angular.module('app.controllers', ['ionic', 'ionic.cloud', 'ngResource'])

  .controller('menuCtrl',
    function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, $ionicHistory,
      svcNodeSettings) {


      $scope.isAuthenticated = $ionicAuth.isAuthenticated();
      $scope.userInfo = $ionicUser.details;

      $scope.$on('user:updated', function (event, data) {
        // you could inspect the data to see if what you care about changed, or just update your own scope
        $scope.userInfo = $ionicUser.details;
        $scope.isAuthenticated = $ionicAuth.isAuthenticated();
      });

      $scope.start = function () {
        $scope.isAuthenticated = $ionicAuth.isAuthenticated();

        if (!$ionicAuth.isAuthenticated()) {
          $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
          });
          $state.go('menu.login');
        }

        $scope.userInfo = $ionicUser.details;
      }

    })


  .controller('myProfileCtrl',
    function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, $timeout, $ionicHistory,
      svcUsers, svcNodeSettings) {

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

        $scope.SVCappUsers.query({
            userName: $scope.userInfo.username
          }).$promise
          .then(function (data) {
            $scope.userProfile = data;
            if (data.length > 0) {
              $scope.userInfo.createdAt = data[0].createdAt;
            }
          })
          .finally(function () {});
      }

      $scope.start();


    })


  .controller('myAccountsCtrl',
    function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $timeout, $ionicLoading,
      svcUsers, svcAccounts, svcAssets, svcBalances, svcNodeSettings, accAliasFilter, assetIcons) {


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
        $scope.icons = assetIcons;

        $scope.connection = {};
        $scope.connection.nodeURL = $scope.settings.nodeURL;
        $scope.connection.clientToken = $scope.settings.clientToken;

        // Set up the API services
        $scope.svcUsers = svcUsers;
        $scope.svcAccounts = svcAccounts;
        $scope.svcAssets = svcAssets;
        $scope.svcBalances = svcBalances;



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
            $ionicLoading.hide({
              template: 'Loading ...'
            });
            $state.go('menu.settings');
          }).finally(function () {
            $ionicLoading.hide({
              template: 'Loading ...'
            });
            //TODO: Kick of ballance queries
            $scope.getBalances();
            console.log('Done: ');
          });

      } // end of start()


      // Update the asset balances for all accounts in the current accountsList
      $scope.getBalances = function () {
        var a = [];
        $scope.accountsList.forEach(function (element) {
          this['sr' + element.alias] = {};
          this['sr' + element.alias].connection = JSON.parse(JSON.stringify($scope.connection));
          this['sr' + element.alias].query = {};
          this['sr' + element.alias].query = {
            queryType: "AccountBalance",
            alias: element.alias
          };
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


  .controller('newAccountCtrl',
    function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, $ionicHistory,
      svcNodeSettings) {
      if (!$ionicAuth.isAuthenticated()) {
        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        $state.go('menu.login');
      }
      // Set up the API services
      $scope.svcNodeSettings = svcNodeSettings;
      $scope.newaccForm = {
        alias: '',
        image: ''
      };
      $scope.symbolsList = [
        'img/tokens/Bcoin.png',
        'img/tokens/candle.png',
        'img/tokens/Circuit.png',
        'img/tokens/feather.png',
        'img/tokens/mega.png',
        'img/tokens/Ncoin.png',
        'img/tokens/T.png'
      ];
      $scope.start = function () {
        // Fetch the default system settings on load
        $scope.settings = svcNodeSettings.getSettings();
      }

      $scope.setSymbol = function (image) {
        $scope.newaccForm.image = image
      };

      $scope.start();
    })


  .controller('assetInfoCtrl',
    function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading,
      svcNodeSettings, svcAssets, svcBalances, accAliasFilter) {
      if (!$ionicAuth.isAuthenticated()) {
        $state.go('menu.login');
      }


      // Set up the API services
      $scope.svcNodeSettings = svcNodeSettings;
      $scope.param = $stateParams.assetId;
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
        $scope.Request.asset = {
          id: $stateParams.assetId //FIXME: get this from page request.
        };


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
          this['sr' + element.alias].query = {
            queryType: "AssetBalance",
            alias: element.alias
          };
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



    })


  .controller('availableTradeOffersCtrl',
    function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, $ionicHistory,
      svcTrades, svcUsers, svcNodeSettings) {
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

        $scope.Offers = {
          trades: []
        };
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
    })


  .controller('bidsMadeForOfferIdCtrl',
    function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading,
      svcNodeSettings) {
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

    })


  .controller('newTradeCtrl',
    function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, $ionicHistory,
      svcNodeSettings) {
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
    })


  .controller('bidOnTradeIDCtrl',
    function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, svcNodeSettings) {
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
    })


  .controller('confirmTradeCtrl',
    function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, svcNodeSettings) {
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
    })


  .controller('transactionsCtrl',
    function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, $ionicHistory,
      svcNodeSettings, svcTransactions, svcAccounts, svcAssets, svcBalances) {

      if (!$ionicAuth.isAuthenticated()) {
        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        $state.go('menu.login');
      }

      $scope.svcNodeSettings = svcNodeSettings;
      // Fetch the default system settings on load
      $scope.settings = svcNodeSettings.getSettings();

      $scope.query = {};
      $scope.query.queryType = $stateParams.queryType;
      $scope.query.assetId = $stateParams.assetId;
      $scope.query.accountId = $stateParams.accountId;
      $scope.title = '';


      $scope.connection = {};
      $scope.connection.nodeURL = $scope.settings.nodeURL;
      $scope.connection.clientToken = $scope.settings.clientToken;

      // Set up the API services
      // $scope.svcUsers = svcUsers;
      // $scope.svcAccounts = svcAccounts;
      // $scope.svcAssets = svcAssets;
      // $scope.svcBalances = svcBalances;
      $scope.svcTransactions = svcTransactions;


      $scope.txList = [];
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
      $scope.Request.connection = $scope.connection;

      $scope.Request.query = {};

      $scope.start = function () {

        $scope.Request.query = $scope.query;

        $scope.svcTransactions.query($scope.Request).$promise
          .then(function (data) {

            return data;
          })
          .then(function (data) {
            $scope.txList = data;
          })
          .catch(function (err) {
            console.log('Error: ' + err);
            $ionicLoading.hide({
              template: 'Loading ...'
            });
            alert('Error: ' + err)

          }).finally(function () {
            $ionicLoading.hide({
              template: 'Loading ...'
            });
            //TODO: What else?

            console.log('Done: ');
          });


      }

      $scope.start();
    })


  .controller('transactionDetailCtrl',
    function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, $ionicHistory,
      svcNodeSettings) {
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
    })


  .controller('loginCtrl',
    function ($scope, $rootScope, $state, $stateParams, $ionicPopup, $ionicAuth, $ionicUser, $ionicPush, $ionicLoading, $ionicHistory,
      svcNodeSettings) {

      if ($ionicAuth.isAuthenticated()) {
        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });

        $state.go('menu.myAccounts');
      }

      // Set up the API services
      $scope.svcNodeSettings = svcNodeSettings;

      $scope.start = function () {
        // Fetch the default system settings on load
        $scope.settings = svcNodeSettings.getSettings();

        // $scope.autheticatedUser = $ionicUser.email;
        $scope.loginForm = {
          name: '',
          email: '',
          password: ''
        };
        $scope.isError = true;
        $scope.errormessage = '';


        // $ionicDeploy.check().then(function (snapshotAvailable) {
        //   if (snapshotAvailable) {
        // $ionicLoading.show({
        //   template: 'Downloading update...'
        // });
        //     // When snapshotAvailable is true, you can apply the snapshot
        //     $ionicDeploy.download().then(function () {
        // $ionicLoading.show({
        //   template: 'Installing update...'
        // });
        //       return $ionicDeploy.extract();
        //     }).then(function () {
        //       $ionicDeploy.load();
        //     });
        //   }
        // });


      }

      $scope.formLogin = function (details) {
        // $ionicLoading.show({
        //   template: 'Logging in...'
        // });

        $ionicAuth.login('basic', details)
          .then(function (data) {
            // $ionicPush.register().then(function (t) {
            //   return $ionicPush.saveToken(t);
            // }).then(function (t) {
            //   console.log('Token saved:', t.token);
            // });
            $rootScope.$broadcast('user:updated', data);

            if ($scope.settings.clientToken == '' || $scope.settings.clientToken == null) {
              $state.go('menu.settings', {});
            } else {
              $state.go('menu.about', {});
            }

          })
          .catch(function (err) {
            $scope.isError = true;
            $scope.errormessage = err;
            $scope.showAlert('Error during login', err);
          });
      }

      // An alert dialog
      $scope.showAlert = function (title, err) {
        var alertPopup = $ionicPopup.alert({
          title: title,
          template: 'Message: ' + err
        });

        alertPopup.then(function (res) {
          console.log('Thank you for not eating my delicious ice cream cone');
        });
      };

      $scope.start();

    })


  .controller('logoutCtrl',
    function ($scope, $rootScope, $state, $stateParams, $ionicPush, $ionicAuth, $ionicUser, $ionicLoading, $ionicHistory) {

      // $ionicPush.unregister();
      $ionicAuth.logout();
      $rootScope.$broadcast('user:updated');
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
      $state.go('menu.login');

    })


  .controller('signupCtrl',
    function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, $ionicHistory,
      svcNodeSettings) {
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
      if ($ionicAuth.isAuthenticated()) {
        $state.go('menu.myAccounts');
      }

      $scope.start = function () {
        $scope.signupForm = {
          details: {
            username: '',
            name: '',
            email: '',
            password: '',
            image: ''
          },
          passwordMatch: ''
        };
        $scope.avatarsList = [
          'http://megaicons.net/static/img/icons_sizes/189/462/256/tv-smith-icon.png',
          'http://icons.iconarchive.com/icons/mattahan/ultrabuuf/256/Comics-Older-Superman-icon.png',
          'http://icons.iconarchive.com/icons/mattahan/ultrabuuf/256/Comics-Hulk-Happy-icon.png',
          'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRsqG_v6UxjxQU4dXK70ih48ByBPffeqoYH2cYeF-R3HRMtOGew',
          'http://icons.iconarchive.com/icons/hopstarter/superhero-avatar/256/Avengers-Hawkeye-icon.png',
          'http://icons.iconarchive.com/icons/hopstarter/iron-man-avatar/512/Iron-Man-Mark-III-01-icon.png',
          "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU4IDU4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1OCA1ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxjaXJjbGUgc3R5bGU9ImZpbGw6I0Y3NjM2MzsiIGN4PSIyOSIgY3k9IjI5IiByPSIyOSIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRjdCNTYzOyIgZD0iTTUyLjkzMiw0NS4zNzZDNTIuMjc1LDM4Ljk4NSw0Ni44NzYsMzQsNDAuMzExLDM0aC01Ljk0NkMzMy42MTEsMzQsMzMsMzMuMzg5LDMzLDMyLjYzNVYzMS45OSAgYzAtMC41ODMsMC4zNzktMS4wODIsMC45MjUtMS4yODdjNS44MDQtMi4xODIsOS43NzgtMTEuNzA0LDguOTcxLTE4LjQzM0M0Mi4xMzQsNS45MTksMzYuOTcsMC44MDEsMzAuNjE0LDAuMDkgIGMtMC41MTctMC4wNTgtMS4wMjktMC4wODYtMS41MzUtMC4wODhjLTAuMDE2LDAtMC4wMzItMC4wMDEtMC4wNDgtMC4wMDFDMjEuMjg1LTAuMDE2LDE1LDYuMjU4LDE1LDE0ICBjMCw2LjAyNCwzLjgwNywxNC43NTUsOS4xNDUsMTYuNzI5QzI0LjY2OCwzMC45MjIsMjUsMzEuNDQyLDI1LDMydjAuNjM1QzI1LDMzLjM4OSwyNC4zODksMzQsMjMuNjM1LDM0aC01Ljk0NiAgYy02LjU2NSwwLTExLjk2NCw0Ljk4NS0xMi42MjEsMTEuMzc2QzEwLjI5Myw1Mi45OTgsMTkuMDYxLDU4LDI5LDU4UzQ3LjcwNyw1Mi45OTgsNTIuOTMyLDQ1LjM3NnoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0Y3RTcxNDsiIGQ9Ik0zMy40OTIsNi42MWMzLjcxNSwxLjAyMSw3LjIxMywzLjMwNiw5LjQ1Myw2LjMyMmMtMC4wMTYtMC4yMjEtMC4wMjMtMC40NDctMC4wNDktMC42NjMgIEM0Mi4xMzQsNS45MTksMzYuOTcsMC44MDEsMzAuNjE0LDAuMDljLTAuNTE3LTAuMDU4LTEuMDI5LTAuMDg2LTEuNTM1LTAuMDg4Yy0wLjAxNiwwLTAuMDMyLTAuMDAxLTAuMDQ4LTAuMDAxICBjLTYuOTItMC4wMTUtMTIuNjYsNC45OTUtMTMuODA4LDExLjU4M2wwLjAwNSwwYzAuMTc5LDAuMjUyLDAuMzU0LDAuNTA3LDAuNTQ1LDAuNzVjMC4wNy0wLjA4NywwLjE0MS0wLjE3MywwLjIxMy0wLjI1OCAgYzItMi4zOCw1LjM0MS0yLjkzMSw4LjE4My0xLjY3MUMyNS4wMzQsMTAuNzg3LDI1Ljk5MiwxMSwyNywxMUMyOS45NDIsMTEsMzIuNDU2LDkuMTgyLDMzLjQ5Miw2LjYxeiIvPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNGN0U3MTQ7IiBkPSJNMzMuOTI1LDMwLjcwM0MzMy4zNzksMzAuOTA4LDMzLDMxLjQwNywzMywzMS45OXYwLjY0NUMzMywzMy4zODksMzMuNjExLDM0LDM0LjM2NSwzNGg1Ljk0NiAgIGMwLjkyMywwLDEuODIyLDAuMTA0LDIuNjg5LDAuMjkyVjE0aC0wLjAxMkM0My4wMDIsMjAuMjQsMzkuMjM2LDI4LjcwNiwzMy45MjUsMzAuNzAzeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0Y3RTcxNDsiIGQ9Ik0xNy42ODksMzRoNS45NDZDMjQuMzg5LDM0LDI1LDMzLjM4OSwyNSwzMi42MzVWMzJjMC0wLjU1OC0wLjMzMi0xLjA3OC0wLjg1NS0xLjI3MSAgIEMxOC44MDcsMjguNzU1LDE1LDIwLjAyNCwxNSwxNHYyMC4yOTJDMTUuODY3LDM0LjEwNCwxNi43NjYsMzQsMTcuNjg5LDM0eiIvPgo8L2c+CjxwYXRoIHN0eWxlPSJmaWxsOiNEMzk0NTA7IiBkPSJNMzgsNDBjLTMuOTYxLDAtNy4zODIsMi4zMjItOSw1LjY3QzI3LjM4Miw0Mi4zMjIsMjMuOTYxLDQwLDIwLDQwYy0wLjU1MywwLTEsMC40NDctMSwxczAuNDQ3LDEsMSwxICBjNC40MTEsMCw4LDMuNTg5LDgsOHYzaDJ2LTNjMC00LjQxMSwzLjU4OS04LDgtOGMwLjU1MywwLDEtMC40NDcsMS0xUzM4LjU1Myw0MCwzOCw0MHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6IzI1QUU4ODsiIGQ9Ik01Mi45MzIsNDUuMzc2Yy0wLjM4My0zLjcyNi0yLjM4NS02Ljk2NS01LjI4My05LjAyNkwyOSw1M0wxMC4zNSwzNi4zNSAgYy0yLjg5OCwyLjA2MS00Ljg5OSw1LjMtNS4yODMsOS4wMjZDMTAuMjkzLDUyLjk5OCwxOS4wNjEsNTgsMjksNThTNDcuNzA3LDUyLjk5OCw1Mi45MzIsNDUuMzc2eiIvPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiMyMjk5NzQ7IiBkPSJNNDMsNDd2Ny4zOTJjMC42ODUtMC4zNzksMS4zNS0wLjc4OSwyLTEuMjJWNDdINDN6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojMjI5OTc0OyIgZD0iTTEzLDUzLjE3MmMwLjY1LDAuNDMxLDEuMzE1LDAuODQxLDIsMS4yMlY0N2gtMlY1My4xNzJ6Ii8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="
        ]
        //  [
        //   'img/avatars/AgentSmith.png',
        //   'img/avatars/Hawkeye.png',
        //   'img/avatars/Superman.png',
        //   'img/avatars/Hulk-Happy.png',
        //   'img/avatars/wolverine.jpeg',
        //   'img/avatars/Iron-Man.png'
        // ]
      };


      $scope.setAvatar = function (image) {
        $scope.signupForm.details.image = image;
      };

      $scope.formSignup = function (form) {
        if (form.details.password == form.passwordMatch) {
          // $ionicLoading.show({
          //   template: 'Registering ...'
          // });

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
              .then(function () {
                return $ionicAuth.login('basic', form.details);
              })
              .finally(function () {
                // $ionicLoading.hide({
                //   template: 'Registered'
                // });
                $ionicHistory.nextViewOptions({
                  disableAnimate: true,
                  disableBack: true
                });

                $state.go('menu.myAccounts');

              });

          }, function (err) {
            for (var e of err.details) {
              // $ionicLoading.hide({
              //   template: 'Error: ' + err.details
              // });
              if (e === 'conflict_email') {
                alert('Email already exists.');
              } else {
                alert('Error: ' + err.details);
              }
            }
          });
        } else {
          alert('Paswords do not match!');
        }

      }

      $scope.start();
    })


  .controller('settingsCtrl',
    function ($scope, $state, $stateParams, $ionicAuth, $ionicUser, $ionicLoading,
      svcNodeSettings) {

      // Set up the API services
      $scope.svcNodeSettings = svcNodeSettings;

      $scope.start = function () {
        // Fetch the default system settings on load
        $scope.settings = svcNodeSettings.getSettings();

      }

      $scope.saveSettings = function (_settings) {
        $scope.svcNodeSettings.set("nodeURL", _settings.nodeURL);
        $scope.svcNodeSettings.set("clientToken", _settings.clientToken);

        $scope.settings = svcNodeSettings.getSettings();
        if ($scope.settings.clientToken == '' || $scope.settings.clientToken == null) {
          $state.go('menu.settings', {});
        } else {
          $state.go('menu.about', {});
        }
      };

      $scope.start();

    })

  .controller('aboutCtrl',
    function ($scope, $state, $ionicHistory) {
      $scope.version = '0.0.5';
      $scope.appBuild = '9';
      $scope.appName = 'BlockEx';
      $scope.appPackage = '';

      // $ionicPlatform.ready(function () {

      //   $cordovaAppVersion.getVersionNumber().then(function (version) {
      //     $scope.version = version;
      //   });

      //   $cordovaAppVersion.getVersionCode().then(function (build) {
      //     $scope.appBuild = build;
      //   });

      //   $cordovaAppVersion.getAppName().then(function (name) {
      //     $scope.appName = name;
      //   });

      //   $cordovaAppVersion.getPackageName().then(function (package) {
      //     $scope.appPackage = package;
      //   });

      // }, false);


      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });

      $scope.authorAvatar = 'data:image/jpeg;utf8;base64,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'

      $scope.wglogo = "data:image/png;utf8;base64,iVBORw0KGgoAAAANSUhEUgAAAhwAAADMCAMAAAAPgYpIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAYBQTFRF8vP1zM7OFxcXiIiIrrnN1drlS0tL7Ozs3d3dNE+BGDZvxMXGy8zMubq6paaow8vamZqdlZWYY3ie0dLSKkZ75OTldoiqMzMzyMnJvb2/mJmbqKmrqaqsrq+wrKyu/f3+gpKxwMHCnp6hsrK0tba4vMXV+Pn6xsjI6+3y1NXUlqS+VmyW3OHpcnF0lJSWw8TFsLGz4eXtubq89fb3nJ2fz9HRm6jBQFmIb4Klp6iq0tTTan2ivr/AXHKasrO15ujswcPDy9Les7S2o7DGoaGke3p9pKSmhIOGoKCjTmWRjJy4d3d3IT507fD0iZm2t7i5tL7Q+fr7r7CySWGNoqOlq6yuo6OmoaKk+/z8ury9xsbH19jYdXR3ycvK0tLTkZ+609TU4ODgjIuOiYiKl5eaeHd6m5yfn6Cjzs/PZmZmpKWnyszLpKOlgH+C1tfXdHN29/f5fY6u7+/vhpa0q6utkZCSyMfIm5ueu7u72dratLO1zMzMp6aoEzJsAAAA////xP6EfwAAAIB0Uk5T/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wA4BUtnAAAgN0lEQVR42uyd/0PTxvvAS0tpGmFMaEEQCSggUPyCFcqGWLBzDixfKjqr6KCiW5lvWQnOwYdB/vVPk1yS+5pcWkrbcc8PStNres298tzzPPfck4AmRAhDAuISCBFwCBFwCBFwCBFwCBFwCBFwCBFwCBFwCBFwCBFwCBEi4BAi4BAi4LhkMhaIpOOqIuAQAouiHl95cfP77/8py6ukgEOIKaX4zr37N/v7v//eZOP332cEHEI0LS/1/dpvisPG74sCDiGlazc/fiTZ+P22gOOSAlGIB0yLM/ntn49UNh6KaeVSivrg492rV6/+MjjS97j/I4ONh8cCjkvokny7eldnwxQmGw8nBByXj431u1xsPGwRcFw6KXKycfMBLQ4WKL7fj5cE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";

    })
