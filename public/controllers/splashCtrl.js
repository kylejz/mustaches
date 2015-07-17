var app = angular.module('mustApp');

app.controller('splashCtrl', function($scope, $location) {

	$scope.showText1 = true;
	$scope.showText2 = false;

	(function () {
		window.setInterval(function() {
			$scope.showText1 = !$scope.showText1;
			$scope.showText2 = !$scope.showText2;
		}, 2000)
	})();
})