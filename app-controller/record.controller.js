(function() {
    'use strict';

    angular
        .module('app')
        .controller('RecordController', RecordController);

    RecordController.$inject = ['searchService', '$location', '$scope', '$routeParams','$rootScope' , '$timeout'];

    function RecordController(searchService, $location, $scope, $routeParams,$rootScope , $timeout) {
        $scope.details = {};
        $scope.licenseNo = $routeParams.license;
        loadData();

        function loadData() {
            var url = "./json/details.json";
            if ($scope.licenseNo.charAt(0) == 'I') {
                url = "./json/details_individual.json";
            } else {
                url = "./json/details_firm.json";
            }
            $scope.details = searchService.getDetails(url, { "license": $scope.licenseNo }).then(function(data) {
                $scope.details = data;
                $scope.licenseNo = data.licenseNo;
                $scope.licenseType = data.type;
                
                // $timeout($rootScope.responsiveTables, 100);
                $rootScope.responsiveTables();
            });

        }
        $scope.viewLicense = function viewLicense() {
            var params = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no, width=800,height=600,left=100,top=100";
            open('/demo/#/viewLicense/' + $scope.licenseType +  $scope.licenseNo, 'test', params);

            //$location.path('/viewLicense/' + $scope.licenseNo);

        }
        $scope.toogleSubAgent = function toogleSubAgent(appointing) {
            console.log(appointing.show);
            if (appointing.show) {
                appointing.show = false;
            } else {
                appointing.show = true;
            }


        }

    }

})();