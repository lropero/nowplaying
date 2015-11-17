(function() {
	'use strict';

	angular.module('nowplaying.shared.city')
	.service('cityService', ['$http', '$q', function($http, $q) {
		this.getCity = function(latitude, longitude) {

			var deferred = $q.defer();
			$http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude).then(function(response) {

				var city = false;

				if(response.data.results[1].formatted_address) {
					city = response.data.results[1].formatted_address;
				}

				deferred.resolve(city);
			});

			return deferred.promise;
		}
	}]);
})();
