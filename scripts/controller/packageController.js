app.controller("packageController",function($scope,$http,localStorageService){
	var url1="http://0.0.0.0:3000/api/v1/package";
	$scope.logged=false;
	var token;
	//probando las funciones por ahora con parametros fijos(ver packages.html)
	$scope.listPackages=function(){
		if(localStorageService.isSupported){
			token=localStorageService.get('token');
			$http({method:'GET',url:url1,
			headers:{'token':token}})
			.success(function(data,status,headers,config){
				console.log(data);
//				$scope.logged=true;
//				$scope.packages=data;
			})
			.error(function(data,status,headers,config){

			});
		}else{
			console.log("el sistema no soporta localStorage");		
		}
	}

	
});
