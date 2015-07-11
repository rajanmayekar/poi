angular.module('app')
  .factory('CacheFactory', function ($cacheFactory) {
      var appCache = $cacheFactory('poiApp');

      return {
        put: function (key, value) {
          appCache.remove(key);
          appCache.put(key, value);
        },

        get: function (key) {
          return appCache.get(key);
        }
      }
    });
