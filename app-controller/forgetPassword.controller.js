(function() {
	'use strict';

    angular
        .module('app')
        .controller('ForgetPasswordController', ForgetPasswordController);
	

    ForgetPasswordController.$inject = ['searchService', '$location', '$rootScope', '$http', '$scope', '$translate', '$translatePartialLoader', '$routeParams', '$timeout', '$q'];

    function ForgetPasswordController(searchService, $location, $rootScope, $http, $scope, $translate, $translatePartialLoader, $routeParams, $timeout, $q) {
				
    	$scope.submitted = false;
	  	$scope.formData  = {};
		//$scope.forgotPsw_url = "./json/forgotPassword.json"
		$scope.forgotPsw_url = "http://ec2-13-229-238-73.ap-southeast-1.compute.amazonaws.com:8080/api/user/reset_password";
		$scope.message  = "";
		
		$scope.forgotPassword = function(){
			/*var response = grecaptcha.getResponse();
			if(response.length == 0){
				//reCaptcha not verified
				 
				alert("The reCaptcha is not verified");
				return false;
			}
			*/
		    $http({
					url: $scope.forgotPsw_url+"?email="+$scope.formData.email,
					method: 'GET',
					//data: $.param($scope.formData),
					 headers : { 'Content-Type': 'application/x-www-form-urlencoded'},
					transformRequest: angular.identity
				}).success(function(data){
					//console.log(data);
					/*
					if(data.status){
						
						 $("form input").val("");
						 $(".sent-message").show();
						 grecaptcha.reset();
						 $scope.message="";
					}else{
						$scope.message=data.message;
					}*/
					$scope.submitted = true;
					$scope.message=data.message;
				});
			
		}
	
	}

})();