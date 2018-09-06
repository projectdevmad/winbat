(function() {
    'use strict';

    angular
        .module('app')
        .controller('TermsController', TermsController);
	

    TermsController.$inject = ['searchService', '$location', '$rootScope', '$http', '$scope', '$translate', '$translatePartialLoader', '$routeParams', '$timeout', '$q'];

    function TermsController(searchService, $location, $rootScope, $http, $scope, $translate, $translatePartialLoader, $routeParams, $timeout, $q) {
	  
	  }


})();