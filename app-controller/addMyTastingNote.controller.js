(function() {
    'use strict';

    angular
        .module('app')
        .controller('addMyTastingNoteController', addMyTastingNoteController);
	

    addMyTastingNoteController.$inject = ['searchService', '$location', '$rootScope', '$http', '$scope', '$translate', '$translatePartialLoader', '$routeParams', '$timeout', '$q'];

    function addMyTastingNoteController(searchService, $location, $rootScope, $http, $scope, $translate, $translatePartialLoader, $routeParams, $timeout, $q) {
<<<<<<< HEAD
	  
	  }
=======
		
		if(!$rootScope.globals.currentUser){
			$location.path("login");
			return;	
		}
		//console.log($rootScope.globals.currentUser);
		//$scope.productid = $routeParams.id;
		$scope.name = $routeParams.name;
		$scope.year = $routeParams.year;
	  	//$scope.productUrl = "./json/product.json";
		$scope.productUrl = "http://ec2-13-229-238-73.ap-southeast-1.compute.amazonaws.com:8080/api/product/detail?name="+$scope.name+"&vintage="+$scope.year;
		$scope.inputsUrl = "http://ec2-13-229-238-73.ap-southeast-1.compute.amazonaws.com:8080/api/tasting/inputs";
		//$scope.uploadUrl = "./json/addTaste.json";
		$scope.uploadUrl = "http://ec2-13-229-238-73.ap-southeast-1.compute.amazonaws.com:8080/api/tasting";
		$scope.product = {};
		$scope.smells = [];
		$scope.formData= {};
		//console.log($rootScope.globals.currentUser);
		if (!$scope.name){
			alert("Sorry , product not found");
			$location.path("index");
			return;
		}
		$scope.promise = searchService.search($scope.inputsUrl).then(function(data) {
				
               // $scope.inputs = data;
				$scope.inputs = new Array();
				var inputs = new Object();;
				var catid = 0;
				$scope.categorys = new Array();
               	for ( var i=0 ; i<data.length; i++){
					if (inputs[data[i].category] ==null){
						inputs[data[i].category] = new Array();
						//$scope.categorys.push(data[i].category);
					}
					inputs[data[i].category+""].push(data[i]);
				}
				
				
				$scope.inputs = inputs;
				$timeout(applyJs,500);
         });
		$scope.promise = searchService.search($scope.productUrl).then(function(data) {
				if (!data){
					alert("Sorry , product not found");
					$location.path("index");
					return;
				}
                $scope.product = data.products[0];
               
                console.log(data);
         });
		 $scope.smellsChange = function (){
			 console.log("changed");
			$scope.smells = [];
			 $(".smellsInput").each(function(){
				 console.log($(this).val());
				$scope.smells.push({'name':$(this).val()});
			 }) 
		 }
		 $scope.submit = function(){
			 
			 //Get the smell values to be a array
			 $scope.smells = [];
			 $(".smellsInput").each(function(){
				$scope.smells.push({'name':$(this).val()});
			 })
			 $scope.formData.smells = $scope.smells;
			 //$scope.formData.userid = $rootScope.globals.currentUser.user.id;
			 
			// $scope.formData.id=$scope.id;
			 $scope.formData.product = $scope.name;
			 $scope.formData.author = $rootScope.globals.currentUser.username;
			 $scope.formData.appearance.color.intensity = 1;
			 $scope.promise =  $http({
						url: $scope.uploadUrl,
						method: 'POST',
						data: $scope.formData,
						withCredentials: true
						//assign content-type as undefined, the browser
						//will assign the correct boundary for us
						// headers : { 'Content-Type': 'application/x-www-form-urlencoded'},
						//prevents serializing payload.  don't do it.
						//transformRequest: angular.identity
					}).success(function(data){
						console.log(data);

						if(!data.success){
						// if not successful, bind errors to error variables
						alert("Your tasting note is successfully added. Thank you for your input.");//pls keep this alert after the submission

						}else{
							
						// if successful, bind success message to message
							$scope.message=data.message;
						}
					}).error(function(data){
						if (data.status=="401"){ //re-login
							$rootScope.logout();
							$location.path("./login");
							return;
						}
					});
		 }
	}
	function applyJs(){
		
		
            $(".smell .smell-more .radio-a").each(function(){
				
              $(".form-suggest").append("<div class='item'>" + $(this).html() + "</div>");
              suggest();
			 
            });
            $("#inputtags").keydown(function(){
              $(".form-suggest").html("");
              $(".smell .smell-more .radio-a").each(function(){
                if($(this).find("g").html().toLowerCase().includes($("#inputtags").val().toLowerCase())){
                  if($(".form-tag .tag ." + $(this).find("i").attr("class")).length){
                    return false;
                  }
                  
                  $(".form-suggest").append("<div class='item'>" + $(this).html() + "</div>");
                }
              });
              suggest();
              if($(".form-suggest .item").length < 1){
                $(".form-suggest").html("<m>No results matched</m>");
              }
			  
			  $("#inputtags").trigger('change');
            });
            
            function suggest(){
              $(".form-tag .form-suggest > .item").click(function(){
                 
                $("#inputtags").val("");
                
                var ol_content = $(this).html();
			    var content = ol_content + '<div class="cross"></div><input class="smellsInput" type="hidden" name="smells[]" value="'+$(this).find("g").html()+'">';
                var icon_name = $(this).children("[class*='icon-']").attr("class");

                if($(".form-tag .tag ." + icon_name).length){
                  return false;
                }
                
                $(".form-tag .form-suggest ." + icon_name).parent().remove();

                $(".form-tag .tag:first-child").clone().insertBefore($(".form-tag > input")).html(content).show();
                $(".smell .radio-a").each(function(){
                  if($(this).html()==ol_content){
                    $(this).addClass("active");
                  }
                });

                $(".form-tag input").removeAttr("placeholder");

                $(".form-tag .tag > .cross").click(function(){
					
                  $(this).parent().remove();
                  $(".smell .radio-a").each(function(){
                    if($(this).html()==ol_content){
                      $(this).removeClass("active");
                    }
                  });
                  if($(".form-tag .tag").length <= 1){
                    $(".form-tag input").attr("placeholder", $(".form-tag input").data("placeholder"));
                  }
                });
              });
            }
        
            $(".smell .radio-a").click(function(){
				
              var ol_content = $(this).html();
							//var content = ol_content + '<div class="cross"></div><input type="hidden" name="small of ' + $(this).find("g").html() + '" value="1">';
			  var content = ol_content + '<div class="cross"></div><input class="smellsInput" type="hidden" name="smells[]" value="'+$(this).find("g").html()+'">';

              if(!$(this).hasClass("active")){
                $(".form-tag .tag:first-child").clone().insertBefore($(".form-tag > input")).html(content).show();
				angular.element(jQuery('.smellsHidden')).triggerHandler('input')
                $(".form-tag input").removeAttr("placeholder");

                $(".form-tag .tag > .cross").click(function(){
					
                  $(this).parent().remove();
                  $(".smell .radio-a").each(function(){
                    if($(this).html()==ol_content){
                      $(this).removeClass("active");
                    }
                  });
                  if($(".form-tag .tag").length <= 1){
                    $(".form-tag input").attr("placeholder", $(".form-tag input").data("placeholder"));
                  }
                });
                $(".smell .radio-a").each(function(){
                  if($(this).html()==ol_content){
                    $(this).addClass("active");
                  }
                });
              }else{
                $(this).removeClass("active");
                $(".form-tag .tag").each(function(){
                  if($(this).html()==content){
                    $(this).remove();
                  }
                });
                $(".smell .radio-a").each(function(){
                  if($(this).html()==ol_content){
                    $(this).removeClass("active");
                  }
                });
              }
            });
	}
>>>>>>> 3684e81b585623973728aba3410f66033c8f9359


})();