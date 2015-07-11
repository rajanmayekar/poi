angular.module('app')
  .service('IconService', function ($q, $timeout) {
    var typeIconList = {
      'shopping' : 'ion-ios-cart',
      'travelling' : 'ion-android-bus',
      'other': 'ion-ios-location'
    };

    var nameIconList = {
      'home': 'ion-home',
      'office': 'ion-home',
      'other': 'ion-home'
    };

    this.getIconForType = function (type) {
      if (typeIconList[type]) {
        return typeIconList[type];
      }

      return typeIconList.other;
    };

    this.getIconForName = function (name) {
      if (nameIconList[name]) {
        return nameIconList[name];
      }

      return nameIconList.other;
    };
});
