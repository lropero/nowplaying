(function() {
	'use strict';

	angular.module('nowplaying.shared.errors')
	.directive('errors', function() {
		return {
			replace: true,
			restrict: 'E',
			scope: {
				errors: '='
			},
			templateUrl: 'js/shared/errors/errorsView.html'
		};
	});
})();
