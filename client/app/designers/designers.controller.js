"use strict";



angular.module("bdc").controller("DesignersController",
    ["$rootScope","$scope",'UsersService',
        function($rootScope,$scope,UsersService){
            UsersService.getAll().then(function(response){
                console.log(response.data);
                $scope.users = response.data;
            });
            $scope.users = {}
        }]);
