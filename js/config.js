(function() {
	'use strict';

	angular.module('nowplaying')
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/', {
			redirectTo: 'playing'
		})
		.when('/playing', {
			controller: 'PlayingController',
			templateUrl: 'js/components/playing/playingView.html'
		})
		.otherwise({
			redirectTo: '/'
		});
	}]);
})();
