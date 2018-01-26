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
				pieChart();
         });
		 
		 function pieChart(){
			$timeout(function(){
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
				//console.log("KO");
			},1000);	
		}
		
	}


})();