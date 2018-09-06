(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['searchService', '$location', '$scope', '$routeParams', '$rootScope', '$http'];

    function HomeController(searchService, $location, $scope, $routeParams, $rootScope, $http) {
<<<<<<< HEAD
        $scope.url = "./json/inventory.jsonp";
=======
       // $scope.url = "./json/inventory2.json";
	    $scope.url  = "http://ec2-13-229-238-73.ap-southeast-1.compute.amazonaws.com:8080/api/product/search?q=Chateau%20Mouton";
		$scope.keyword = "";
>>>>>>> 3684e81b585623973728aba3410f66033c8f9359
        $scope.details = {};
        $scope.recentlyTastedWines = [];
        $scope.trendingWines = [];
        $scope.hotDeals = [];
<<<<<<< HEAD
        $scope.licenseNo = $routeParams.license;
=======
		$scope.keywords = [];
>>>>>>> 3684e81b585623973728aba3410f66033c8f9359


        init();

        function init() {
<<<<<<< HEAD
            var $params = { "q": "Chateau%20Lafite%20Rothschild" };
            var url = "./json/inventory.jsonp";
=======
           // var $params = { "q": "Chateau%20Lafite%20Rothschild" };
           // var url = "./json/invemtory2.json";
>>>>>>> 3684e81b585623973728aba3410f66033c8f9359

           // url = "http://ec2-54-144-62-155.compute-1.amazonaws.com:8080/api/search/inventory?q=Chateau%20Lafite%20Rothschild";
            /*
                        $scope.promise = searchService.search(url, $params).then(function(data) {
                            $scope.recentlyTastedWines = data;
                            $scope.trendingWines = data;
                            $scope.hotDeals = data;
                            console.log(data);
                        });*/



<<<<<<< HEAD
            $scope.promise = searchService.ajaxJsonp($scope.url).then(function(data) {
                $scope.recentlyTastedWines = data;
                $scope.trendingWines = data;
                $scope.hotDeals = data;
=======
            //$scope.promise = searchService.ajaxJsonp($scope.url).then(function(data) {
			$scope.promise = searchService.search($scope.url).then(function(data) {
                $scope.recentlyTastedWines = data.products;
                $scope.trendingWines = data.products;
                $scope.hotDeals = data.products;
>>>>>>> 3684e81b585623973728aba3410f66033c8f9359
                //console.log(data);
            });



        }
<<<<<<< HEAD

=======
		$scope.searchKeyword = function searchKeyword(){
			$scope.catalogUrl = "http://ec2-13-229-238-73.ap-southeast-1.compute.amazonaws.com:8080/api/catalog/suggest?q="+$scope.keyword;
			searchService.search($scope.catalogUrl).then(function(data) {
                
				if (data == null) return;
				$scope.keywords = [];
				for (var i =0; i<data.length; i++){
					$scope.keywords.push(data[i].name);
				}
            });
		}
>>>>>>> 3684e81b585623973728aba3410f66033c8f9359
        $scope.viewRecord = function viewRecord(licenseNo) {
            let params = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no, width=800,height=600,left=100,top=100";

            open('/demo/#/viewDetails/' + licenseNo, licenseNo, params);

            //$location.path('/viewRecord/' + $scope.licenseNo);

        }
        $scope.clickSearch = function clickSearch() {
<<<<<<< HEAD
            $location.path('/search/');
=======
            $location.path('/search/keyword='+$scope.keyword);
>>>>>>> 3684e81b585623973728aba3410f66033c8f9359
        }
       
    }


})();