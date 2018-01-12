(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductController', ProductController);
	

    ProductController.$inject = ['searchService', '$location', '$rootScope', '$http', '$scope', '$translate', '$translatePartialLoader', '$routeParams', '$timeout', '$q'];

    function ProductController(searchService, $location, $rootScope, $http, $scope, $translate, $translatePartialLoader, $routeParams, $timeout, $q) {
	  	console.log($routeParams.id);
		//alert("Get Product ID :" + $routeParams.id );
		$scope.url = "./json/product.json";
		$scope.notesUrl = "./json/notesList.json";
        $scope.product = {};
		
		$scope.promise = searchService.search($scope.url).then(function(data) {
                $scope.product = data;
               
                console.log(data);
         });
		 $scope.promise = searchService.search($scope.notesUrl).then(function(data) {
                $scope.notes = data;
               
                console.log(data);
         });
	}


})();