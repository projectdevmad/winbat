(function() {
    'use strict';

    angular
        .module('app')
        .controller('SearchController', SearchController);
	

    SearchController.$inject = ['searchService', '$location', '$rootScope', '$http', '$scope', '$translate', '$translatePartialLoader', '$routeParams', '$timeout', '$q'];

    function SearchController(searchService, $location, $rootScope, $http, $scope, $translate, $translatePartialLoader, $routeParams, $timeout, $q) {
        var vm = this;
        $scope.keyword = "";
        $scope.year = "";
        $scope.region = "";
        $scope.price = "";
        $scope.style = "";
        $scope.grapes = "";
        $scope.busy = false;
        $scope.recentlyTastedWines = [];
		//$scope.url = "https://private-anon-87f38d1934-winebatapi.apiary-proxy.com/api/search/product?q=Chateau%20Mouton&vintage=2010&price_to=5000&price_from=100";
        //$scope.url = "./json/jsonp.php?callback=JSON_CALLBACK";
        $scope.url = "http://ec2-54-144-62-155.compute-1.amazonaws.com:8080/api/search/product?q=Chateau%20Mouton&vintage=2010&price_to=5000&price_from=100";
		
        init();
		
        function init() {
            searchData(0, 30, "", "");
        }

        $scope.clickLink = function clickLink() {

            alert("click");
        }
        $scope.clickSearch = function clickSearch() {
            searchData(0, 30, "", "");
        }
        $scope.changeSearchType = function changeSearchType(val) {
            $scope.searchType = val;
        }
        $scope.changeSearchBy = function changeSearchBy($event) {
            console.log($event.target.value);
            $scope.searchBy = $event.target.value;
        }
       
        $scope.viewRecord = function viewRecord() {


        }
        $scope.selectAppointing = function selectAppointing(val) {
            //console.log(val);
            $scope.searchTxt = val;
            $('#myModal').modal('toggle');
        }

        function searchData(startIndex, pageSize, sortField, sortOrder) {
            //  var startIndex = (filter.pageIndex - 1) * filter.pageSize;\
            console.log("searchClick");
            var $params = { "q": "Chateau%20Lafite%20Rothschild" };
            var params = { searchType: $scope.searchType, searchType1: $scope.searchType1, searchType2: $scope.searchType2, searchBy: $scope.searchBy, searchTxt: $scope.searchTxt, licenseStatus: $scope.licenseStatus, startIndex: startIndex, pageSize: pageSize, sortField: sortField, sortOrder: sortOrder };
            
//			$scope.promise = searchService.jsonSearch($scope.url).then(function(data) {
			$scope.promise = searchService.search($scope.url).then(function(data) {
                $scope.recentlyTastedWines = data.products;
                console.log(data);
            });


        }
        $scope.loadMore = function() {
			console.log("loadmore");
            if ($scope.busy) return;
            $scope.busy = true;
            //$scope.promise = searchService.jsonSearch($scope.url + "&pag=1").then(function(data) {
			searchData();

        };
		function searchData(){
			$scope.promise = searchService.search($scope.url + "&pag=1").then(function(data) {
                 console.log(data.products);
                if (data.products.length == 0){
                    $scope.loadEnd = true;
                    return;
                }
                $scope.recentlyTastedWines = $scope.recentlyTastedWines.concat(data.products);
               // $scope.recentlyTastedWines.push(data);
                
                $scope.busy = false;
                console.log($scope.recentlyTastedWines);
              
                if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                  //  $(window).scrollTop($(window).scrollTop()-500);
                }

            });
		}	

    }

})();