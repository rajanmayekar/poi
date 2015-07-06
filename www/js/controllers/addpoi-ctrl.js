angular.module('app')
  .controller('AddPoiCtrl', function ($scope, uiGmapGoogleMapApi) {
    $scope.map = { center: { latitude: 20, longitude: 76 }, zoom: 8 };

    uiGmapGoogleMapApi.then(function(maps) {
      var styleArray = [
        {
          featureType: "all",
          stylers: [
            { saturation: -80 }
          ]
        },{
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [
            { hue: "#00ffee" },
            { saturation: 50 }
          ]
        },{
          featureType: "poi.business",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
        }
      ];

      // Set stye @todo
    });
  });
