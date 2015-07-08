angular.module('app')
  .service('PoiService', function ($q) {
      // CURRENTLY WE ARE USING MOCK Services.
      this.getUserLocations = function () {
        var userLocations = [
          {
            id: 'dsada32-32sd32-3213dasd',
            name: 'Home',
            geo: [19.1196773, 72.9050809]
          },
          {
            id: 'dsada32-32sd32-3213dasd',
            name: 'Office',
            geo: [19.160801, 73.001415]
          }
        ];

        return $q.when(userLocations);
      };
  });
