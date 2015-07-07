var app = angular.module('mustApp');

app.directive('dirHeader', function() {
	return {
		restrict: 'E',
		templateUrl: 'directives/dirHeader/dirHeaderTmpl.html',
		controller: function($scope, $location) {
			$scope.goHome = function() {
				$location.path('/home');
			}
			$scope.goBrowse = function() {
				$location.path('/browse');
			}
			$scope.goList = function() {
				$location.path('/list');
			}
		}
	}
})