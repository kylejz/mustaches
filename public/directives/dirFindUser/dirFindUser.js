var app = angular.module('mustApp');

app.directive('dirFindUser', function(services, $location) {
	return {
		restrict: 'A',
		link: function(scope, elem, attrs) {
			elem.on('click', function() {
				scope.$apply(function() {
					$location.path("/profiles/" + attrs.dirFindUser);
      			});
			})
		}
	}
})