(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);
	

    ProfileController.$inject = ['searchService', '$location', '$rootScope', '$http', '$scope', '$translate', '$translatePartialLoader', '$routeParams', '$timeout', '$q' , 'UserService'];

    function ProfileController(searchService, $location, $rootScope, $http, $scope, $translate, $translatePartialLoader, $routeParams, $timeout, $q , UserService) {
		$scope.page = 0;
		if (!$rootScope.globals.currentUser){
			$location.path("login");	
		}
		
		$scope.notes = []; //Tasting Input Record
		$scope.user = $rootScope.globals.currentUser;
		console.log($rootScope.globals.currentUser);
		//$scope.user = $rootScope.globals.currentUser.user;
		$scope.profileUrl = "http://ec2-13-229-238-73.ap-southeast-1.compute.amazonaws.com:8080/api/profile/user";
		
		 $scope.promise =  $http({
						url: $scope.profileUrl,
						method: 'GET',
						withCredentials: true
					}).success(function(data){
						$scope.user = data;
						$rootScope.globals.currentUser = data;
					}).error(function(data){
						 //re-login
							$rootScope.logout();
							$location.path("login");
							return;
						
					});
		$scope.url = "http://ec2-13-229-238-73.ap-southeast-1.compute.amazonaws.com:8080/api/profile/tasting/"+$scope.user.username;
		$scope.busy = false;
		
		$scope.loadmore = function (){
			$scope.page++;
			if ($scope.busy == true){
				return;	
			}
			if ($scope.page >1){
				return;	
			}
			$scope.busy = true;
			$scope.promise = searchService.search($scope.url).then(function(data) {
                if (data.length == 0){
                    $scope.loadEnd = true;
                    return;
                }
                $scope.notes = $scope.notes.concat(data);
				pieChart();
                $scope.busy = false;
              

            });
			
		}
		$scope.loadmore();
		//$scope.user = UserService.GetById($rootScope.globals.currentUser.user.id).then(function(){})
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