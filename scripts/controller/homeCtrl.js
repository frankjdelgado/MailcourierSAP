angular
	.module('mcapp')
	.controller('homeCtrl', ['$scope','$http', function($scope,$http){
		
		// Rates
		var url = 'http://0.0.0.0:3000/api/v1/rate/active_rates';
		$http.get(url)
		.success(function(data){
			$scope.rate_dimension = data.package;
			$scope.rate_value = data.cost;
		})
		.error(function(data){
		
		});

		// Calculator
		$scope.calculate = function(){

			var url = 'http://0.0.0.0:3000/api/v1/rate/calculate';
			$http.get(url,{
				params:{
					height: $scope.package.height,
					width: $scope.package.width,
					depth: $scope.package.depth,
					weight: $scope.package.weight,
					value: $scope.package.value
				}
			})
			.success(function(data){
				$scope.shipping_cost = data.shipping_cost;
				$scope.package.shipping_cost = data.shipping_cost;
			})
			.error(function(data){
			
			});
		};
	}]);
