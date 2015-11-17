(function() {
	'use strict';

	angular.module('nowplaying.shared.errors')
	.directive('errors', function() {
		return {
			replace: true,
			restrict: 'E',
			templateUrl: 'js/shared/errors/errorsView.html'
		};
	});
})();
