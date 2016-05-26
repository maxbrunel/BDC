"use strict";

angular.module("bdc").controller("ApplicationController",
      ["$rootScope","$state","$scope","SweetAlert",
      function($rootScope,$state,$scope, SweetAlert){
          $rootScope.$state = $state;
          $scope.textToTest =  ["Salut toi", "Hello worfezfjhzifhzuihfzihfzild \u2764"]
    $scope.theme = function() {
        SweetAlert.swal({
        title: "Custom Slack Theme",
        text: 'Copie le code suivant et colle le dans les préférences de Slack <br />' +
        '<input type="text" value="#0F34D2,#0C2BB2,#FFFFFF,#0F34D2,#5E76E0,#FFFFFF,#FFFFFF,#EB4D5C" readonly="readonly" class="code">',
        confirmButtonColor: '#0F34D2',
        type: 'success'
        });
    };
    }]);

