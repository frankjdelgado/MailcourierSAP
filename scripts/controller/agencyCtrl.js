angular
	.module('mcapp')
	.controller("agencyCtrl",['$scope','$http', function($scope,$http){

		var BASE_URL = "http://0.0.0.0:3000/api/v1";
		// Set select agency options
		$http({
			method: 'GET',
			url: BASE_URL+'/agency',
		})
		.success(function(data){
			$scope.agencies =  data;
		})
		.error(function(data){
			return [];
		});
	}]);