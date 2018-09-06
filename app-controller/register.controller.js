(function() {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);
	

    RegisterController.$inject = ['searchService', '$location', '$rootScope', '$http', '$scope', '$translate', '$translatePartialLoader', '$routeParams', '$timeout', '$q'];

    function RegisterController(searchService, $location, $rootScope, $http, $scope, $translate, $translatePartialLoader, $routeParams, $timeout, $q) {
		//$scope.url =  "./json/register.json";
		$scope.url = "http://ec2-13-229-238-73.ap-southeast-1.compute.amazonaws.com:8080/api/user/signup";
		$scope.form = {};
		$scope.form.first_name = "";
		$scope.form.last_name = "";  
		$scope.form.email = "";  
		$scope.form.password = "";  
		$scope.form.passwordConfirm = "";
		$scope.form.bDay = "";   
		$scope.form.bYear = "";
		$scope.form.bMonth = ""; 
		
		$scope.register = function (){
			var method = 'POST';
			//console.log( JSON.stringify($scope.form));
			$scope.form.dob = $scope.form.bYear + "-" + $scope.form.bMonth  + "-" + ("0" + $scope.form.bDay).slice(-2);
			//return;
            return $http({
                method: method,
                url: $scope.url,
				headers: {'Content-Type': 'application/json'},
			//	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                //data: ObjecttoParams($scope.form)
				data: $scope.form

            }).
            then(function(response) {
				
				//return {"username":"test3","password":null,"email":"admin@23.com"}
                if (response.data.username) {
					var data = response.data;
					if (data.username){
						 alert("You have been successfully registered. Please check with your registered email for confirmation email.");
            // window.location.href="#/index";
						 $location.path("index");;
	
					}else{
						 alert("service connection failed");	
					}
					console.log(data);
                    return response.data;
                } else {
					
                    alert(response.data.message);
                    return null;
                }

            }, function(response) {
				 alert(response.data.message);
            });
			console.log($scope.form);
			
			
		}
	  
	}


})();