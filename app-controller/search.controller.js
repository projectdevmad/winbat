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
		$scope.sortby = "";
        $scope.busy = false;
        $scope.searchResult = [];
		
        $scope.url = "./json/search.json";
        $scope.url = "http://ec2-13-229-238-73.ap-southeast-1.compute.amazonaws.com:8080/api/product/search?";
		if ($routeParams.params){
			$scope.params = $routeParams.params;
			$scope.searchData = deparam($routeParams.params);
		}else{
			$scope.params = "";
		}
        init();
		
        function init() {
			
			if ($scope.param){
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
           // console.log($event.target.value);
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
            $scope.busy = true;
			$scope.page++;
            //$scope.promise = searchService.jsonSearch($scope.url + "&pag=1").then(function(data) {
			searchData();

        };
		$scope.changeSortBy = function(){
			$scope.page=1;
			searchData();
		}
		function searchData(){
			var param_plus = "";
			if ($scope.searchData.keyword == null || $scope.searchData.keyword == ""){
				
				return;
			}
			if ($scope.searchData.price != null && $scope.searchData.price != ""){
				var prices=$scope.searchData.price.split("-");
				param_plus +="&price_to="+prices[1]+"&price_from="+prices[0];
			}
			if ($scope.searchData.year!= null && $scope.searchData.year != ""){
				param_plus +="&vintage="+$scope.searchData.year;
			}
			
			
			var param = "q="+$scope.searchData.keyword+ param_plus
			//$scope.promise = searchService.search($scope.url + "?page="+$scope.page+"&sortby="+$scope.sortby+"&"+$scope.params).then(function(data) {
			$scope.promise = searchService.search($scope.url + param).then(function(data) {
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
		$scope.parseInteger = function parseInteger($val){
			console.log($val);
			if ($val == null) return 0;
			return parseInt($val);
		}
		

    }

})();