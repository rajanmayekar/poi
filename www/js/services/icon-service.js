angular.module('app')
  .service('IconService', function ($q, $timeout) {
    var typeIconList = {
      'shopping' : 'ion-ios-cart',
      'travelling' : 'ion-android-bus',
      'other': 'ion-ios-location'
    };

    this.getIconForType = function (type) {
      if (typeIconList[type]) {
        return typeIconList[type];
      }

      return typeIconList.other;
    };
});
