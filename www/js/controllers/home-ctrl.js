angular.module('app')
  .controller('HomeCtrl', function ($scope, PoiService, IconService, $timeout, ionicMaterialMotion, ionicMaterialInk) {
      $scope.pois = [];
      $scope.getIconForType = IconService.getIconForType;

      $scope.$parent.showHeader();
      $scope.$parent.clearFabs();
      $scope.isExpanded = false;
      $scope.$parent.setExpanded(false);
      $scope.$parent.setHeaderFab('right');

      // Activate ink for controller
      ionicMaterialInk.displayEffect();

      PoiService.getPoiPerLocations().then(function (pois) {
          $scope.pois = pois;

          $timeout(function() {
            ionicMaterialMotion.fadeSlideIn({
                selector: '.animate-fade-slide-in .item'
            });
          }, 100);
      });

      PoiService.getUserLocations().then(function (locations) {
        // @TODO: if no location redirect to add location first.
        // Currently we are getting from mock service.
        $scope.location = locations[0];
      });
  });
