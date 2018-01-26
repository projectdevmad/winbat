(function() {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'pascalprecht.translate', 'mgcrea.ngStrap', 'ngSanitize', 'bw.paging', 'cgBusy' , 'infinite-scroll', 'ui.bootstrap'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider', '$translateProvider', '$translatePartialLoaderProvider', '$typeaheadProvider'];
    angular.module('app')
        .config(function($typeaheadProvider) {
            angular.extend($typeaheadProvider.defaults, {
                animation: 'am-flip-x',
                minLength: 2,
                limit: 8
            });
        })

    function config($routeProvider, $locationProvider, $translateProvider, $translatePartialLoader, $typeaheadProvider) {
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
			.when('/productDetails/:id', {
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
			.when('/contact', {
                controller: 'ContactController',
                templateUrl: 'app-content/view/contact.html',
                controllerAs: 'vm'
            })
			.when('/register', {
                controller: 'RegisterController',
                templateUrl: 'app-content/view/register.html',
                controllerAs: 'vm'
            })
			.when('/login', {
                controller: 'LoginController',
                templateUrl: 'app-content/view/login.html',
                controllerAs: 'vm'
            })
			.when('/profile', {
                controller: 'ProfileController',
                templateUrl: 'app-content/view/profile.html',
                controllerAs: 'vm'
            })
			.when('/myProfile', {
                controller: 'ProfileController',
                templateUrl: 'app-content/view/my-profile.html',
                controllerAs: 'vm'
            })
			.when('/addMyTastingNote', {
                controller: 'addMyTastingNoteController',
                templateUrl: 'app-content/view/add-my-tasting-note.html',
                controllerAs: 'vm'
            })
			.when('/addMyTastingNote/:id', {
                controller: 'addMyTastingNoteController',
                templateUrl: 'app-content/view/add-my-tasting-note.html',
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
		
        $rootScope.delay = 0;
        $rootScope.minDuration = 0;
        $rootScope.message = 'Please Wait...';
        $rootScope.backdrop = true;
        $rootScope.promise = null;
           $rootScope.globals = $cookies.getObject('globals') || {};
           if ($rootScope.globals.currentUser) {
               $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
           }
		   console.log($rootScope.globals.currentUser);
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
            $http.defaults.headers.common.Authorization = 'Basic';
			$location.path("index");
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