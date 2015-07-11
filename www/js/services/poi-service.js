angular.module('app')
  .service('PoiService', function ($q, $timeout) {
      // CURRENTLY WE ARE USING MOCK Services.

      //  TO delayed
      var respond = function (response, ms) {
        var deferred = $q.defer();

        $timeout(function () {
          deferred.resolve(response);
        }, ms);

        return deferred.promise;
      };

      this.getUserLocations = function () {
        var userLocations = [
          {
            id: 'dsada32-32sd32-3213dasd',
            name: 'My Home - Airoli',
            icon: 'home',
            geo: [19.1196773, 72.9050809]
          },
          {
            id: 'dsada32-32sd32-3213dasd',
            name: 'Office',
            icon: 'office',
            geo: [19.160801, 73.001415]
          }
        ];

        return respond(userLocations, 1000);
      };

      this.getPoiPerLocations = function (locationId) {
        var pois = [
          {
            id: 'dsada32-32sd32-3213dasd',
            name: 'D-Mart',
            body: 'This is nice shopping centernice shopping center nice shopping center nice shopping centernice shopping center',
            tags: ['Market', 'shop'],
            type: 'shopping',
            geo: [19.1196773, 72.9050809]
          },
          {
            id: 'dsada32-32sd32-3213dasd',
            name: 'Railway Station',
            body: 'Very close to my house',
            tags: ['Travel', 'Railway'],
            type: 'travelling',
            geo: [19.1196773, 72.9050809]
          }
        ];

        return respond(pois, 1000);
      }
  });
