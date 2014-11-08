angular
	.module('mcapp')
	.controller("sessionCtrl",['$scope','$http','$location','localStorageService', function($scope,$http,$location,localStorageService){

		var url = "http://0.0.0.0:3000/api/v1/session";
		
		// User auth. Get token, username, role and redirect to /packages
		$scope.login = function(){
			$http({
				method: 'POST',
				url: url,
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


		$scope.username = localStorageService.get('username');

		// User logout. Destroy localStroage and redirect to home
		$scope.logout = function() {
			localStorageService.remove("token");
			localStorageService.remove("username");
			localStorageService.remove("role");
			$location.path("/");
		};

		// Check if user is logged
		$scope.userIsLogged = function(){
			return (localStorageService.get('token'))? true : false;
		};

		// Check if user is admin
		$scope.isAdmin = function(){
			return (localStorageService.get('role') == '2')? true : false;
		};

		// Check if user is operator
		$scope.isOperator = function(){
			return (localStorageService.get('role') == '1')? true : false;
		};

		// Check if user is member
		$scope.isMember = function(){
			return (localStorageService.get('role') === '0')? true : false;
		};
	}]);