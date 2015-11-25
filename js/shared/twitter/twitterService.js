(function() {
	'use strict';

	angular.module('nowplaying.shared.twitter')
	.service('twitterService', ['$q', function($q) {

		this.authorization = false;

		this.connect = function() {

			var deferred = $q.defer();

			var self = this;
			OAuth.popup('twitter', {
				cache: true
			}, function(err, result) {
				if(!err) {
					self.authorization = result;
					deferred.resolve();
				} else {
					deferred.reject(err);
				}
			});

			return deferred.promise;
		},

		this.getTweets = function(latitude, longitude) {

			var deferred = $q.defer();

			if(!this.authorization) {
				deferred.reject('No authorization.');
			} else {
				var url = '/1.1/search/tweets.json?q=%23nowplaying&count=100';
				if(typeof latitude !== 'undefined' && typeof longitude !== 'undefined') {
					url += '&geocode=' + latitude + ',' + longitude + ',50mi';
				}
				this.authorization.get(url).done(function(result) {
					deferred.resolve(result);
				}).fail(function(err) {
					deferred.reject(err);
				});
			}

			return deferred.promise;
		},

		this.initialize = function() {

			OAuth.initialize('MLIo8ueKdCyncWh0RiLz5SN4fsw', {
				cache: true
			});

			this.authorization = OAuth.create('twitter');
		}
	}]);
})();
