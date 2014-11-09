angular
	.module('mcapp')
	.controller('packageCtrl', ['$scope','$http','localStorageService', function($scope,$http,localStorageService){
		
		var url = 'http://0.0.0.0:3000/api/v1/package';
		var token;
		$scope.rnumber="";

		$scope.listPackages = function(){
			if($scope.rnumber.length==0){
				$scope.searchPackages();
				console.log("opcion1");
			}else{
				$scope.searchPackage($scope.rnumber);
				console.log("opcion2");
			}
		};

		$scope.searchPackages = function(){
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

		$scope.searchPackage=function($ref_number){
			if(localStorageService.isSupported){
				token = localStorageService.get('token');
				$http({
					method: 'GET',
					url: url,
					headers:{
						'token': token
					},
					params:{
						'ref_number': $ref_number
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

		$scope.createPackage=function(){

		};

	}]);