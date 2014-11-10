angular
	.module('mcapp')
	.controller("userCtrl",['$scope','$http','localStorageService', function($scope,$http,localStorageService){

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

	}]);