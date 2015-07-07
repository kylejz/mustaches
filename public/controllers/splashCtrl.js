var app = angular.module('mustApp');

app.controller('splashCtrl', function($scope, $location) {

	//navigate to main page
	$scope.goHome = function() {
		$location.path('/home')
	}
	
})