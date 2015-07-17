var app = angular.module('mustApp');

app.controller('inboxCtrl', function($scope, inboxRef, services) {
	$scope.messages = inboxRef;

	$scope.hasBeenRead = function(item) {
		services.hasBeenRead(item)
		.then(function(response) {
		})
	}
})