angular.module('app')
  .controller('AddPoiCtrl', function ($scope) {
    $scope.map = { center: { latitude: 20, longitude: 76 }, zoom: 8 };
  });
