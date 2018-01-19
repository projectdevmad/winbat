﻿(function() {
    'use strict';

    angular
        .module('app')
        .controller('addMyTastingNoteController', addMyTastingNoteController);
	

    addMyTastingNoteController.$inject = ['searchService', '$location', '$rootScope', '$http', '$scope', '$translate', '$translatePartialLoader', '$routeParams', '$timeout', '$q'];

    function addMyTastingNoteController(searchService, $location, $rootScope, $http, $scope, $translate, $translatePartialLoader, $routeParams, $timeout, $q) {
		$scope.id = $routeParams.id;
	  	$scope.url = "./json/product.json";
		$scope.uploadUrl = "./json/addTaste.json";
		$scope.product = {};
		
		$scope.formData= {};
		
		if (!$scope.id){
			alert("Sorry , product not found");
		}
		$scope.promise = searchService.search($scope.url+"?id="+$scope.id).then(function(data) {
				if (!data){
					alert("Sorry , product not found");
				}
                $scope.product = data;
               
                console.log(data);
         });
		 $scope.submit = function(){
			 $scope.formData.id=$scope.id;
			  $http({
						url: $scope.uploadUrl,
						method: 'POST',
						data: $.param($scope.formData),
						//assign content-type as undefined, the browser
						//will assign the correct boundary for us
						 headers : { 'Content-Type': 'application/x-www-form-urlencoded'},
						//prevents serializing payload.  don't do it.
						transformRequest: angular.identity
					}).success(function(data){
						console.log(data);
						alert("Your tasting note is successfully added. Thank you for your input.");//pls keep this alert after the submission

						if(!data.success){
						// if not successful, bind errors to error variables
							$scope.errorName= data.errors.name;
							$scope.errorSuperhero=data.errors.email;
						}else{
						// if successful, bind success message to message
							$scope.message=data.message;
						}
					});
		 }
	}
	


})();