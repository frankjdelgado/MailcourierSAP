app.controller("packageController",function($scope,$http){
	var url1="http://0.0.0.0:3000/api/v1/package";
	$scope.logged=false;
	$scope.listPackages=function($token){
		$http({method:'GET',url:url1,
		headers:{'token':$token}})
		.success(function(data,status,headers,config){
			$scope.logged=true;
			$scope.packages=data;
		})
		.error(function(data,status,headers,config){

		});
	}
});
