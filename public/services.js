var app = angular.module('mustApp');

app.service('services', function($http, $q) {

	this.getTwo = function() {
		var dfrd = $q.defer();
		$http({
			method: 'GET',
			url: "http://localhost:9001/api/2mustache"
		}).then(function(response) {
			dfrd.resolve(response.data);
		})
		return dfrd.promise;
	}

	this.addLike = function(idNum) {
		return $http({
			method: "PUT",
			url: "http://localhost:9001/api/win/" + idNum,
		});
	}

	this.getNewRandom = function() {
		var dfrd = $q.defer();
		$http({
			method: 'GET',
			url: "http://localhost:9001/api/1mustache"
		}).then(function(response) {
			dfrd.resolve(response.data);
		})
		return dfrd.promise;
	}

	this.searchForStaches = function(text) {
		var dfrd = $q.defer();
		$http({
			method: "GET",
			url: "http://localhost:9001/api/mustache/" + text
		}).then(function(response) {
			dfrd.resolve(response.data);
		})
		return dfrd.promise;
	}

	this.getProfileInfo = function(username) {
		var dfrd = $q.defer();
		$http({
			method: "GET",
			url: "http://localhost:9001/api/user?username=" + username
		}).then(function(response) {
			dfrd.resolve(response.data);
		})
		return dfrd.promise;
	}
})