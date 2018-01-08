(function() {
    'use strict';

    angular
        .module('app')
        .controller('addMyTastingNoteController', addMyTastingNoteController);
	

    addMyTastingNoteController.$inject = ['searchService', '$location', '$rootScope', '$http', '$scope', '$translate', '$translatePartialLoader', '$routeParams', '$timeout', '$q'];

    function addMyTastingNoteController(searchService, $location, $rootScope, $http, $scope, $translate, $translatePartialLoader, $routeParams, $timeout, $q) {
	  
	  }


})();