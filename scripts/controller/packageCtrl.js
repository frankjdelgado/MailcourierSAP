angular
	.module('mcapp')
	.controller('packageCtrl', ['$scope','$http', 'localStorageService', function($scope,$http,localStorageService){
		
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

		$scope.createPackage=function(){
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
					'agency_id': $scope.package.agency_id,
					'sender_id': $scope.package.sender_id,
					'receiver_id': $scope.package.receiver_id,
					'description': $scope.package.description
				}
			})
			.success(function(data,status,headers,config){
				//console.log(data);
/*				var popMsg = $modal({
					title:'Package Created',
					content: 'The package has been created successfully. Its reference number is: '+data.ref_number,
					show:true
				});
*/			})
			.error(function(data,status,headers,config){
				console.log(data);
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
//				console.log(data);
/*				var popMsg = $modal({
					title:'Package Status Changed',
					content: 'The package status changed successfully.',
					show:true
				});
*/			})
			.error(function(data,status,headers,config){
				console.log(data);
			});

		};



	}]);