angular
	.module('mcapp')
	.controller('homeCtrl', ['$scope', function($scope){
		$scope.title = "Welcome!";
		
		// Calculator
		$scope.calculate = function(){

			$http.get('',{
				'email': that.user.email,
				'password': that.user.password
			})
			.success(function(data){
				localStorageService.set('login_token',data.login_token);
				localStorageService.set('id',data.id);
			})
		};

	}]);