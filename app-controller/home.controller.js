(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['searchService', '$location', '$scope', '$routeParams', '$rootScope', '$http'];

    function HomeController(searchService, $location, $scope, $routeParams, $rootScope, $http) {
        $scope.url = "./json/inventory.jsonp";
        $scope.details = {};
        $scope.recentlyTastedWines = [];
        $scope.trendingWines = [];
        $scope.hotDeals = [];
        $scope.licenseNo = $routeParams.license;


        init();

        function init() {
            var $params = { "q": "Chateau%20Lafite%20Rothschild" };
            var url = "./json/inventory.jsonp";

           // url = "http://ec2-54-144-62-155.compute-1.amazonaws.com:8080/api/search/inventory?q=Chateau%20Lafite%20Rothschild";
            /*
                        $scope.promise = searchService.search(url, $params).then(function(data) {
                            $scope.recentlyTastedWines = data;
                            $scope.trendingWines = data;
                            $scope.hotDeals = data;
                            console.log(data);
                        });*/



            $scope.promise = searchService.ajaxJsonp($scope.url).then(function(data) {
                $scope.recentlyTastedWines = data;
                $scope.trendingWines = data;
                $scope.hotDeals = data;
                //console.log(data);
            });



        }

        $scope.viewRecord = function viewRecord(licenseNo) {
            let params = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no, width=800,height=600,left=100,top=100";

            open('/demo/#/viewDetails/' + licenseNo, licenseNo, params);

            //$location.path('/viewRecord/' + $scope.licenseNo);

        }
        $scope.clickSearch = function clickSearch() {
            $location.path('/search/');
        }
       
    }


})();