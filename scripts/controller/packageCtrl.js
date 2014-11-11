angular
	.module('mcapp')
	.controller('packageCtrl', ['$scope','$state','$http', 'localStorageService', function($scope,$state,$http,localStorageService){
		
		var BASE_URL = "http://0.0.0.0:3000/api/v1";
		var token;
		$scope.rnumber="";
		$scope.package=0;

		$scope.listPackages = function(){
			if($scope.rnumber.length===0){
				$scope.searchPackages();
			}else{
				$scope.searchPackage($scope.rnumber);
			}
		};

		$scope.searchPackages = function(){
			if(localStorageService.isSupported){
				token = localStorageService.get('token');
				$http({
					method: 'GET',
					url: BASE_URL+'/package',
					headers:{
						'token': token
					}
				})
				.success(function(data,status,headers,config){
					//console.log(data);
					$scope.packages=data;
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
					url: BASE_URL+'/package',
					headers:{
						'token': token
					},
					params:{
						'ref_number': $ref_number
					}
				})
				.success(function(data,status,headers,config){
					//console.log(data);
					$scope.packages=data;
				})
				.error(function(data,status,headers,config){

				});
			}else{
				alert("Your browser does not support localStorage");
			}
		};

		$scope.addPackage = function(){
			token = localStorageService.get('token');
			$http({
				method: 'POST',
				url: BASE_URL+'/package',
				headers:{
					'token': token
				},
				params:{
					'weight':$scope.package.weight,
					'height': $scope.package.height,
					'width': $scope.package.width,
					'depth': $scope.package.depth,
					'value': $scope.package.value,
					'agency_id': ($scope.package.agency_id).id,
					'sender': $scope.package.sender,
					'receiver': $scope.package.receiver,
					'description': $scope.package.description
				}
			})
			.success(function(data,status,headers,config){
				// Go to corrent url, reset parameters, reload page
				$state.go($state.current, {}, {reload: true});
				localStorageService.set('notice','New package added successfully');
			})
			.error(function(data,status,headers,config){
				localStorageService.set('alert','There was and error creating the package. Please, try again.');
			});
		};

		$scope.changeStatusPackage=function(){
			token = localStorageService.get('token');
			$http({
				method: 'PUT',
				url: BASE_URL+'/package/'+$scope.package.id,
				headers:{
					'token': token
				},
				params:{
					'id': $scope.package.id,
					'status': $scope.package.status,
				}
			})
			.success(function(data,status,headers,config){
				localStorageService.set('notice','The status of the package was updated successfully');
			})
			.error(function(data,status,headers,config){
				console.log(data);
			});
		};

	}]);