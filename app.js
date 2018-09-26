(function() {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'pascalprecht.translate', 'mgcrea.ngStrap', 'ngSanitize', 'bw.paging', 'cgBusy' , 'infinite-scroll', 'ui.bootstrap' ])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider', '$translateProvider', '$translatePartialLoaderProvider', '$typeaheadProvider'];
    angular.module('app')
        .config(function($typeaheadProvider) {
            angular.extend($typeaheadProvider.defaults, {
                animation: 'am-flip-x',
                minLength: 1,
                limit: 20
            });
        })

    function config($routeProvider, $locationProvider, $translateProvider, $translatePartialLoader, $typeaheadProvider, $rootScope) {
        // $locationProvider.html5Mode(true);

        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: './app-content/{part}/{lang}.json'
        });
        $translatePartialLoader.addPart('lang');
        $translateProvider.preferredLanguage('en');

        $locationProvider.hashPrefix('');
        $routeProvider
            .when('/index', {
                controller: 'HomeController',
                templateUrl: 'app-content/view/index.html',
                controllerAs: 'vm'
            })
            .when('/search', {
                controller: 'SearchController',
                templateUrl: 'app-content/view/search.html',
                controllerAs: 'vm'
            })
            .when('/search/:params', {
                controller: 'SearchController',
                templateUrl: 'app-content/view/search.html',
                controllerAs: 'vm'
            })
			.when('/productDetails', {
                controller: 'ProductController',
                templateUrl: 'app-content/view/product-detail.html',
                controllerAs: 'vm'
            })
			.when('/productDetails/:name/:year', {
                controller: 'ProductController',
                templateUrl: 'app-content/view/product-detail.html',
                controllerAs: 'vm'
            })
			.when('/merchant', {
                controller: 'MerchantController',
                templateUrl: 'app-content/view/merchant.html',
                controllerAs: 'vm'
            })
			.when('/merchantDetails', {
                controller: 'MerchantDetailsController',
                templateUrl: 'app-content/view/merchant-detail.html',
                controllerAs: 'vm'
            })
			.when('/merchantDetails/:id', {
                controller: 'MerchantDetailsController',
                templateUrl: 'app-content/view/merchant-detail.html',
                controllerAs: 'vm'
            })
			.when('/about', {
                controller: 'AboutController',
                templateUrl: 'app-content/view/about.html',
                controllerAs: 'vm'
            })
			.when('/policy', {
                controller: 'PolicyController',
                templateUrl: 'app-content/view/policy.html',
                controllerAs: 'vm'
            })
			.when('/terms', {
                controller: 'TermsController',
                templateUrl: 'app-content/view/terms.html',
                controllerAs: 'vm'
            })
			.when('/contact', {
                controller: 'ContactController',
                templateUrl: 'app-content/view/contact.html',
                controllerAs: 'vm'
            })
			.when('/register', {
                controller: 'RegisterController',
                templateUrl: 'app-content/view/register.html',
				resolve:{
					 Data: ['$http','$rootScope','$location', function ($http, $rootScope,$location) {
               	  		 if($rootScope.globals.currentUser){
							$location.path('/index');
						}
              		 }]
				},
                controllerAs: 'vm'
            })
			.when('/login', {
                controller: 'LoginController',
                templateUrl: 'app-content/view/login.html',
                controllerAs: 'vm'
            })
			.when('/forgetPassword', {
                controller: 'ForgetPasswordController',
                templateUrl: 'app-content/view/forget-password.html',
                controllerAs: 'vm'
            })
			//.when('/changePassword', { redirectTo: '/forgetPassword' })
			.when('/changePassword', {  controller: 'ChangePasswordController',
                templateUrl: 'app-content/view/change-password.html',
                controllerAs: 'vm' })
			.when('/changePassword/:id/:token', {
                controller: 'ChangePasswordController',
                templateUrl: 'app-content/view/change-password.html',
                controllerAs: 'vm'
            })
			.when('/profile', {
                controller: 'ProfileController',
                templateUrl: 'app-content/view/profile.html',
				resolve:{
					 Data: ['$http','$rootScope','$location', function ($http, $rootScope,$location) {
               	  		 if(!$rootScope.globals.currentUser){
							$location.path('/login');
						}
              		 }]
				},
                controllerAs: 'vm'
            })
			.when('/myProfile', {
                controller: 'MyProfileController',
                templateUrl: 'app-content/view/my-profile.html',
				resolve:{
					 Data: ['$http','$rootScope','$location', function ($http, $rootScope,$location) {
               	  		 if(!$rootScope.globals.currentUser){
							$location.path('/login');
						}
              		 }]
				},
                controllerAs: 'vm'
            })
			.when('/addMyTastingNote', {
                controller: 'addMyTastingNoteController',
                templateUrl: 'app-content/view/add-my-tasting-note.html',
				resolve:{
					 Data: ['$http','$rootScope','$location', function ($http, $rootScope,$location) {
               	  		 if(!$rootScope.globals.currentUser){
							$location.path('/login');
						}
              		 }]
				},
                controllerAs: 'vm'
            })
			.when('/addMyTastingNote/:name/:year', {
                controller: 'addMyTastingNoteController',
                templateUrl: 'app-content/view/add-my-tasting-note.html',
				resolve:{
					 Data: ['$http','$rootScope','$location', function ($http, $rootScope,$location) {
               	  		 if(!$rootScope.globals.currentUser){
							$location.path('/login');
						}
              		 }]
				},
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/index' });
    }
    run.$inject = ['$rootScope', '$location', '$cookies', '$http', '$translate', '$templateCache', '$timeout'];

    function run($rootScope, $location, $cookies, $http, $translate, $templateCache, $timeout) {
		$rootScope.searchFormData = {};
		$rootScope.regions =	regions;
		$rootScope.prices =	prices;
		$rootScope.styles =	styles;
		$rootScope.grapes =	grapes;
		
        // keep user logged in after page refresh
        $rootScope.changeLanguage = function(lang) {
            console.log("change to " + lang)
            $translate.use(lang);
        }
        $rootScope.$on('$viewContentLoaded', function() {
            $templateCache.removeAll();
        });
		
        $rootScope.delay = 300;
        $rootScope.minDuration = 300;
        $rootScope.message = 'Please Wait...';
        $rootScope.backdrop = false;
        $rootScope.promise = null;
		
		var colorUrl = "./json/colorBase.json";
			$http({
                method: "Get",
                url: colorUrl,
                withCredentials: true

            }).then(function(response) {
				$rootScope.colorBase = {}
				angular.forEach(response.data.colorBase, function(value, key) {
					var cat = value.cat;
					var name = value.name;
					var hex = value.hex
					//if ($rootScope.colorBase[cat] == null) $rootScope.colorBase[cat] = {};
					//$rootScope.colorBase[cat][name] = hex;
					var id = value.id;
					$rootScope.colorBase[id] = value;
					
				});
				//console.log($rootScope.colorBase['rose']['deep salmon']);
			})
			
			
           $rootScope.globals = $cookies.getObject('globals') || {};
           if ($rootScope.globals.currentUser) {
               $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
           }
		    /* $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){

		  //  $rootScope.$on('$locationChangeStart', function (event, next, current) {
				console.log(currRoute);
				var appTo = currRoute.path.indexOf('/secure') !== -1;
				if(!$rootScope.globals.currentUser){
					console.log('DENY');
					event.preventDefault();
					$location.path('/login');
				}
				else {
					console.log('ALLOW');
					$location.path('/index');
				}
			});*/
/*
           $rootScope.$on('$locationChangeStart', function (event, next, current) {
               // redirect to login page if not logged in and trying to access a restricted page
               var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
               var loggedIn = $rootScope.globals.currentUser;
               if (restrictedPage && !loggedIn) {
                   $location.path('/login');
               }
           });*/
        $rootScope.responsiveTables = function responsiveTables() {
            $timeout(function() {
                $('table.responsive').ngResponsiveTables({
                    smallPaddingCharNo: 13,
                    mediumPaddingCharNo: 18,
                    largePaddingCharNo: 30
                });
            }, 100);
        }
		
		$rootScope.clickSearch = function clickSearch(){
			
			var paramString = $("#searchForm").serialize();
			$rootScope.searchFormData = deparam(paramString);
			
			
			$location.path('/search/'+paramString);
			return false;
			
		}
		$rootScope.logout = function(){
			$rootScope.user = {};
			$rootScope.globals = {};
            $cookies.remove('globals');
			//$cookies.remove('JSESSIONID');
            $http.defaults.headers.common.Authorization = 'Basic';
			
			var logout_url = "http://ec2-13-229-238-73.ap-southeast-1.compute.amazonaws.com:8080/api/user/logout";
			return $http({
                method: "Post",
                url: logout_url,
                withCredentials: true

            }).then(function(response) {
				$location.path("login");
			})
			
		}
		$rootScope.searchKeyword = function searchKeyword(name){
			$rootScope.keyword;
			if (name == null || name == "" ) return null;
			var catalogUrl = "http://ec2-13-229-238-73.ap-southeast-1.compute.amazonaws.com:8080/api/catalog/suggest?q="+name;
			return $http({
                method: "GET",
                url: catalogUrl,
                data: []

            }).
            then(function(response) {
				var data = response.data;
                if (response.status == 200) {
                   if (data == null) return;
						$rootScope.keywords = [];
					for (var i =0; i<data.length; i++){
						$rootScope.keywords.push(data[i].name);
					}
					return $rootScope.keywords;
                } else {
                    alert("service connection failed");
                    return null;
                }

            }, function(response) {

            });
			
		}
		$rootScope.parseInteger = function parseInteger($val){
			
			if ($val == null) return 0;
			return parseInt($val);
		}
		$rootScope.getHappy = function getHappy(tasting_note){
			
			if (tasting_note ==null || tasting_note.overall == null || tasting_note.total==null){
				return 0;
			}
			return Math.round((tasting_note.overall/5 )*tasting_note.total);
		}
		$rootScope.getSad = function getSad(tasting_note){
			if (tasting_note ==null || tasting_note.overall == null || tasting_note.total==null){
				return 0;
			}
			return Math.round(tasting_note.total*(1-(tasting_note.overall/5)));
		}
    }
	
	angular.module('app').directive('productItem', function() {
	   return {
		 restrict: 'E',
		 scope: {product: '='},
		 //  template: '<h2>Label list:{{labelsArray}}:</h2><div class="label label-warning" ng-repeat="label in labelsArray">{{label.name}}</div>',
		   templateUrl: './app-content/view/product-item.tpl.html',
		   restrict: 'E',
		};
	
	});
	angular.module('app').directive('productItemSm', function() {
	   return {
		 restrict: 'E',
		 scope: {product: '='},
		   templateUrl: './app-content/view/product-item-sm.tpl.html',
		   restrict: 'E',
		};
	
	});
	angular.module('app').directive('searchBar', function() {
	   return {
		 restrict: 'E',
		 scope: {data: '='},
		   templateUrl: './app-content/view/search-bar.tpl.html',
		   restrict: 'E',
		};
	
	});
	angular.module('app').directive('searchBarSm', function() {
	   return {
		 restrict: 'E',
		 scope: {data: '='},
		   templateUrl: './app-content/view/search-bar-sm.tpl.html',
		   restrict: 'E',
		};
	
	});
	

})();

function deparam(query) {
    var pairs, i, keyValuePair, key, value, map = {};
    // remove leading question mark if its there
    if (query.slice(0, 1) === '?') {
        query = query.slice(1);
    }
    if (query !== '') {
        pairs = query.split('&');
        for (i = 0; i < pairs.length; i += 1) {
            keyValuePair = pairs[i].split('=');
            key = decodeURIComponent(keyValuePair[0]);
            value = (keyValuePair.length > 1) ? decodeURIComponent(keyValuePair[1]) : undefined;
            map[key] = value;
        }
    }
    return map;
}
function ObjecttoParams(obj) {
    var p = [];
    for (var key in obj) {
        p.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return p.join('&');
};