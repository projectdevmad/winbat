(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;

        return service;

        function GetAll() {
        }

        function GetById(id) {
            return $http.get('./json/user.json?id=' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get('./json/user.json?username=' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return $http.post('./json/user.json', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put('./json/user.json?' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

      

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();