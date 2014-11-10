angular
	.module('mcapp')
	.controller("rateCtrl",['$scope','$http','localStorageService', function($scope,$http,localStorageService){

		var BASE_URL = "http://0.0.0.0:3000/api/v1";
		var token;

		$scope.createRate=function(){
			token = localStorageService.get('token');
			$http({
				method: 'POST',
				url: BASE_URL+'/rate',
				headers:{
					'token': token
				},
				params:{
					'cost':$scope.rate.cost,
					'package': $scope.rate.package
				}
			})
			.success(function(data,status,headers,config){
				localStorageService.set('notice','The rate has been created successfully');
			})
			.error(function(data,status,headers,config){
				console.log(data);
			});
		};

		$scope.changeStatusRate=function(){
			token = localStorageService.get('token');
			$http({
				method: 'PUT',
				url: BASE_URL+'/rate/'+$scope.rate.id,
				headers:{
					'token': token
				},
				params:{
					'status': $scope.rate.status
				}
			})
			.success(function(data,status,headers,config){
				localStorageService.set('notice','The status of the rate was updated successfully');
			})
			.error(function(data,status,headers,config){
				console.log(data);
			});
		};

}]);