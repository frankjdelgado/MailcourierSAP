angular
	.module('mcapp')
	.controller("sessionCtrl",function($scope,$http,localStorageService){

		var url = "http://0.0.0.0:3000/api/v1/session";
		var guardado;

		$scope.logged = false;
		$scope.token = "";
		
		$scope.login = function(){
			$http({
				method:'GET',
				url:url,
				headers:{
					'username': $scope.username,
					'password': $scope.password
				}
			})
			.success(function(data,status,headers,config){
				if(localStorageService.isSupported){
					guardado = localStorageService.set('token', data.token);
				}else{
					alert("Your browser does not support localStorage")
				}
			})
			.error(function(data,status,headers,config){
				// error handling
			});
		};
	});