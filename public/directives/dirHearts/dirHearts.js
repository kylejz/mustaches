var app = angular.module('mustApp');

app.directive('dirHearts', function() {
	return {
		restrict: 'E',
		templateUrl: 'directives/dirHearts/dirHeartsTmpl.html',
		link: function(scope, elem, attrs) {
			elem.on('click', function() {
				
			})
		}
	}
})