var app = angular.module('mustApp');

app.controller('listCtrl', function($scope, services) {

	$scope.queryOptions = [
		{
			text: 'Today',
			value: 1
		},
		{
			text: "This week",
			value: 2
		},
		{
			text: "All time",
			value: 3
		}
	]

	$scope.mustacheData = [];

	$scope.getMustacheByDate = function(num) {
		if (num) {	
			services.getAllMustaches()
			.then(function(response) {
				if (num === 3) {
					$scope.mustacheData = response;
				} else if (num === 1) {
					for (var i = 0; i < response.length; i++) {
						for (var j = 0; j < response[i].wins.length; j++) {
							if (new Date(response[i].wins[j]) < moment().startOf('day').toDate()) {
								response[i].wins.splice(j, 1);
								j--;
							}					
						}
					}
					$scope.mustacheData = response;
				} else if (num === 2) {
					for (var i = 0; i < response.length; i++) {
						for (var j = 0; j < response[i].wins.length; j++) {
							if (new Date(response[i].wins[j]) < moment().subtract(7, 'd').toDate()) {
								response[i].wins.splice(j, 1);
								j--;
							}
						}
					}
					$scope.mustacheData = response;
				}
			})
		}
	}
})