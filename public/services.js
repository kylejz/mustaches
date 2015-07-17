var app = angular.module('mustApp');

app.service('services', function($http, $q) {

	this.postMustache = function(obj, url) {
		return $http({
			method: "POST",
			url: "http://poopoo.com:9001/api/mustache",
			data: {img: "https://mustaches.s3-us-west-2.amazonaws.com/" + url, tags: obj.tags.split(" "), name: obj.name}
		})
	}

	this.getTwo = function() {
		var dfrd = $q.defer();
		$http({
			method: 'GET',
			url: "http://poopoo.com:9001/api/2mustache"
		}).then(function(response) {
			dfrd.resolve(response.data);
		})
		return dfrd.promise;
	}

	this.getNewRandom = function() {
		var dfrd = $q.defer();
		$http({
			method: 'GET',
			url: "http://poopoo.com:9001/api/1mustache"
		}).then(function(response) {
			dfrd.resolve(response.data);
		})
		return dfrd.promise;
	}

	this.getAllMustaches = function() {
		var dfrd = $q.defer();
		$http({
			method: "GET",
			url: "http://poopoo.com:9001/api/all"
		}).then(function(response) {
			dfrd.resolve(response.data);
		})
		return dfrd.promise;
	}

	this.searchForStaches = function(text) {
		var dfrd = $q.defer();
		$http({
			method: "GET",
			url: "http://poopoo.com:9001/api/mustache/" + text
		}).then(function(response) {
			dfrd.resolve(response.data);
		})
		return dfrd.promise;
	}

	this.getById = function(itemId) {
		var dfrd = $q.defer();
		$http({
			method: "GET",
			url: "http://poopoo.com:9001/api/mustache-by-id/" + itemId
		}).then(function(response) {
			dfrd.resolve(response.data);
		})
		return dfrd.promise;
	}

	this.getProfileInfo = function(userId) {
		var dfrd = $q.defer();
		$http({
			method: "GET",
			url: "http://poopoo.com:9001/api/user?_id=" + userId
		}).then(function(response) {
			dfrd.resolve(response.data);
		})
		return dfrd.promise;
	}

	this.getUserInbox = function(userId) {
		var dfrd = $q.defer();
		$http({
			method: "GET",
			url: "http://poopoo.com:9001/api/inbox/" + userId
		}).then(function(response) {
			dfrd.resolve(response.data.inbox);
		})
		return dfrd.promise;
	}

	this.getUserForShoutout = function(username) {
		var dfrd = $q.defer();
		$http({
			method: "GET",
			url: "http://poopoo.com:9001/api/user?username=" + username
		}).then(function(response) {
			dfrd.resolve(response.data);
		})
		return dfrd.promise;
	}

	this.getUserInfo = function() {
		var dfrd = $q.defer();
		$http({
			method: "GET",
			url: "http://poopoo.com:9001/api/userInfo"
		}).then(function(response) {
			dfrd.resolve(response.data);
		})
		return dfrd.promise;
	}

	this.addLike = function(idNum) {
		return $http({
			method: "PUT",
			url: "http://poopoo.com:9001/api/win/" + idNum,
		});
	}
	
	this.changeHeart = function(itemId) {
		var dfrd = $q.defer();
		$http({
			method: "POST",
			url: "http://poopoo.com:9001/api/hearts/" + itemId
		}).then(function(response) {
			dfrd.resolve(response.data);
		})
		return dfrd.promise;
	}

	this.newStatus = function(status, userId) {
		return $http({
			method: "POST",
			url: "http://poopoo.com:9001/api/status/" + userId,
			data: {text: status}
		})
	}

	this.newShoutout = function(text, sender, recipient, sendUsername) {
		return $http({
			method: "POST",
			url: "http://poopoo.com:9001/api/shoutout/" + recipient,
			data: {text: text, sender: sender, byName: sendUsername}
		})
	}

	this.hasBeenRead = function(item) {
		return $http({
			method: "PUT",
			url: "http://poopoo.com:9001/api/inbox/" + item._id
		})
	}
})