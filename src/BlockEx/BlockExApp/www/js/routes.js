angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('menu.myAccounts', {
        url: '/myaccount',
        views: {
          'side-menu21': {
            templateUrl: 'templates/myAccounts.html',
            controller: 'myAccountsCtrl'
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
        url: '/tradesList',
        views: {
          'side-menu21': {
            templateUrl: 'templates/availableTradeOffers.html',
            controller: 'availableTradeOffersCtrl'
          }
        }
      })

      .state('menu.bidsMadeForOfferId', {
        url: '/tradeBids',
        views: {
          'side-menu21': {
            templateUrl: 'templates/bidsMadeForOfferId.html',
            controller: 'bidsMadeForOfferIdCtrl'
          }
        }
      })

      .state('menu.assetInfo', {
        url: '/assetDetail',
        views: {
          'side-menu21': {
            templateUrl: 'templates/assetInfo.html',
            controller: 'assetInfoCtrl'
          }
        }
      })

      .state('menu', {
        url: '/side-menu21',
        templateUrl: 'templates/menu.html',
        controller: 'menuCtrl'
      })

      .state('menu.transactions', {
        url: '/txList',
        views: {
          'side-menu21': {
            templateUrl: 'templates/transactions.html',
            controller: 'transactionsCtrl'
          }
        }
      })

      .state('menu.transactionDetail', {
        url: '/txDetail',
        views: {
          'side-menu21': {
            templateUrl: 'templates/transactionDetail.html',
            controller: 'transactionDetailCtrl'
          }
        }
      })

      .state('menu.newTrade', {
        url: '/tradeNew',
        views: {
          'side-menu21': {
            templateUrl: 'templates/newTrade.html',
            controller: 'newTradeCtrl'
          }
        }
      })

      .state('menu.bidOnTradeID', {
        url: '/tradeBid',
        views: {
          'side-menu21': {
            templateUrl: 'templates/bidOnTradeID.html',
            controller: 'bidOnTradeIDCtrl'
          }
        }
      })

      .state('newAccount', {
        url: '/accountNew',
        templateUrl: 'templates/newAccount.html',
        controller: 'newAccountCtrl'
      })

      .state('menu.login', {
        url: '/login',
        views: {
          'side-menu21': {
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
          }
        }
      })

      .state('menu.confirmTrade', {
        url: '/confirmTrade',
        views: {
          'side-menu21': {
            templateUrl: 'templates/confirmTrade.html',
            controller: 'confirmTradeCtrl'
          }
        }
      })

    $urlRouterProvider.otherwise('/side-menu21/login')



  });