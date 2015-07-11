angular.module('app')
  .controller('AddPoiCtrl', function ($scope, uiGmapGoogleMapApi, uiGmapIsReady, PoiService, GoogleMapFactory, IconService, MapHelperService, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    var googleMapFactory;

    $scope.myPoi = {
      myLocation : true
    }

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('right');

    /*
    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);
    */

    // Activate ink for controller
    // ionicMaterialInk.displayEffect();

    var setMapReady = function () {
        if ($scope.map.show) {
          return;
        }

        if ($scope.map.poiReady && $scope.map.mapReady) {
          $scope.map.show = true;
        }
      },

      setMapStyle = function () {
        $scope.map.options = {styles : MapHelperService.getMapStyleOption()};
      };

    $scope.map = {
      show: false,
      poiReady: false,
      mapReady: false
    };

    $scope.onMyLocationToggle = function () {
      if ($scope.myPoi.myLocation) {
        document.getElementById('pac-input').style.display = 'none';
      } else {
        document.getElementById('pac-input').style.display = 'block';
      }
    };

    $scope.locations = [];
    $scope.currentLocation = {};
    $scope.locationMarker = {};

    PoiService.getUserLocations().then(function (locations) {
      // @TODO: if no location redirect to add location first.
      // Currently we are getting from mock service.

      $scope.map.locations = locations;

      // @TODO: ideally auto select location, near to current user's geo location.
      $scope.currentLocation = locations[0];

      $scope.map.center = {latitude: $scope.currentLocation.geo[0], longitude: $scope.currentLocation.geo[1]};
      $scope.map.zoom = 12;

      $scope.map.poiReady = true;
      setMapReady();
    });

    uiGmapGoogleMapApi.then(function(maps) {
      $scope.map.mapReady = true;
      setMapReady();
    });

    uiGmapIsReady.promise(1).then(function(instances) {
        instances.forEach(function(inst) {
            googleMapFactory = new GoogleMapFactory(inst.map);

            googleMapFactory.setLocationMarker($scope.currentLocation);
            googleMapFactory.setLocationSearcher($scope.currentLocation);

            $scope.onMyLocationToggle();
        });
    });

    setMapStyle();
  });
