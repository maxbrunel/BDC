"use strict";

angular.module("bdc").controller("ApplicationController",
    ["$rootScope","$state","$scope","SweetAlert",
        function($rootScope,$state,$scope, SweetAlert){
            $rootScope.$state = $state;
            $scope.textToTest =  ["Salut toi", "Hello worfezfjhzifhzuihfzihfzild \u2764"]
            $scope.theme = function() {
                SweetAlert.swal({
                    title: "Custom Slack Theme",
                    text: 'Copie le code suivant et colle le dans les préférences de Slack <br /><div>#FFC81A,#0C2BB2,#FFFFFF,#FFC81A,#5E76E0,#FFFFFF,#FFFFFF,#EB4D5C</div>',
                    confirmButtonColor: '#FFC81A',
                    type: 'success',
                    html : true
                });
            };
        }]);

