(function() {
    'use strict';

    angular
        .module('app')
        .controller('PolicyController', PolicyController);
	

    PolicyController.$inject = ['searchService', '$location', '$rootScope', '$http', '$scope', '$translate', '$translatePartialLoader', '$routeParams', '$timeout', '$q'];

    function PolicyController(searchService, $location, $rootScope, $http, $scope, $translate, $translatePartialLoader, $routeParams, $timeout, $q) {
	  
	  }


})();