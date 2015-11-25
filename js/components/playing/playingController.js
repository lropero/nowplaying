(function() {
	'use strict';

	angular.module('nowplaying.components.playing')
	.controller('PlayingController', ['$scope', 'cityService', 'twitterService', function($scope, cityService, twitterService) {

		$scope.errors = [];
		$scope.tweets = [];

		if(!navigator.onLine) {
			$scope.errors.push('No Internet connection.');
			return;
		}

		twitterService.initialize();
		var connection = twitterService.connect().then(function() {}, function(reason) {
			$scope.errors.push(reason);
		});

		var getTweets = function() {
			if($scope.latitude && $scope.longitude) {
				connection.then(function() {
					twitterService.getTweets($scope.latitude, $scope.longitude).then(function(response) {
						process(response);
					}, function(reason) {
						$scope.errors.push(reason);
					});
				});
			} else {
				connection.then(function() {
					twitterService.getTweets().then(function(response) {
						process(response);
					}, function(reason) {
						$scope.errors.push(reason);
					});
				});
			}
		};

		var process = function(response) {

			$scope.errors.push('Twitter results: ' + response.statuses.length);

			for(var key in response.statuses) {

				var status = response.statuses[key];

				for(var i in status.entities.urls) {
					if(status.entities.urls[i].display_url.substr(0, 8) === 'youtu.be') {
						$scope.tweets.push({
							text: status.text,
							user: status.user.name,
							video: status.entities.urls[i].expanded_url
						});
						continue;
					}
				}
			}

			$scope.errors.push('Tweets with links to YouTube: ' + $scope.tweets.length);
		};

		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {

				var isNumber = function(n) {
					return !isNaN(parseFloat(n)) && isFinite(n);
				}

				if(isNumber(position.coords.latitude) && isNumber(position.coords.longitude)) {
					$scope.$apply(function() {

						$scope.latitude = position.coords.latitude;
						$scope.longitude = position.coords.longitude;

						cityService.getCity($scope.latitude, $scope.longitude).then(function(city) {
							if(city) {
								$scope.city = city;
							}
						});

						getTweets();
					});
				} else {

					$scope.errors.push('Geolocation error, reading all tweets.');

					getTweets();
				}
			});
		} else {

			$scope.errors.push('Geolocation not supported, reading all tweets.');

			getTweets();
		}
	}]);
})();
