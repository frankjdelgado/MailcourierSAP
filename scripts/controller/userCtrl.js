angular
	.module('mcapp')
	.controller("userCtrl",['$scope','$state','$http','localStorageService', function($scope,$state,$http,localStorageService){

		var BASE_URL = "http://0.0.0.0:3000/api/v1";
		var id=0;
		var username="";

		//get the user id from the username, then make the pw change
		$scope.changePassword=function(){
			token = localStorageService.get('token');
			username = localStorageService.get('username');
			$http({
				method: 'GET',
				url: BASE_URL+'/user',
				headers:{
					'token': token
				}
			})
			.success(function(data,status,headers,config){
				for (var x in data){
					if (data[x].username===username){
						id=data[x].id;
						break;
					}
				}
				if($scope.password1===$scope.password2 && $scope.password1.length>=8){
					token = localStorageService.get('token');
					$http({
						method: 'PUT',
						url: BASE_URL+'/user/'+id,
						headers:{
							'token': token
						},
						params:{
							'password': $scope.password1
						}
					})
					.success(function(data,status,headers,config){
						localStorageService.set('notice','The password has been changed successfully');
					})
					.error(function(data,status,headers,config){
						localStorageService.set('alert','Error changing the password');
					});
				}else{
						localStorageService.set('alert','The passwords fields must be equals');
				}
			})
			.error(function(data,status,headers,config){
				console.log(data);
			});
		};

		$scope.changePassword2 = function(){
			token = localStorageService.get('token');
			$http({
				method: 'PUT',
				url: BASE_URL+'/user/'+localStorageService.get('id'),
				headers:{
					'token': token
				},
				params:{
					'password': $scope.user.password,
					'password_confirmation': $scope.user.password_confirmation,
				}
			})
			.success(function(data,status,headers,config){
				$state.go($state.current, {}, {reload: true});
				console.log(data);
			})
			.error(function(data,status,headers,config){
				console.log(data);
			});
		};

		$scope.newUser = function(){
			token = localStorageService.get('token');
			$http({
				method: 'POST',
				url: BASE_URL+'/user',
				headers:{
					'token': token
				},
				params:{
					'username': $scope.user.username,
					'email': $scope.user.email,
					'agency_id': $scope.user.agency_id,
					'password': $scope.user.password,
					'password_confirmation': $scope.user.password_confirmation,
					'role': '1'
				}
			})
			.success(function(data,status,headers,config){
				// Go to corrent url, reset parameters, reload page
				$state.go($state.current, {}, {reload: true});
			})
			.error(function(data,status,headers,config){
			});
		};


	}]);