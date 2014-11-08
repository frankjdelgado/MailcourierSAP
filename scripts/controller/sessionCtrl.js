angular
	.module('mcapp')
	.controller("sessionCtrl",['$scope','$http','$location','localStorageService', function($scope,$http,$location,localStorageService){

		var url = "http://0.0.0.0:3000/api/v1/session";
		
		// User auth. Get token, id, role and redirect to /packages
		$scope.login = function(){
			$http({
				method: 'POST',
				url: url,
				headers:{
					'username': $scope.username,
					'password': $scope.password
				}
			})
			.success(function(data,status,headers,config){
				if(localStorageService.isSupported){

					localStorageService.set('token', data.token);
					localStorageService.set('id', data.id);
					localStorageService.set('role', data.role);
					$location.path("/packages");
					
				}else{
					alert("Your browser does not support localStorage");
				}
			})
			.error(function(data,status,headers,config){
				// error handling
			});
		};

		// User logout. Destroy localStroage and redirect to home
		$scope.logout = function() {
			localStorageService.remove("token");
			localStorageService.remove("id");
			localStorageService.remove("role");
			$location.path("/");
		};

		// Check if user is logged
		$scope.userIsLogged = function(){
			return (localStorageService.get('token'))? true : false;
		};
	}]);