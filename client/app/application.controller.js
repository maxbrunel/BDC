"use strict";

angular.module("bdc").controller("ApplicationController",
      ["$rootScope","$state","$scope",
      function($rootScope,$state,$scope){
          $rootScope.$state = $state;
          $scope.textToTest =  ["Salut toi", "Hello worfezfjhzifhzuihfzihfzild \u2764"]
    }]);
