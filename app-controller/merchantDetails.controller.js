﻿(function() {
    'use strict';

    angular
        .module('app')
        .controller('MerchantDetailsController', MerchantDetailsController);
	

    MerchantDetailsController.$inject = ['searchService', '$location', '$rootScope', '$http', '$scope', '$translate', '$translatePartialLoader', '$routeParams', '$timeout', '$q'];
	
	function MerchantDetailsController(searchService, $location, $scope, $routeParams, $rootScope, $http,$timeout) {
        $scope.url = "./json/merchant.json";
		$scope.inventory_url = "./json/search.json";
		$scope.products =[];
		$scope.merchant = [];
		$scope.page = 0;
        //init();
		$scope.promise = searchService.search($scope.url + "?id="+$routeParams.id).then(function(data) {
				 $scope.merchant = data;
				 var t=setTimeout("pieChart()",1000);
                if (data==""){
                   alert("no record");
                }
		});

       

        $scope.viewRecord = function viewRecord() {
            var params = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no, width=800,height=600,left=100,top=100";

            open('/demo/#/viewDetails/', "", params);

            //$location.path('/viewRecord/' + $scope.licenseNo);

        }
        $scope.clickSearch = function clickSearch() {
			$scope.page=1;
            $location.path('/merchant/');
        }
		
		$scope.loadMore = function() {
            if ($scope.busy) return;
            $scope.busy = true;
            //$scope.promise = searchService.jsonSearch($scope.url + "&pag=1").then(function(data) {
			$scope.page++;
			searchData();

        };
		$scope.loadMore();
		
		function searchData(){
			$scope.promise = searchService.search($scope.inventory_url + "?merchantid="+$routeParams.id+"page="+$scope.page).then(function(data) {
                if (data.products.length == 0){
                    $scope.loadEnd = true;
                    return;
                }
				$scope.products = $scope.products.concat(data.products);

                $scope.busy = false;
              //	$timeout(aaa, 500);
				//
				// $scope.pieChart();
                if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                  //  $(window).scrollTop($(window).scrollTop()-500);
                }

            });
		}
		 function init() {
			var $params = { "q": "Chateau%20Lafite%20Rothschild" };
		  
			$scope.loadMore();
	
		}
       
    }


})();
function pieChart() {
			
	$(".pie-chart > div[data-p]").each(function(){
		var scale;
		if($(this).data("s") != null){
			scale = $(this).data("s") / 5;
		}else{
			scale = 1;
		}
		
		if($(this).prev().length){
			$(this).css("transform", "rotate(" + ($(this).prev().data("l") / 100 * 360) + "deg) scale(" + scale + ")");
			$(this).data("l", $(this).prev().data("l") + $(this).data("p"));
		}else{
			$(this).data("l", $(this).data("p")).css("transform", "scale(" + scale + ")");
		}
		
		if($(this).data("p") > 50){
			$(this).children("div").css("transform", "rotate(180deg)");
			$(this).after($(this).clone().removeAttr("data-p").data("l", $(this).data("l")));
			$(this).next().css("transform", "rotate(" + ((($(this).data("l") - $(this).data("p")) / 100 * 360) + 160) + "deg)");
			$(this).next().children("div").css("transform", "rotate(" + ((($(this).data("p") - 50) / 100 * 360) + 20) + "deg)");
		}else{
			$(this).children("div").css("transform", "rotate(" + ($(this).data("p") / 100 * 360) + "deg)");
		}
		
	});
	$(".pie-chart").css("opacity", "1");
}