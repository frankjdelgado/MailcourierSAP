app.controller("sessionController",function($scope,$http){
	var url1 = "http://0.0.0.0:3000/api/v1/session";
	$scope.logged=false;
	$scope.token="";
	
	$scope.login=function(){
		$http({method:'GET',url:url1,
		headers:{'username':$scope.username,'password':$scope.password}})
		.success(function(data,status,headers,config){
			$scope.logged=true;
			$scope.token=data.token;
		})
		.error(function(data,status,headers,config){
			$scope.logged=false;
			$scope.token=data.error_type;
		});
	}

});