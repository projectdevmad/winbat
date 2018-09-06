(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['searchService', '$location', '$scope', '$routeParams', '$rootScope', '$http'];

    function HomeController(searchService, $location, $scope, $routeParams, $rootScope, $http) {
       // $scope.url = "./json/inventory2.json";
	    //$scope.url  = "http://ec2-13-229-238-73.ap-southeast-1.compute.amazonaws.com:8080/api/product/search?q=Chateau%20Mouton";
		$scope.url = "http://ec2-13-229-238-73.ap-southeast-1.compute.amazonaws.com:8080/api/product/recommendations";
		$scope.keyword = "";
        $scope.details = {};
        $scope.recentlyTastedWines = [];
        $scope.trendingWines = [];
        $scope.hotDeals = [];
		$scope.keywords = [];


        init();

        function init() {
           // var $params = { "q": "Chateau%20Lafite%20Rothschild" };
           // var url = "./json/invemtory2.json";

           // url = "http://ec2-54-144-62-155.compute-1.amazonaws.com:8080/api/search/inventory?q=Chateau%20Lafite%20Rothschild";
            /*
                        $scope.promise = searchService.search(url, $params).then(function(data) {
                            $scope.recentlyTastedWines = data;
                            $scope.trendingWines = data;
                            $scope.hotDeals = data;
                            console.log(data);
                        });*/



            //$scope.promise = searchService.ajaxJsonp($scope.url).then(function(data) {
			$scope.promise = searchService.search($scope.url).then(function(data) {
				for (var i = 0 ; i < data.length ; i++){
					if (data[i]['type']=="latest"){
						 $scope.recentlyTastedWines = data[i].products;
					}
					if (data[i]['type']=="vote"){
						 $scope.trendingWines = data[i].products;
					}
					if (data[i]['type']=="hot"){
						 $scope.hotDeals = data[i].products;
					}
					
				}
              
                //console.log(data);
            });



        }
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
        $scope.viewRecord = function viewRecord(licenseNo) {
            var params = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no, width=800,height=600,left=100,top=100";

            open('/demo/#/viewDetails/' + licenseNo, licenseNo, params);

            //$location.path('/viewRecord/' + $scope.licenseNo);

        }
        $scope.clickSearch = function clickSearch() {
			if($scope.keyword != null && $scope.keyword!=""){
            	$location.path('/search/keyword='+$scope.keyword);
			}
        }
       
    }


})();