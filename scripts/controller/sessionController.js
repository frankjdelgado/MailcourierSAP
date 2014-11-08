app.controller("sessionController",function($scope,$http){
	var url = "http://0.0.0.0:3000/api/v1/session";
	$scope.logged=false;
	$scope.token="";
	
	//logeo con un user0 para testear que conecte el API con el controller,
	//pero al parecer no logra conectar
	$scope.login=function(){
		$http({method:'POST',url:url,
		headers:{'username':$scope.username,'password':$scope.password}})
		.success(function(data,status,headers,config){
			console.log(data);
			// $scope.logged=true;
			// $scope.token=data.token;
		})
		.error(function(data,status,headers,config){
			console.log(data);
			// $scope.logged=false;
			// $scope.token=data.error_type;
		});
	};

});