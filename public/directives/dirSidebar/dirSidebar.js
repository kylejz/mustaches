var app = angular.module('mustApp');

app.directive('dirSidebar', function() {
	return {
		restrict: 'E',
		templateUrl: 'directives/dirSidebar/dirSidebarTmpl.html',
		controller: function($scope, $firebaseArray, services) {
			$scope.happenings = $firebaseArray(new Firebase("https://real-time-updates.firebaseio.com/happenings"));
			
			//status and shoutout controls

			$scope.newStatusShow = false;
			$scope.newShoutoutShow = false;
			$scope.shoutoutTextShow = false;
			$scope.findShoutoutResults = false;

			//service calls to actually post the data

			$scope.postNewStatus = function(text) {
				services.getUserInfo()
				.then(function(response) {
					$scope.happenings.$add({
						userName: response.username,
						userId: response._id,
						text: "\"" + text + "\"",
						date: new Date().getTime(),
						isImportant: true
					}).then(function() {
						if ($scope.happenings.length > 25) {
							$scope.happenings.$remove($scope.happenings[0])
						}
					})
					services.newStatus(text, response._id)
					.then(function(response2) {
						$scope.newStatusText = "";
						$scope.newStatusShow = false;
					})
				})
			}

			$scope.matchingUsers = [];

			$scope.findShoutoutTarget = function(recipientName) {
				services.getUserForShoutout(recipientName)
				.then(function(response) {
					$scope.matchingUsers = response;
				})
			}

			$scope.postNewShoutout = function(text, user) {
				console.log('wut');
				services.getUserInfo()
				.then(function(response) {
					console.log(response);
					$scope.happenings.$add({
						userName: response.username,
						userId: response._id,
						text: "to " + user.username + ": " + "\"" + text + "\"",
						date: new Date().getTime(),
						isImportant: true
					}).then(function() {
						if ($scope.happenings.length > 25) {
							$scope.happenings.$remove($scope.happenings[0])
						}
					})
					services.newShoutout(text, response._id, user._id, response.username)
					.then(function(response2) {
						console.log(user);
						console.log(response2);
						$scope.newShoutoutText = "";
						$scope.shoutoutTextShow = false;
					})
				})
			}
		}
	}
})