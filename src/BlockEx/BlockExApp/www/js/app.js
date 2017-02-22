// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'app.services' is found in services.js
// 'app.controllers' is found in controllers.js
angular.module('app', [
  'ionic',
  'ionic.cloud',
  'ngResource',
  'ngCordova',
  'app.constants',
  'app.controllers',
  'app.routes',
  'app.directives',
  'app.services',
  'app.filters'
])
  .config(function ($ionicCloudProvider) {
    $ionicCloudProvider.init({
      "core": {
        "app_id": "1b48128d"
      }
    });
  })
  .config(function ($ionicConfigProvider, $sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist(['self', '*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

  })


  .run(function ($ionicPlatform, $ionicDeploy) {
    $ionicPlatform.ready(function () {

      $ionicDeploy.check().then(function (snapshotAvailable) {
        if (snapshotAvailable) {
          // When snapshotAvailable is true, you can apply the snapshot
          $ionicDeploy.download().then(function () {
            return $ionicDeploy.extract();
          }).then(function () {
            $ionicDeploy.load();
          });
        }
      });

      $rootScope.checkPermission = function () {
        setLocationPermission = function () {
          cordova.plugins.diagnostic.requestLocationAuthorization(function (status) {
            switch (status) {
              case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                break;
              case cordova.plugins.diagnostic.permissionStatus.DENIED:
                break;
              case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                break;
              case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                break;
            }
          }, function (error) { }, cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS);
        };
        cordova.plugins.diagnostic.getPermissionAuthorizationStatus(function (status) {
          switch (status) {
            case cordova.plugins.diagnostic.runtimePermissionStatus.GRANTED:
              break;
            case cordova.plugins.diagnostic.runtimePermissionStatus.NOT_REQUESTED:
              setLocationPermission();
              break;
            case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED:
              setLocationPermission();
              break;
            case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED_ALWAYS:
              setLocationPermission();
              break;
          }
        }, function (error) { }, cordova.plugins.diagnostic.runtimePermission.ACCESS_COARSE_LOCATION);
      };

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
