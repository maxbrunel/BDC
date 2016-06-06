"use strict";

angular.module("bdc").controller("HomeController",
    ["$rootScope","$scope","$timeout",
        function($rootScope,$scope,$timeout){
            $scope.inscriptionBegin = false;

            $scope.messages =[
                {
                    "questions" : [
                        "Génial ! Je me demandais, quel est ton nom (en entier bien sûr) ?"
                    ],
                    stepNumber : 0,
                    placeHolder : "Écris ton nom",
                    active : false,
                    finished : false,
                    property : "name",
                    checkStep : function(name){
                        return name.split(" ").length >= 2 && name.length != 0;
                    },
                    tips : "Essaye d'écrire ton nom ET ton prénom"
                },
                {
                    "questions" : [

                    ],
                    stepNumber : 1,
                    placeHolder : "Écris ton e-mail",
                    active : false,
                    finished : false,
                    property : "email",
                    checkStep : function(email){
                        return email.split("@").length > 1 && email.split(" ").length == 1
                    },
                    tips : "Essaye D'écrire un vrai e-mail quand même. Fais des putains d'efforts"
                },
                {
                    "questions" : [

                    ],
                    stepNumber : 2,
                    placeHolder : "Entreprise / Formation",
                    active : false,
                    finished : false,
                    property : "company"
                },
                {
                    "questions" : [
                        "Cool… Du coup, quelles sont tes compétences ?"
                    ],
                    stepNumber : 2,
                    placeHolder : "Entreprise / Formation",
                    active : false,
                    finished : false,
                    property : "skills"
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
                    if(nStep == 0){
                        $scope.messages[index + 1].questions = ["Enchanté " + data.split(" ")[0],"Peux-tu m'envoyer ton adresse e-mail pour que je finalise ton inscription ?"]
                    } else if (nStep == 1){
                        $scope.messages[index + 1].questions = ["Merci " + user.name + ". Je t'inscris donc avec l'adresse " + user.email,"À ce propos, où est-ce que tu travailles ?"]
                    }
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

