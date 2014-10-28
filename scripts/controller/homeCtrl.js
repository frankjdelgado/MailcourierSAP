angular
	.module('mcapp')
	.controller('homeCtrl', ['$scope','$http', function($scope,$http){
		$scope.title = "Welcome!";
		
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
	