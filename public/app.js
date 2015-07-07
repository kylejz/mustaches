var app = angular.module('mustApp', ['ngRoute', 'firebase', 'angularMoment']);

app.config(function($routeProvider) {
	$routeProvider
	.when('/home', {
		templateUrl: 'templates/homeTmpl.html',
		controller: 'homeCtrl',
		resolve: {
			twoStacheRef: function(services) {
				return services.getTwo();
			}
		}
	})
	.when('/browse', {
		templateUrl: 'templates/browseTmpl.html',
		controller: 'browseCtrl'
	})
	.when('/profiles/:username', {
		templateUrl: 'templates/profileTmpl.html',
		controller: 'profileCtrl',
		resolve: {
			profileRef: function(services, $route) {
				return services.getProfileInfo($route.current.params.username);
			}
		}
	})
	.when('/list', {
		templateUrl: 'templates/listTmpl.html',
		controller: 'listCtrl'
	})
	.when('/splash', {
		templateUrl: 'templates/splashTmpl.html',
		controller: 'splashCtrl'
	})
	.otherwise({
		redirectTo: '/splash'
	})
})