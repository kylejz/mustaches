var app = angular.module('mustApp');

app.directive('dirHearts', function(services, $firebaseArray) {
	return {
		restrict: 'E',
		templateUrl: 'directives/dirHearts/dirHeartsTmpl.html',
		controller: function($scope) {
			$scope.happeningsArray = $firebaseArray(new Firebase("https://real-time-updates.firebaseio.com/happenings"))
		},
		link: function(scope, elem, attrs) {
			elem.on('click', function() {
				services.changeHeart(scope.item._id)
				.then(function(response) {
					if (response === 'it uphearted') {
						scope.happeningsArray.$add({
							userName: scope.item.userName,
							userId: scope.item.userId,
							text: " just earned some love!",
							date: new Date().getTime(),
							isImportant: false
						}).then(function() {
								if (scope.happeningsArray.length > 25) {
									scope.happeningsArray.$remove(scope.happeningsArray[0])
								}
							})
					}
					services.getById(scope.item._id)
					.then(function(response) {
						scope.item = response;
					})
				})
			})
		}
	}
})