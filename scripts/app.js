// app.js

// Define module
var app = angular.module('mcapp', ['ui.router','LocalStorageModule']);

// Config routes
app.config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider,$stateProvider) {
	// All requests to non defined enpoints go to root
	$urlRouterProvider.otherwise('/');

	// Define routes and templates. Each state represents a route
	// Controler convention 'nameCtrl'. Folder: controller/homeCtrl.js
	$stateProvider
		.state('home', {
			url: '/',
			controler: 'homeCtrl',
			templateUrl: 'templates/home.html'
		})
		.state('login', {
			url: '/login',
			controler: 'sessionCtrl',
			templateUrl: 'templates/session/login.html'
		})
		.state('packages', {
			url: '/packages',
			controler: 'packageCtrl',
			templateUrl: 'templates/packages/index.html'
		});
}]);

// Config localstorage
app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setStorageType('sessionStorage');
});

