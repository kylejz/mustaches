var app = angular.module('mustApp');

app.directive('dirProfileItem', function() {
	return {
		templateUrl: 'directives/dirProfileItem/dirProfileItemTmpl.html',
		scope: {
			mustacheData: '='
		}
	}
});