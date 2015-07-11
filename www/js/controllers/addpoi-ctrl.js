angular.module('app')
  .controller('AddPoiCtrl', function ($scope, CacheFactory, uiGmapGoogleMapApi, uiGmapIsReady, PoiService, GoogleMapFactory, MapHelperService) {
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
      }

      setCurrentLocation = function (location) {
        $scope.currentLocation = location;
        $scope.map.center = {latitude: $scope.currentLocation.geo[0], longitude: $scope.currentLocation.geo[1]};
        $scope.map.zoom = 12;

        $scope.map.poiReady = true;
        setMapReady();
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

    if (CacheFactory.get('selectedLocation')) {
      setCurrentLocation(CacheFactory.get('selectedLocation'));
    } else {
      PoiService.getUserLocations().then(function (locations) {
        // @TODO: if no location redirect to add location first.
        // Currently we are getting from mock service.

        // @TODO: ideally auto select location, near to current user's geo location.
        setCurrentLocation(locations[0]);
      });
    }

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
