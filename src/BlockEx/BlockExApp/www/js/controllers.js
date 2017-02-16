angular.module('app.controllers', ['ionic'])

  .controller('myProfileCtrl',
  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function ($scope, $stateParams, $timeout, $ionicLoading, svcSettings, svcUsers) {

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
          // $scope.hideLoading();
          //$scope.login();
        });
    }

    // $scope.showLoading = function () {
    //   $ionicLoading.show({
    //     template: 'Loading...'
    //   });
    // };
    // $scope.hideLoading = function () {
    //   $ionicLoading.hide();
    // };
    $scope.start();
  }
  )

  .controller('myAccountsCtrl', ['$scope', '$stateParams',
    // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $timeout, $ionicLoading, svcSettings, svcUsers, svcAccounts, svcAssets) {

      $scope.start = function () {
        $scope.mockUser = 'GaryD';
        $scope.userProfile = [];

        // Set up the API services
        $scope.SVCappUsers = svcUsers;
        $scope.SVCchainAccounts = svcAccounts;
        $scope.SVCchainAssets = svcAssets;

        $scope.accountRequest = {
          "connection": {
            "nodeURL": "http://41.76.226.170:1999",
            "clientToken": "AppDev:18bbc4a6fab7a3f27ce4ea636ec5cd6470b3a1b84449590125f1191d069ab0a2"
          },
          "account": {}
        };

        $scope.SVCchainAccounts.post({ userName: $scope.mockUser }).$promise
          .then(function (data) {
            $scope.userProfile = data;
          })
          .finally(function () {
            // $scope.hideLoading();
            //$scope.login();
          });
      }

      // $scope.showLoading = function () {
      //   $ionicLoading.show({
      //     template: 'Loading...'
      //   });
      // };
      // $scope.hideLoading = function () {
      //   $ionicLoading.hide();
      // };
      $scope.start();

    }
  ])

  .controller('availableTradeOffersCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }
  ])

  .controller('bidsMadeForOfferIdCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }
  ])

  .controller('assetInfoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }
  ])

  .controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }
  ])

  .controller('transactionsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }
  ])

  .controller('transactionDetailCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }
  ])

  .controller('newTradeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }
  ])

  .controller('bidOnTradeIDCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }
  ])

  .controller('newAccountCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }
  ])

  .controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }
  ])

  .controller('confirmTradeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }
  ])