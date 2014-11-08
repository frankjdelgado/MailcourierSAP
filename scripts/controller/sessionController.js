app.controller("sessionController",function($scope,$http,localStorageService){
	var url = "http://0.0.0.0:3000/api/v1/session";
	$scope.logged=false;
	var guardado;
	$scope.token="";
	
	$scope.login=function(){
		$http({method:'GET',url:url,
		headers:{'username':$scope.username,'password':$scope.password}})
		.success(function(data,status,headers,config){
			console.log(data);
			if(localStorageService.isSupported){
				guardado=localStorageService.set('token', data.token);
			}else{
				console.log("el sistema no soporta localStorage");
			}
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