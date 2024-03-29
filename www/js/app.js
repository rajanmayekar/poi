angular.module('app', ['ionic', 'ionic-material', 'uiGmapgoogle-maps'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
/*
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization,markerwithlabel'
    });
})
*/
.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider) {

  $ionicConfigProvider.views.maxCache(0);
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('app', {
      templateUrl: 'partials/app.html',
      controller: 'AppCtrl',
      abstract: true
    })
    .state('app.login', {
      url: '/login',
      views: {
        'mainContent': {
          templateUrl: 'partials/login.html',
          controller: 'LoginController'
        },
        'fabContent': {
            template: '<button id="fab-login" ng-click="$state.go(\'app.addpoi\')" class="button button-fab button-fab-bottom-right button-energized-900 flap"><i class="icon ion-plus"></i></button>',
            controller: function ($scope, $state, $timeout) {
              $scope.$state = $state;
              //  $timeout(function () {
              document.getElementById('fab-login').classList.toggle('on');
              //  }, 100);
            }
        }
    }
    })
    .state('app.home', {
      url: '/home',
      views: {
        'mainContent': {
          templateUrl: 'partials/home.html',
          controller: 'HomeCtrl'
        },
        'fabContent': {
            template: '<button id="fab-home" ng-click="$state.go(\'app.addpoisss\')" class="button button-fab button-fab-bottom-right button-energized-900 flap"><i class="icon ion-plus"></i></button>',
            controller: function ($scope, $state, $timeout) {
              $scope.$state = $state;
              //  $timeout(function () {
              document.getElementById('fab-home').classList.toggle('on');
              //  }, 100);
            }
        }
     }
    })
    .state('app.addpoi', {
      url: '/addpoi',
      views: {
        'mainContent': {
          templateUrl: 'partials/addpoi.html',
          controller: 'AddPoiCtrl'
        },
        'fabContent': {
            template: '<button id="fab-findlocation" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-android-locate"></i></button>',
            controller: function ($timeout) {
                $timeout(function () {
                    document.getElementById('fab-findlocation').classList.toggle('on');
                }, 100);
            }
        }
     }
    })
    .state('app.poi', {})
    .state('app.poi.view', {
      url: '/poi/:id',
      parent: 'app',
      views: {
        'mainContent': {
          templateUrl: 'partials/viewpoi.html',
          controller: 'ViewPoiCtrl'
        },
        'fabContent': {
            template: ''
        }
     }
    });
  $urlRouterProvider.otherwise('/login');


});
