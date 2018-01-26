(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['searchService', '$location', '$scope', '$routeParams', '$rootScope', '$http'];

    function HomeController(searchService, $location, $scope, $routeParams, $rootScope, $http) {
        $scope.url = "./json/inventory2.json";
		$scope.keyword = "";
        $scope.details = {};
        $scope.recentlyTastedWines = [];
        $scope.trendingWines = [];
        $scope.hotDeals = [];


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
                $scope.recentlyTastedWines = data.products;
                $scope.trendingWines = data.products;
                $scope.hotDeals = data.products;
                //console.log(data);
            });



        }

        $scope.viewRecord = function viewRecord(licenseNo) {
            let params = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no, width=800,height=600,left=100,top=100";

            open('/demo/#/viewDetails/' + licenseNo, licenseNo, params);

            //$location.path('/viewRecord/' + $scope.licenseNo);

        }
        $scope.clickSearch = function clickSearch() {
            $location.path('/search/keyword='+$scope.keyword);
        }
       
    }


})();