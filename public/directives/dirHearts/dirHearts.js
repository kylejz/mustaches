var app = angular.module('mustApp');

app.directive('dirHearts', function(services) {
	return {
		restrict: 'E',
		templateUrl: 'directives/dirHearts/dirHeartsTmpl.html',
		link: function(scope, elem, attrs) {
			elem.on('click', function() {
				services.changeHeart(scope.item._id)
				.then(function(response) {
					console.log(response);
				})
			})
		}
	}
})