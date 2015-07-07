var app = angular.module('mustApp');

app.directive('dirSidebar', function() {
	return {
		restrict: 'E',
		templateUrl: 'directives/dirSidebar/dirSidebarTmpl.html',
		controller: function($scope, $firebaseArray) {
			$scope.happenings = $firebaseArray(new Firebase("https://real-time-updates.firebaseio.com/happenings"))
		}
	}
})