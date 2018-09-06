(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductController', ProductController);
	

    ProductController.$inject = ['searchService', '$location', '$rootScope', '$http', '$scope', '$translate', '$translatePartialLoader', '$routeParams', '$timeout', '$q'];

    function ProductController(searchService, $location, $rootScope, $http, $scope, $translate, $translatePartialLoader, $routeParams, $timeout, $q) {
	  	
		//alert("Get Product ID :" + $routeParams.id );
		//$scope.url = "./json/product.json";
		$scope.myNote = [];
		var name = $routeParams.name;
		var vintage = $routeParams.year;
		$scope.url = "http://ec2-13-229-238-73.ap-southeast-1.compute.amazonaws.com:8080/api/product/detail?name="+name+"&vintage="+vintage;
		$scope.notesUrl = "./json/notesList.json";
		
		$scope.notesVoteUrl = "http://ec2-13-229-238-73.ap-southeast-1.compute.amazonaws.com:8080/api/tasting/"+name+"?by=self&vintage="+vintage;
		$scope.notesLatestUrl = "http://ec2-13-229-238-73.ap-southeast-1.compute.amazonaws.com:8080/api/tasting/"+name+"?by=latest&vintage="+vintage;
        $scope.product = {};
		
		$scope.promise = searchService.search($scope.url).then(function(data) {
			if (data !=null)
                $scope.product = data.products[0];
               
                console.log(data);
         });
		 
		  $scope.promise = searchService.search($scope.notesVoteUrl).then(function(data) {
			  console.log(data);
			  if (data != null){
                $scope.myNote[0] =  data[0];
			  }else{
			  	$scope.myNote = null;
			  }
               
                console.log($scope.myNote);
				
         });
		 $scope.promise = searchService.search($scope.notesLatestUrl).then(function(data) {
                $scope.notes = data;
               
               // console.log(data);
				pieChart();
         });
		 $scope.vote = function vote(note,howVote){
			if (note  == null) return ;
			var note_id = note.id;
			 //up|down|un_up|un_down.
			// $scope.howVote = "up";
			if (note.voted_for == null){
				howVote = "up";
				note.vote_up ++ ;
				note.voted_for = "up";	
			}else{
				howVote = "un_up";
				note.vote_up -- ;
				note.voted_for =null;
					
			}
			
							
			var vote_url = "http://ec2-13-229-238-73.ap-southeast-1.compute.amazonaws.com:8080/api/tasting/vote/"+note_id+"?how="+ howVote;
			
			$scope.promiseOff = $http({
						url: vote_url,
						method: 'POST',
						data: {"how":howVote},
						withCredentials: true
					
					}).success(function(data){
						
						note = data;
						if(!data.success){
							
						

						}else{
							
							$scope.message=data.message;
						}
					}).error(function(data){
						if (data.status=="401"){
							$rootScope.logout();
							$location.path("login");
							return;
						}
					});
		 }
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
		$scope.parseInteger = function parseInteger($val){
			if ($val == null) return 0;
			return parseInt($val);
		}
	}


})();