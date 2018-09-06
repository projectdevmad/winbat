(function() {
    'use strict';

    angular
        .module('app')
        .controller('MyProfileController', MyProfileController);
	

    MyProfileController.$inject = ['searchService', '$location', '$rootScope', '$http', '$scope', '$translate', '$translatePartialLoader', '$routeParams', '$timeout', '$q' , 'UserService'];

    function MyProfileController(searchService, $location, $rootScope, $http, $scope, $translate, $translatePartialLoader, $routeParams, $timeout, $q , UserService) {
		$scope.page = 0;
		$scope.saveProfile_url = "./json/saveProfile.json";
		if (!$rootScope.globals.currentUser){
			$location.path("login");
			return;	
		}
		$scope.form  = {};
		$scope.user = $rootScope.globals.currentUser.user;
		
		
		$scope.saveProfile = function(){
		$scope.form.userid = $scope.user.id;	
			$http({
					url: $scope.saveProfile_url,
					method: 'POST',
					data: $.param($scope.form),
					 headers : { 'Content-Type': 'application/x-www-form-urlencoded'},
					transformRequest: angular.identity
				}).success(function(data){
					//console.log(data);

					if(data.status){
						 $scope.message="";
					}else{
						$scope.message=data.message;
					}
				});
			alert("save");	
		}
		
		
	}


})();