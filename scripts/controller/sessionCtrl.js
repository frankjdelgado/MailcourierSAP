angular
	.module('mcapp')
	.controller("sessionCtrl",['$scope','$http','$location','localStorageService', function($scope,$http,$location,localStorageService){

		var BASE_URL = "http://0.0.0.0:3000/api/v1";
		
		// User auth. Get token, username, role and redirect to /packages
		$scope.login = function(){
			$http({
				method: 'GET',
				url: url+'/session',
				headers:{
					'username': $scope.user.username,
					'password': $scope.user.password
				}
			})
			.success(function(data,status,headers,config){
				if(localStorageService.isSupported){

					localStorageService.set('token', data.token);
					localStorageService.set('username', data.username);
					localStorageService.set('role', data.role);

					$location.path("/");

				}else{
					alert("Your browser does not support localStorage");
				}
			})
			.error(function(data,status,headers,config){
				// If user doesnt have a token, create one and signin
				$scope.loginPOST();
			});
		};

		// Create token for user and sigin
		$scope.loginPOST = function(){
			$http({
				method: 'POST',
				url: url+'/session',
				headers:{
					'username': $scope.user.username,
					'password': $scope.user.password
				}
			})
			.success(function(data,status,headers,config){
				if(localStorageService.isSupported){

					localStorageService.set('token', data.token);
					localStorageService.set('username', data.username);
					localStorageService.set('role', data.role);
					
					$location.path("/");

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
			localStorageService.remove("username");
			localStorageService.remove("role");
			$location.path("/");
		};

		// User creation
		$scope.signup = function(){
			console.log('works!');
		};

	}]);