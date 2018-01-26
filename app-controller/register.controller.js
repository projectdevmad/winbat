(function() {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);
	

    RegisterController.$inject = ['searchService', '$location', '$rootScope', '$http', '$scope', '$translate', '$translatePartialLoader', '$routeParams', '$timeout', '$q'];

    function RegisterController(searchService, $location, $rootScope, $http, $scope, $translate, $translatePartialLoader, $routeParams, $timeout, $q) {
		$scope.url =  "./json/register.json";
		$scope.form = {};
		$scope.form.fname = "";
		$scope.form.lname = "";  
		$scope.form.email = "";  
		$scope.form.password = "";  
		$scope.form.passwordConfirm = "";
		$scope.form.bDay = "";   
		$scope.form.bYear = "";
		$scope.form.bMonth = ""; 
		
		$scope.register = function (){
			var method = 'POST';
			console.log( JSON.stringify($scope.form));
            return $http({
                method: method,
                url: $scope.url,
			//	headers: {'Content-Type': 'application/json'},
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: ObjecttoParams($scope.form)

            }).
            then(function(response) {
                if (response.status == 200) {
					var data = response.data;
					if (data.status){
						 alert("You are successfully registered. Welcome to RootStock.");	
					}else{
						 alert("service connection failed");	
					}
                    return response.data;
                } else {
                    alert("service connection failed");
                    return null;
                }

            }, function(response) {

            });
			console.log($scope.form);
			
			
		}
	  
	}


})();