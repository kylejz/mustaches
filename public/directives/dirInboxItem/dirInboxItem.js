var app = angular.module('mustApp');

app.directive("dirInboxItem", function() {
	return {
		restrict: "E",
		templateUrl: "directives/dirInboxItem/dirInboxItemTmpl.html",
		link: function(scope, elem, attrs) {
			elem.on('click', function() {
				scope.showMessageText = !scope.showMessageText;
				scope.$apply();
			})
		}
	}
})