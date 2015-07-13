angular.module('app')
  .controller('HomeCtrl', function ($scope, CacheFactory, PoiService, IconService, $timeout, ionicMaterialMotion, ionicMaterialInk) {
      var cachedPois,
          cachedLocation,
          pageReady = {
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


      cachedPois = CacheFactory.get('pois');
      cachedLocation = CacheFactory.get('selectedLocation');

      $scope.getIconForType = IconService.getIconForType;

      $scope.$parent.showHeader();
      $scope.$parent.clearFabs();
      $scope.isExpanded = false;
      $scope.$parent.setExpanded(false);
      $scope.$parent.setHeaderFab('right');


      $scope.$parent.showLoading();

      // Activate ink for controller
      ionicMaterialInk.displayEffect();

      if (cachedPois) {
        $scope.pois = cachedPois;
        pageReady.getPoiPerLocations = true;

        doneLoading();
      } else {
        PoiService.getPoiPerLocations().then(function (pois) {
            $scope.pois = pois;

            pageReady.getPoiPerLocations = true;
            CacheFactory.put('pois', pois);
            doneLoading();
        });
      }

      if (cachedLocation) {
          $scope.location = cachedLocation;

          pageReady.getUserLocations = true;
          doneLoading();
      } else {
        PoiService.getUserLocations().then(function (locations) {
          // @TODO: if no location redirect to add location first.
          // Currently we are getting from mock service.
          $scope.location = locations[0];

          // @TODO: create own factory service and use that with $cacheFactory
          CacheFactory.put('selectedLocation', $scope.location);

          pageReady.getUserLocations = true;
          doneLoading();
        });
      }
  });
