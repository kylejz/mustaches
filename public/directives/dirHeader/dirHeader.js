var app = angular.module('mustApp');

app.directive('dirHeader', function(services) {
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
			$scope.getUserInfo = function() {
				services.getUserInfo()
				.then(function(response) {
					$location.path('/myProfile/' + response._id);
				})
			}
			$scope.getUserInbox = function() {
				services.getUserInfo()
				.then(function(response) {
					$location.path('/inbox/' + response._id)
				})
			}
		}
	}
})