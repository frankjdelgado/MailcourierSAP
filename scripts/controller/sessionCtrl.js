angular
	.module('mcapp')
	.controller("sessionCtrl",['$scope','$http','$location','localStorageService', function($scope,$http,$location,localStorageService){

		var url = "http://0.0.0.0:3000/api/v1/session";
		var guardado;

		$scope.logged = false;
		$scope.token = "";
		

		// User auth
		$scope.login = function(){
			$http({
				method: 'GET',
				url: url,
				headers:{
					'username': $scope.username,
					'password': $scope.password
				}
			})
			.success(function(data,status,headers,config){
				if(localStorageService.isSupported){
					guardado = localStorageService.set('token', data.token);
				}else{
					alert("Your browser does not support localStorage");
				}
			})
			.error(function(data,status,headers,config){
				// error handling
			});
		};

		// User logout
		$scope.logout = function() {

			// Destroy token and redirect to home
			// localStorageService.remove("token");
			$location.path("/");
		};

		// Check if user is logged
		$scope.userIsLogged = function(){
			return (localStorageService.get('token'))? true : false;
		};
	}]);