angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider



      .state('menu.myAccounts', {
        cache: false,
        url: '/myAccount',
        views: {
          'side-menu21': {
            templateUrl: 'templates/myAccounts.html',
            controller: 'myAccountsCtrl'
          }
        }
      })

      .state('menu.newAccount', {
        cache: false,
        url: '/accountNew',
        views: {
          'side-menu21': {
            templateUrl: 'templates/newAccount.html',
            controller: 'newAccountCtrl'
          }
        }
      })

      .state('menu.myProfile', {
        url: '/userProfile',
        views: {
          'side-menu21': {
            templateUrl: 'templates/myProfile.html',
            controller: 'myProfileCtrl'
          }
        }
      })

      .state('menu.availableTradeOffers', {
        cache: false,
        url: '/tradesList',
        views: {
          'side-menu21': {
            templateUrl: 'templates/availableTradeOffers.html',
            controller: 'availableTradeOffersCtrl'
          }
        }
      })

      .state('menu.bidsMadeForOfferId', {
        cache: false,
        url: '/tradeBids',
        views: {
          'side-menu21': {
            templateUrl: 'templates/bidsMadeForOfferId.html',
            controller: 'bidsMadeForOfferIdCtrl'
          }
        }
      })

      .state('menu.assetInfo', {
        url: '/assetDetail/{assetId}',
        views: {
          'side-menu21': {
            templateUrl: 'templates/assetInfo.html',
            controller: 'assetInfoCtrl'
          }
        }
      })

      .state('menu', {
        cache: false,
        url: '/side-menu21',
        templateUrl: 'templates/menu.html',
        controller: 'menuCtrl'
      })

      .state('menu.transactions', {
        cache: false,
        url: '/txList/{queryType}/{accountId}/{assetId}',
        views: {
          'side-menu21': {
            templateUrl: 'templates/transactions.html',
            controller: 'transactionsCtrl'
          }
        }
      })

      // .state('menu.transactionDetail', {
      //   url: '/txDetail/{tx}',
      //   views: {
      //     'side-menu21': {
      //       templateUrl: 'templates/transactionDetail.html',
      //       controller: 'transactionDetailCtrl'
      //     }
      //   }
      // })

      .state('menu.newTrade', {
        cache: false,
        url: '/tradeNew',
        views: {
          'side-menu21': {
            templateUrl: 'templates/newTrade.html',
            controller: 'newTradeCtrl'
          }
        }
      })

      .state('menu.bidOnTradeID', {
        cache: false,
        url: '/tradeBid',
        views: {
          'side-menu21': {
            templateUrl: 'templates/bidOnTradeID.html',
            controller: 'bidOnTradeIDCtrl'
          }
        }
      })


      .state('menu.login', {
        cache: false,
        url: '/login',
        views: {
          'side-menu21': {
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
          }
        }
      })

      .state('menu.logout', {
        cache: false,
        url: '/logout',
        views: {
          'side-menu21': {
            template: '',
            controller: 'logoutCtrl'
          }
        }
      })

      .state('menu.signup', {
        url: '/signup',
        views: {
          'side-menu21': {
            templateUrl: 'templates/signup.html',
            controller: 'signupCtrl'
          }
        }
      })

      .state('menu.confirmTrade', {
        cache: false,
        url: '/confirmTrade',
        views: {
          'side-menu21': {
            templateUrl: 'templates/confirmTrade.html',
            controller: 'confirmTradeCtrl'
          }
        }
      })

      .state('menu.settings', {
        url: '/settings',
        views: {
          'side-menu21': {
            templateUrl: 'templates/settings.html',
            controller: 'settingsCtrl'
          }
        }
      })

      .state('menu.about', {
        cache: false,
        url: '/about',
        views: {
          'side-menu21': {
            templateUrl: 'templates/about.html',
            controller: 'aboutCtrl'
          }
        }
      })

    $urlRouterProvider.otherwise('/side-menu21/login')



  });
