(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);
	

    LoginController.$inject = ['searchService', '$location', '$rootScope', '$http', '$scope', '$translate', '$translatePartialLoader', '$routeParams', '$timeout', '$q' , 'AuthenticationService' , '$window'];

    function LoginController(searchService, $location, $rootScope, $http, $scope, $translate, $translatePartialLoader, $routeParams, $timeout, $q , AuthenticationService , $window) {
		if ($rootScope.globals.currentUser){
			$location.path("myProfile");
			return;	
		}
		
		$scope.sitekey = "6Ld0CUIUAAAAAJ5ieh2pqXy_VfyL5ni_sZN5EsCv";
	  	$scope.data  = {};
		$scope.data.email = "";
		$scope.data.password = "";
		var capid="";
		$timeout(function(){
			//grecaptcha.reset();
			capid= grecaptcha.render('google_recap', {			  'sitekey' : $scope.sitekey			});
			
		},1000);
		
		$scope.login = function login(){
			
			var response = grecaptcha.getResponse(capid);
			
			if(response.length == 0){
				//reCaptcha not verified
				$scope.errorMsg = "The reCaptcha is not verified";
				//alert("The reCaptcha is not verified");
				//return false;
			}
		  //  console.log($scope.data);
			
			AuthenticationService.Login($scope.data.email,$scope.data.password, function (response) {
				//console.log(response);
				//responseCode
				if (response==null || response.responseCode == null){
					$scope.errorMsg = "Incorrect username/password. <br>Try again or use the Forgot Password link to reset password";
					//alert("Server connection error");
					return;
				}
                if (response.responseCode =="SUCCESS") {
					//$rootScope.globals.currentUser.user = response.user;
				
						$scope.profileUrl = "http://ec2-13-229-238-73.ap-southeast-1.compute.amazonaws.com:8080/api/profile/user";
						
						 $scope.promise =  $http({
										url: $scope.profileUrl,
										method: 'GET',
										withCredentials: true
									}).success(function(data){
										AuthenticationService.SetCredentials( data);
									    $location.path('index');
									//   window.history.back();
									}).error(function(data){
										 //re-login
										 	$scope.errorMsg = "Login Failed";

											$rootScope.logout();
											$location.path("login");
											return;
						
					});
                    
                } else {
					$scope.textcolor = "red";
					$scope.errorMsg = "Incorrect username/password. <br>Try again or use the Forgot Password link to reset password";
                   // alert(response.message);
                }
            });			
		}
		
		
	}


})();