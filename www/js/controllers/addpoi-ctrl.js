angular.module('app')
  .controller('AddPoiCtrl', function ($scope, uiGmapGoogleMapApi, uiGmapIsReady, PoiService, MapHelperService, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

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
        marker = new RichMarker({
            position: new google.maps.LatLng($scope.locationMarker.latitude, $scope.locationMarker.longitude),
            map: map,
            draggable: true,
            flat: true,
            content: '<span class="icon ion-home poi-marker-icon" title="home" aria-hidden="true"></span>'
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

      // Set marker
      $scope.locationMarker.latitude = $scope.currentLocation.geo[0];
      $scope.locationMarker.longitude = $scope.currentLocation.geo[1];
      $scope.locationMarker.title = $scope.currentLocation.name;
      $scope.locationMarker.id = $scope.currentLocation.id;

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
