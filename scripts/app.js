// app.js

// Define module
var app = angular.module('mcapp', ['ui.router']);

// Config routes
app.config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider,$stateProvider) {
	// All requests to non defined enpoints go to root
	$urlRouterProvider.otherwise('/');

	$stateProvider.
		state('home', {
			templateUrl: 'home.html'
		})
}]);