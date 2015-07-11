angular.module('app')
  .controller('AddPoiCtrl', function ($scope, uiGmapGoogleMapApi, uiGmapIsReady, PoiService, IconService, MapHelperService, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
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
          console.log($scope.locationMarker);
          $scope.map.show = true;
        }
      },

      setMapStyle = function () {
        $scope.map.options = {styles : MapHelperService.getMapStyleOption()};
      },

      setLocationMarker = function (map) {
        var icon = IconService.getIconForName($scope.currentLocation.icon);

        marker = new RichMarker({
            position: new google.maps.LatLng($scope.currentLocation.geo[0], $scope.currentLocation.geo[1]),
            map: map,
            draggable: false,
            flat: true,
            content: '<span class="poi-marker-icon icon ' + icon + '" title="' + $scope.currentLocation.name + '" aria-hidden="true"></span>'
            });
        };

    $scope.map = {
      show: false,
      poiReady: false,
      mapReady: false
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
            var map = inst.map;
            setLocationMarker(map);
        });
    });

    setMapStyle();
  });
