var app = angular.module('mustApp', ['ngRoute', 'firebase', 'angularMoment', 'ngFileUpload']);

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
	.when('/profiles/:userId', {
		templateUrl: 'templates/profileTmpl.html',
		controller: 'profileCtrl',
		resolve: {
			profileRef: function(services, $route) {
				return services.getProfileInfo($route.current.params.userId);
			}
		}
	})
	.when('/myProfile/:userId', {
		templateUrl: 'templates/myProfileTmpl.html',
		controller: 'myProfileCtrl',
		resolve: {
			myProfileRef: function(services, $route) {
				return services.getProfileInfo($route.current.params.userId);
			}
		}
	})
	.when('/inbox/:userId', {
		templateUrl: 'templates/inboxTmpl.html',
		controller: 'inboxCtrl',
		resolve: {
			inboxRef: function(services, $route) {
				return services.getUserInbox($route.current.params.userId);
			}
		}
	})
	.when('/uploads/:imageUrl', {
		templateUrl: 'templates/uploadsTmpl.html',
		controller: 'uploadsCtrl'
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