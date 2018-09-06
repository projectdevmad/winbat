(function() {
	'use strict';

    angular
        .module('app')
        .controller('ChangePasswordController', ChangePasswordController);
	

    ChangePasswordController.$inject = ['searchService', '$location', '$rootScope', '$http', '$scope', '$translate', '$translatePartialLoader', '$routeParams', '$timeout', '$q'];

    function ChangePasswordController(searchService, $location, $rootScope, $http, $scope, $translate, $translatePartialLoader, $routeParams, $timeout, $q) {
	//?id=117&token=83942511-38da-473c-a4a7-8cbaad8a3fe9
	//console.log($routeParams);
		//$scope.id = $routeParams.id;
		//$scope.token = $routeParams.token;		
		//$scope.formData = {'id':$scope.id,'token':$scope.token};
		$scope.formData = $routeParams;
		//console.log($scope.formData);
			
		$scope.submit = function(){
			$scope.url = "http://ec2-13-229-238-73.ap-southeast-1.compute.amazonaws.com:8080/api/user/change_password";
			$scope.formData['confirm'] = $scope.formData.password; 
			$scope.promise =  $http({
							url: $scope.url,
							method: 'POST',
							data: $scope.formData,
							withCredentials: true
						}).success(function(data){
	
							if(data.status!='500'){
								 $location.path("./myProfile");		
								 $(".pw-message").hide();
								 $(".sent-message").show();
								$scope.errorMsg="";
							}else{
								 $scope.errorMsg=data.message;
								
							}
						}).error(function(data){
							$scope.errorMsg=data.message;
							if (data.status=="401"){ //re-login
								$rootScope.logout();
								$location.path("./login");
								return;
							}
						});
		}
					
	}

})();