"use strict";

angular.module("bdc").controller("HomeController",
    ["$rootScope","$scope","$timeout",
        function($rootScope,$scope,$timeout){
            $scope.inscriptionBegin = false;

            $scope.messages =[
                {
                    "questions" : [
                        "Génial ! Je me demandais, quel est ton nom (en entier bien sûr) ?",
                        "Et ça c'est une autre question genre au cas ou t'es un peu con"
                    ],
                    stepNumber : 0,
                    placeHolder : "Écris ton nom",
                    active : false,
                    finished : false,
                    property : "name"
                },
                {
                    "questions" : [
                        "Deuxieme etape BITCHIIIEJOIEJO",
                        "Et ça c'est une autre question genre au cas ou t'es un peu con"
                    ],
                    stepNumber : 1,
                    placeHolder : "Ecris ce que tu veux bitch",
                    active : false,
                    finished : false,
                    property : "pouet"
                }
            ];

            var user = {
                name : ""
            };

            $scope.messagesList = [];

            $scope.nextStep = function(nStep,data){
                console.log(data);
                var index = parseInt(nStep);
                $scope.$apply(function() {
                    $scope.messagesList[index].finished = true;
                    user[$scope.messagesList[index].property] = data;
                });
                if($scope.messages[index + 1]){
                    $scope.$apply(function() {
                        $scope.messagesList.push($scope.messages[index + 1]);
                    })
                } else {
                    console.log("Formulaire terminé");
                    console.log(user)
                }
            };

            $scope.launchChat = function(){
                $scope.messagesList.push($scope.messages[0]);
            };
            $scope.$watch('inscriptionBegin',function(val){
                if(val){
                    $timeout(function(){
                        $scope.launchChat();
                    },1000)
                }
            });


            $scope.testFunc = function(){
                console.log("OH c'est pas vrai")
            }
        }]);

