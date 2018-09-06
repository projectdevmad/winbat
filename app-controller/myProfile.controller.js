(function() {
    'use strict';

    angular
        .module('app')
        .controller('MyProfileController', MyProfileController);
	

    MyProfileController.$inject = ['searchService', '$location', '$rootScope', '$http', '$scope', '$translate', '$translatePartialLoader', '$routeParams', '$timeout', '$q' , 'UserService'];

    function MyProfileController(searchService, $location, $rootScope, $http, $scope, $translate, $translatePartialLoader, $routeParams, $timeout, $q , UserService) {
		$scope.page = 0;
		//$scope.saveProfile_url = "./json/saveProfile.json";
		if (!$rootScope.globals.currentUser){
			$location.path("login");
			return;	
		}
		$scope.formData  = {};
		$scope.user = $rootScope.globals.currentUser.user;
		$scope.profileUrl = "http://ec2-13-229-238-73.ap-southeast-1.compute.amazonaws.com:8080/api/profile/user";
		
		 $scope.promise =  $http({
						url: $scope.profileUrl,
						method: 'GET',
						withCredentials: true
					}).success(function(data){
						$scope.user = data;
						$rootScope.globals.currentUser = data;
					}).error(function(data){
						 //re-login
							$rootScope.logout();
							$location.path("login");
							return;
						
					});
		
		$scope.saveProfile = function(){
			$scope.url = "http://ec2-13-229-238-73.ap-southeast-1.compute.amazonaws.com:8080/api/user/change_password";
			$scope.formData['confirm'] = $scope.formData.password; 
			$scope.promise =  $http({
							url: $scope.url,
							method: 'POST',
							data: $scope.formData,
							withCredentials: true
						}).success(function(data){
						 
	
							if(data.error){
							// if not successful, bind errors to error variables
								$scope.errorMsg=data.message;
							}else{
								  $(".profile-detail .updated-msg").removeClass("hide");
								  $(".profile-detail .btn-edit").removeClass("hide");
								  $(".profile-detail .btn-save").addClass("hide");
								  $(".profile-detail .btn-cancel").addClass("hide");
								  $(".profile-detail .item.preview").removeClass("hide");
								  $(".profile-detail .item.edit").addClass("hide");
								  $(".profile-detail .upload-img").addClass("hide");
								  $scope.errorMsg="";
							}
						}).error(function(data){
							$scope.errorMsg=data.message;
							
							if (data.status=="401"){ //re-login
								$rootScope.logout();
								$location.path("./login");
								return;
							}
						});
						
		/*$scope.form.userid = $scope.user.id;	
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
			alert("save");*/	
		}
		
		
	}


})();