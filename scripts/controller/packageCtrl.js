angular
	.module('mcapp')
	.controller('packageCtrl', ['$scope','$http','localStorageService', function($scope,$http,localStorageService){
		
		var url = 'http://0.0.0.0:3000/api/v1/package';
		var token;

		$scope.logged = false;

		$scope.listPackages = function(){
			if(localStorageService.isSupported){
				token = localStorageService.get('token');
				$http({
					method: 'GET',
					url: url,
					headers:{
						'token': token
					}
				})
				.success(function(data,status,headers,config){
					console.log(data);
				})
				.error(function(data,status,headers,config){

				});
			}else{
				alert("Your browser does not support localStorage");
			}
		};
	}]);