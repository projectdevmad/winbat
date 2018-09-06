(function() {
    'use strict';

    angular
        .module('app')
        .factory('searchService', searchService);

    searchService.$inject = ['$http', '$timeout'];

    function searchService($http, $timeout) {
        var service = {};

        service.search = search;
        service.jsonSearch = jsonSearch;
        service.ajaxJsonp = ajaxJsonp;
        return service;

        function search(url, params) {
<<<<<<< HEAD
            var method = 'POST';
            return $http({
                method: method,
                url: url,
                data: params
=======
            var method = 'GET';
            return $http({
                method: method,
                url: url,
                data: params,
				withCredentials: true
>>>>>>> 3684e81b585623973728aba3410f66033c8f9359

            }).
            then(function(response) {
                if (response.status == 200) {
                   // console.log(response);
                    return response.data;
                } else {
                    alert("service connection failed");
                    return null;
                }

            }, function(response) {

            });
        }

        function jsonSearch(url) {
          // url = "http://testapi.bemytour.com/concierge.getshuttlelist.jsonp?callback=JSON_CALLBACK&lang=en-US&type=type&hotelid=222016";
            // url = "./json/jsonp.php?callback=JSON_CALLBACK";
            return ajaxJsonp(url).then(function(successParam) { // success callback
                return successParam;
                //   $timeout(function(){}   , 5000});
            });
        }

        function ajaxJsonp(url) {

            return $http.jsonp(url, { jsonpCallbackParam: 'JSON_CALLBACK' }).
            then(function(response) {
                if (response.status == 200) {
                   // console.log(response);
                    return response.data;
                } else {
                    alert("service connection failed");
                    return null;
                }

            }, function(response) {

            });
        }


    }

})();