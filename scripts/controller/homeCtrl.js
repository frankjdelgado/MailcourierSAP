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
					height: this.package.height,
					width: this.package.width,
					depth: this.package.depth,
					weight: this.package.weight,
					value: this.package.value
				}
			})
			.success(function(data){
				$scope.shipping_cost = data.shipping_cost;
			})
			.error(function(data){
			
			});
		};
	}]);
