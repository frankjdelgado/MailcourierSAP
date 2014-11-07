app.controller("sessionController",function($scope,$http){
	var url1 = "http://0.0.0.0:3000/api/v1/session";
	$scope.logeado=false;
	$scope.token="";
	
	//logeo con un user0 para testear que conecte el API con el controller,
	//pero al parecer no logra conectar
	$scope.logear=function(){
		$http({method:'POST',url:"http://0.0.0.0:3000/api/v1/session",
		headers:{'username':"user0",'password':"12345678"}})
		.success(function(data,status,headers,config){
			$scope.logeado=true;
			$scope.token=data.token;
		})
		.error(function(data,status,headers,config){
			$scope.logeado=true;
			$scope.token=data.error_type;
		});
	}

});