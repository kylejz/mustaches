var app = angular.module('mustApp');

app.controller('homeCtrl', function($scope, twoStacheRef, services, $firebaseArray) {
	
	$scope.twoToUse = twoStacheRef;

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
		console.log(item);
		happeningsArray.$add({
			userName: item.userName,
			userId: item.userId,
			text: " just gained a point!",
			date: new Date().getTime(),
			isImportant: false
		}).then(function() {
			if (happeningsArray.length > 25) {
				happeningsArray.$remove(happeningsArray[0])
			}
		})
	}
})