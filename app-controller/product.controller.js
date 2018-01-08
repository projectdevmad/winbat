(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductController', ProductController);
	

    ProductController.$inject = ['searchService', '$location', '$rootScope', '$http', '$scope', '$translate', '$translatePartialLoader', '$routeParams', '$timeout', '$q'];

    function ProductController(searchService, $location, $rootScope, $http, $scope, $translate, $translatePartialLoader, $routeParams, $timeout, $q) {
	  
	  }


})();