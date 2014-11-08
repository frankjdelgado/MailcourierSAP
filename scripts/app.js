// app.js

// Define module
var app = angular.module('mcapp', ['ui.router']);

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
			controler: 'sessionController',
			templateUrl: 'templates/session/login.html'
		});
}]);