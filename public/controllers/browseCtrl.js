var app = angular.module('mustApp');

app.controller('browseCtrl', function($scope, services) {
	
	$scope.mustacheData = [];

	$scope.searchForStaches = function(text) {
		services.searchForStaches(text)
		.then(function(response) {
			$scope.mustacheData = response;
			console.log($scope.mustacheData);
		})
	}
})