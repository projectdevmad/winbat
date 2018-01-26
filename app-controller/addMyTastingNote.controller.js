(function() {
    'use strict';

    angular
        .module('app')
        .controller('addMyTastingNoteController', addMyTastingNoteController);
	

    addMyTastingNoteController.$inject = ['searchService', '$location', '$rootScope', '$http', '$scope', '$translate', '$translatePartialLoader', '$routeParams', '$timeout', '$q'];

    function addMyTastingNoteController(searchService, $location, $rootScope, $http, $scope, $translate, $translatePartialLoader, $routeParams, $timeout, $q) {
		if(!$rootScope.globals.currentUser){
			$location.path("login");
			return;	
		}
		$scope.productid = $routeParams.id;
	  	$scope.productUrl = "./json/product.json";
		$scope.uploadUrl = "./json/addTaste.json";
		$scope.product = {};
		$scope.smells = [];
		$scope.formData= {};
		//console.log($rootScope.globals.currentUser);
		if (!$scope.productid){
			alert("Sorry , product not found");
			$location.path("index");
			return;
		}
		
		$scope.promise = searchService.search($scope.productUrl+"?id="+$scope.productid).then(function(data) {
				if (!data){
					alert("Sorry , product not found");
					$location.path("index");
					return;
				}
                $scope.product = data;
               
                console.log(data);
         });
		 $scope.submit = function(){
			 
			 //Get the smell values to be a array
			 $(".smellsInput").each(function(){
				$scope.smells.push($(this).val());
			 })
			 $scope.formData.smells = $scope.smells;
			 $scope.formData.userid = $rootScope.globals.currentUser.user.id;
			 
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

						if(!data.success){
						// if not successful, bind errors to error variables
						alert("Your tasting note is successfully added. Thank you for your input.");//pls keep this alert after the submission

						}else{
						// if successful, bind success message to message
							$scope.message=data.message;
						}
					});
		 }
	}
	


})();