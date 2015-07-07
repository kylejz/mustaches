var app = angular.module('mustApp');

app.controller('homeCtrl', function($scope, twoStacheRef, services, $firebaseArray) {
	
	$scope.twoToUse = twoStacheRef;

	console.log($scope.twoToUse)

	$scope.addLike = function(num) {
		services.addLike(num);
	}

	$scope.getNewRandom = function(num) {
		console.log('hey');
		services.getNewRandom()
		.then(function(response) {
			for (var i = 0; i < 2; i++) {
				if ($scope.twoToUse[i]._id === response._id) {
					return $scope.getNewRandom(num);
				}
			}
			for (var i = 0; i < 2; i++) {
					if ($scope.twoToUse[i]._id === num) {
						return $scope.twoToUse[i] = response;
				}
			}
		});
	}

	// for the firebase live updates bar

	var happeningsArray = $firebaseArray(new Firebase("https://real-time-updates.firebaseio.com/happenings"))

	$scope.postWinToFirebase = function(item) {
		happeningsArray.$add({
			user: item.user,
			text: " just gained a point!",
			date: new Date().getTime()
		})
	}
})