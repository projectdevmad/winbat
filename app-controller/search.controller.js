(function() {
    'use strict';

    angular
        .module('app')
        .controller('SearchController', SearchController);
	

    SearchController.$inject = ['searchService', '$location', '$rootScope', '$http', '$scope', '$translate', '$translatePartialLoader', '$routeParams', '$timeout', '$q'];

    function SearchController(searchService, $location, $rootScope, $http, $scope, $translate, $translatePartialLoader, $routeParams, $timeout, $q) {
        var vm = this;
		$scope.page = 0;
		$scope.params = "";
		$scope.searchData=[];
        $scope.keyword = "";
        $scope.year = "";
        $scope.region = "";
        $scope.price = "";
        $scope.style = "";
        $scope.grapes = "";
		$scope.sortBy = "";
        $scope.busy = false;
        $scope.searchResult = [];
		//$scope.url = "https://private-anon-87f38d1934-winebatapi.apiary-proxy.com/api/search/product?q=Chateau%20Mouton&vintage=2010&price_to=5000&price_from=100";
        $scope.url = "./json/search.json";
      //  $scope.url = "http://ec2-54-144-62-155.compute-1.amazonaws.com:8080/api/search/product?q=Chateau%20Mouton&vintage=2010&price_to=5000&price_from=100";
		if ($routeParams.params){
			$scope.params = $routeParams.params;
			$scope.searchData = deparam($routeParams.params);
		}else{
			$scope.params = "";
		}
        init();
		
        function init() {
			
			if ($scope.param){
				console.log($scope.searchData);
				$scope.keyword = $scope.searchData.keyword;
				$scope.year = $scope.searchData.year;
				$scope.region = $scope.searchData.region;
				$scope.price = $scope.searchData.price;
				$scope.style = $scope.searchData.style;
				$scope.grapes = $scope.searchData.grapes;
			}
          //  searchData(0, 30, "", "");
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

       
        $scope.loadMore = function() {
			
			if ($scope.loadEnd) return;
            if ($scope.busy) return;
			console.log("loadmore");
            $scope.busy = true;
			$scope.page++;
            //$scope.promise = searchService.jsonSearch($scope.url + "&pag=1").then(function(data) {
			searchData();

        };
		$scope.changeSortBy = function(){
			console.log("change sort by ");
			$scope.page=1;
			searchData();
		}
		function searchData(){
			$scope.promise = searchService.search($scope.url + "?page="+$scope.page+"&sortBy="+$scope.sortBy+"&"+$scope.params).then(function(data) {
                if (data.products.length == 0){
                    $scope.loadEnd = true;
                    return;
                }
                $scope.searchResult = $scope.searchResult.concat(data.products);
				$scope.totalItems =  data.totalItems;
               // $scope.searchResult.push(data);
                
                $scope.busy = false;
              
                if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                  //  $(window).scrollTop($(window).scrollTop()-500);
                }

            });
		}	

    }

})();