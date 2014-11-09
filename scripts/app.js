// app.js

// Define module
var app = angular.module('mcapp', ['ui.router','LocalStorageModule']);

// Config routes
app.config(['$urlRouterProvider','$stateProvider','$locationProvider',function($urlRouterProvider, $stateProvider, $locationProvider) {
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

	// Get rid of /#/ on routes
	// $locationProvider.html5Mode(true);

}]);


// Global $scope
app.run(['$rootScope','localStorageService','$location', function($rootScope, localStorageService, $location){

	// Global functions

	// Check if user is logged
	$rootScope.isLogged = function(){
		return (localStorageService.get('token'))? true : false;
	};

	// Show Users username
    $rootScope.username = function(){
		return localStorageService.get('username');
    };

	// Route filters
	$rootScope.$on("$stateChangeStart",function (event, toState, toParams, fromState, fromParams) {

		// Restrict Login when user is already logged
		if($rootScope.isLogged() && toState.name === 'login'){
			event.preventDefault();
			$location.path('/');
		}

		// Restrict all private URLs for not authorized users
		if(!$rootScope.isLogged() && ['home','login', 'signup'].indexOf(toState.name) === -1 ){
			event.preventDefault();
			$location.path('/');
		}

	});
	
}]);


// Config localstorage
app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setStorageType('sessionStorage');
});

