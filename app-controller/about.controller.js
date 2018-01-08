(function() {
    'use strict';

    angular
        .module('app')
        .controller('AboutController', AboutController);
	

    AboutController.$inject = ['searchService', '$location', '$rootScope', '$http', '$scope', '$translate', '$translatePartialLoader', '$routeParams', '$timeout', '$q'];

    function AboutController(searchService, $location, $rootScope, $http, $scope, $translate, $translatePartialLoader, $routeParams, $timeout, $q) {
	  
	  }


})();