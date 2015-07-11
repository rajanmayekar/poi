angular.module('app')
  .controller('ViewPoiCtrl', function ($scope, $stateParams, CacheFactory, uiGmapGoogleMapApi, uiGmapIsReady, PoiService, IconService, GoogleMapFactory, MapHelperService) {
    var googleMapFactory;

    $scope.getIconForType = IconService.getIconForType;

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
      }

      setCurrentLocation = function (location) {
        $scope.currentLocation = location;
        $scope.map.center = {latitude: $scope.currentLocation.geo[0], longitude: $scope.currentLocation.geo[1]};
        $scope.map.zoom = 12;

      };

    $scope.map = {
      show: false,
      poiReady: false,
      mapReady: false
    };

    $scope.locations = [];
    $scope.currentLocation = {};
    $scope.locationMarker = {};

    setCurrentLocation(CacheFactory.get('selectedLocation'));

    PoiService.getPoiById($stateParams.id).then(function (poi) {
      $scope.myPoi = poi;
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

        });
    });

    setMapStyle();
  });
