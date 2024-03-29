angular.module('app')
  .factory('GoogleMapFactory', function (IconService) {

      var GoogleMapFactory = function (map) {
        this.map = map;
      };

      GoogleMapFactory.prototype.setLocationMarker = function (location) {
        var icon = IconService.getIconForName(location.icon);

        marker = new RichMarker({
            position: new google.maps.LatLng(location.geo[0], location.geo[1]),
            map: this.map,
            draggable: false,
            flat: true,
            content: '<span class="poi-marker-icon royal icon ' + icon + '" title="' + location.name + '" aria-hidden="true"></span>'
        });
      };

      GoogleMapFactory.prototype.setLocationSearcher = function (location, locationPoints) {
        var input = /** @type {HTMLInputElement} */(
            document.getElementById('pac-input'));

        var map = this.map;

        var types = document.getElementById('type-selector');
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });

        google.maps.event.addListener(autocomplete, 'place_changed', function() {
          infowindow.close();
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
          marker.setIcon(/** @type {google.maps.Icon} */({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
          }));
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
          infowindow.open(map, marker);

          locationPoints.lat = place.geometry.location.lat();
          locationPoints.lng = place.geometry.location.lng();
        });

        /*
        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        function setupClickListener(id, types) {
          var radioButton = document.getElementById(id);
          google.maps.event.addDomListener(radioButton, 'click', function() {
            autocomplete.setTypes(types);
          });
        }

        setupClickListener('changetype-all', []);
        setupClickListener('changetype-address', ['address']);
        setupClickListener('changetype-establishment', ['establishment']);
        setupClickListener('changetype-geocode', ['geocode']);
        */
      };

      GoogleMapFactory.prototype.setPoiMarker = function () {

      };
      return GoogleMapFactory;
  });
