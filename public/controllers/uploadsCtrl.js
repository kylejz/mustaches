var app = angular.module('mustApp');

app.controller('uploadsCtrl', function($scope, services, $route, $location) {

	$scope.postMustache = function(obj) {
		console.log($route.current.params.imageUrl);
		services.postMustache(obj, $route.current.params.imageUrl)
		.then(function() {
			console.log('first function worked')
			services.getUserInfo()
			.then(function(response2) {
				console.log('second function worked')
				$location.path('/myProfile/' + response2._id)
			})
		})

	}
})