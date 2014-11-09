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
		.state('signup', {
			url: '/signup',
			controler: 'sessionCtrl',
			templateUrl: 'templates/session/signup.html'
		})
		.state('packages', {
			url: '/packages',
			controler: 'packageCtrl',
			templateUrl: 'templates/packages/index.html'
		})
		.state('newPackage', {
			url: '/packages/new',
			controler: 'packageCtrl',
			templateUrl: 'templates/packages/new.html'
		});

	// Get rid of /#/ on routes
	// $locationProvider.html5Mode(true);

}]);


// Global $scope
app.run(['$rootScope','localStorageService','$location', function($rootScope, localStorageService, $location){

	/*
	 *********************
	 * Global functions  *
	 *********************
	 */

	// Check if user is logged
	$rootScope.isLogged = function(){
		return (localStorageService.get('token'))? true : false;
	};

	// Show Users username
    $rootScope.username = function(){
		return localStorageService.get('username');
    };

	// Check if user is admin
	$rootScope.isAdmin = function(){
		return (localStorageService.get('role') === '2')? true : false;
	};

	// Check if user is operator
	$rootScope.isOperator = function(){
		return (localStorageService.get('role') === '1')? true : false;
	};

	// Check if user is member
	$rootScope.isMember = function(){
		return (localStorageService.get('role') === 0)? true : false;
	};

	// Determine if thres a flash alert message, assign it to the scope and delete localStorage
	$rootScope.alertExists = function(){
		if(localStorageService.get('alert')){
			$rootScope.alert = localStorageService.get('alert');
			localStorageService.remove("alert");
			return true;
		}else{
			return false;
		}
	};
	// Determine if thres a flash warning message, assign it to the scope and delete localStorage
	$rootScope.warningExists = function(){
		if(localStorageService.get('warning')){
			$rootScope.warning = localStorageService.get('warning');
			localStorageService.remove("warning");
			return true;
		}else{
			return false;
		}
	};
	// Determine if thres a flash notice message, assign it to the scope and delete localStorage
	$rootScope.noticeExists = function(){
		if(localStorageService.get('notice')){
			$rootScope.notice = localStorageService.get('notice');
			localStorageService.remove("notice");
			return true;
		}else{
			return false;
		}
	};


	/*
	 *********************
	 * Route filters     *
	 *********************
	 */
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

		// Restrict newPackage if user is commom member
		if($rootScope.isMember() && toState.name === 'newPackage'){
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

