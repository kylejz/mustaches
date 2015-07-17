var app = angular.module('mustApp');

app.controller('profileCtrl', function($scope, profileRef) {
	$scope.profileData = profileRef[0];
})