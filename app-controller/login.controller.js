(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);
	

    LoginController.$inject = ['searchService', '$location', '$rootScope', '$http', '$scope', '$translate', '$translatePartialLoader', '$routeParams', '$timeout', '$q' , 'AuthenticationService'];

    function LoginController(searchService, $location, $rootScope, $http, $scope, $translate, $translatePartialLoader, $routeParams, $timeout, $q , AuthenticationService) {
		if ($rootScope.globals.currentUser){
			$location.path("myProfile");
			return;	
		}
		
	  	$scope.data  = {};
		$scope.data.email = "";
		$scope.data.password = "";
		
		$scope.login = function login(){
			var response = grecaptcha.getResponse();
			if(response.length == 0){
				//reCaptcha not verified
				alert("The reCaptcha is not verified");
				return false;
			}
			
			AuthenticationService.Login($scope.data.email,$scope.data.password, function (response) {
				//console.log(response);
                if (response.success) {
					//$rootScope.globals.currentUser.user = response.user;
                    AuthenticationService.SetCredentials( response.user,$scope.data.email, $scope.data.password);
                    $location.path('index');
                } else {
                    alert(response.message);
                }
            });			
		}
		
		
	}


})();