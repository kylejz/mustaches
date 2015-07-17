var app = angular.module('mustApp');

app.controller('splashCtrl', function($scope, $location) {

	$scope.showText1 = true;
	$scope.showText2 = false;

	var changeText = function () {
		window.setInterval(function() {
			console.log('hey', $scope.showText1, $scope.showText2);
			$scope.showText1 = !$scope.showText1;
			$scope.showText2 = !$scope.showText2;
			console.log('ho', $scope.showText1, $scope.showText2);
			$scope.$apply();
		}, 2000)
	}

	changeText();
})