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
			
			capid= grecaptcha.render('google_recap', {			  'sitekey' : $scope.sitekey			});
			
		},1000);
		
		$scope.login = function login(){
			
			var response = grecaptcha.getResponse(capid);
			
			if(response.length == 0){
				//reCaptcha not verified
				alert("The reCaptcha is not verified");
				return false;
			}
			
			AuthenticationService.Login($scope.data.email,$scope.data.password, function (response) {
				//console.log(response);
				//responseCode
                if (response.responseCode =="SUCCESS") {
					//$rootScope.globals.currentUser.user = response.user;
                    AuthenticationService.SetCredentials( response.user,$scope.data.email, $scope.data.password);
                   // $location.path('index');
				   $window.history.back();
                } else {
                    alert(response.message);
                }
            });			
		}
		
		
	}


})();