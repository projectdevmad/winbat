(function() {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'pascalprecht.translate', 'mgcrea.ngStrap', 'ngSanitize', 'bw.paging', 'cgBusy' , 'infinite-scroll'])
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
            .when('/search/:searchType', {
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
                controller: 'MerchantController',
                templateUrl: 'app-content/view/merchant-detail.html',
                controllerAs: 'vm'
            })
			.when('/merchantDetails/:id', {
                controller: 'MerchantController',
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
        /*   $rootScope.globals = $cookies.getObject('globals') || {};
           if ($rootScope.globals.currentUser) {
               $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
           }

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

})();