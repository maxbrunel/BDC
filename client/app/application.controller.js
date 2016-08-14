"use strict";

angular.module("bdc").controller("ApplicationController",
    ["$rootScope","$state","$scope","SweetAlert",
        function($rootScope,$state,$scope, SweetAlert){
            $rootScope.$state = $state;
            $scope.textToTest =  ["Salut toi", "Hello worfezfjhzifhzuihfzihfzild \u2764"]
            $scope.theme = function() {
                SweetAlert.swal({
                    title: "Custom Slack Theme",
                    text: 'Copie le code suivant et colle le dans le menu "Sidebar Theme" des préférences de Slack <br /><div class="theme-code">#FFC81A,#F6AC08,#F6AC08,#000000,#F6AC08,#333333,#000000,#F26C68</div>',
                    confirmButtonColor: '#FFC81A',
                    type: 'success',
                    html : true
                });
            };
            $scope.delete = function() {
                SweetAlert.swal({
                    title: "Attention !",
                    text: 'Tu ne seras plus membre du Bordeaux Designers Club',
                    type: 'warning',
                    confirmButtonText: "SUPPRIMER",
                    cancelButtonText: "ANNULER",
                    confirmButtonColor: '#FFC81A',
                    closeOnConfirm: false,
                    showCancelButton: true,
                    closeOnCancel: true
                },
                function(){   
                    swal({
                        title: "Supprimé !", 
                        text: "Ton compte a bien été supprimé", 
                        type: "success",
                        confirmButtonColor: '#FFC81A'
                    });
                });
            };
        }]);

