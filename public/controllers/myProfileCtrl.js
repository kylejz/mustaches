var app = angular.module('mustApp');

app.controller('myProfileCtrl', function($scope, myProfileRef, Upload) {
	console.log(myProfileRef);
	
//load data coming from app resolve

	$scope.myProfileData = myProfileRef[0];

})