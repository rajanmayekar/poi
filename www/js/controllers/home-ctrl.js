angular.module('app')
  .controller('HomeCtrl', function ($scope, CacheFactory, PoiService, IconService, $timeout, ionicMaterialMotion, ionicMaterialInk) {
      var pageReady = {
            getPoiPerLocations: false,
            getUserLocations: false,
          },

          doneLoading = function () {
            if (!pageReady.getPoiPerLocations ||
                !pageReady.getUserLocations) {
              return;
            }
            $scope.$parent.hideLoading();

            $timeout(function() {
              ionicMaterialMotion.fadeSlideIn({
                  selector: '.animate-fade-slide-in .item'
              });
            }, 100);
          };

      $scope.pois = [];
      $scope.getIconForType = IconService.getIconForType;

      $scope.$parent.showHeader();
      $scope.$parent.clearFabs();
      $scope.isExpanded = false;
      $scope.$parent.setExpanded(false);
      $scope.$parent.setHeaderFab('right');

      $scope.$parent.showLoading();

      // Activate ink for controller
      ionicMaterialInk.displayEffect();

      PoiService.getPoiPerLocations().then(function (pois) {
          $scope.pois = pois;

          pageReady.getPoiPerLocations = true;
          doneLoading();
      });

      PoiService.getUserLocations().then(function (locations) {
        // @TODO: if no location redirect to add location first.
        // Currently we are getting from mock service.
        $scope.location = locations[0];

        // @TODO: create own factory service and use that with $cacheFactory
        CacheFactory.put('selectedLocation', $scope.location);

        pageReady.getUserLocations = true;
        doneLoading();
      });
  });
