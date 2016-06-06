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
                    finished : false,
                    property : "company"
                },
                {
                    "questions" : [
                        "Cool… Du coup, quelles sont tes compétences ?",
                        "Choisis parmis ces compétences en séparant tes choix par des virgules :",
                        'UI, UX, Motion Design, Typograhie, Illustration, Photographie, Front-end'
                    ],
                    listChoices : ['UI','UX',"Motion Design", "Typograhie","Illustration","Photographie","Front-end"],
                    stepNumber : 3,
                    placeHolder : "UI, UX, …",
                    finished : false,
                    property : "skills",
                    checkStep : function(skills){
                        var availableSkills = ['UI','UX',"MOTION DESIGN", "TYPOGRAPHIE","ILLUSTRATION","PHOTOGRAPHIE","FRONT-END"];
                        console.log(availableSkills);
                        var splitedSkills = skills.split(",");
                        var boolean = true;
                        if(splitedSkills.length < 2){
                            return false;
                        } else {
                            splitedSkills.forEach(function(item){
                                console.log(item.replace(" ","").toUpperCase());
                                if(availableSkills.indexOf(item.replace(" ","").toUpperCase()) < 0){
                                    boolean = false;
                                }
                            })
                        }
                        return boolean;
                    },
                    tips : "Les compétences disponibles sont celles de la liste (au moins 2 incompétent de merde) et il faut séparer tout ça avec des virgules. Apprends à lire merci"
                },
                {
                    "questions" : [
                        "Tu as un lien où je peux voir ce que tu fais ? Tu peux répondre non !"
                    ],
                    stepNumber : 4,
                    placeHolder : "http://",
                    finished : false,
                    property : "website",
                    checkStep : function(website){
                        return (website.slice(0, 7) == "http://" || website.toLowerCase() == "non" || website.toLowerCase() == "nop" || website.toLowerCase() == "no");

                    },
                    tips : "Pense à mettre le http:// ou à répondre non !"
                },
                {
                    "questions" : [

                    ],
                    stepNumber : 5,
                    placeHolder : "Oui/Non",
                    finished : false,
                    property : "workAvailability",
                    checkStep : function(work){
                        if(work.toLowerCase() == "oui" || work.toLowerCase() == "yep" || work.toLowerCase() == "yes" || work.toLowerCase() == "carrément" || work.toLowerCase() == "bien entendu" || work.toLowerCase() == "toujours"){
                            return true;
                        } else if(work.toLowerCase() == "non" || work.toLowerCase() == "nop" || work.toLowerCase() == "t'es ouf" || work.toLowerCase() == "no" || work.toLowerCase() == "trop pas" || work.toLowerCase() == "jamais"){
                            return true;
                        } else {
                            return false
                        }
                    },
                    tips : "Il faut répondre par oui ou non enfin !"
                },
                {
                    "questions" : [
                        "Merci !"
                    ],
                    stepNumber : 6,
                    finished : false,
                    finalStep : true
                }

            ];
            var user = {};

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
                    } else if(nStep == 3) {
                        user[$scope.messagesList[index].property] = data.toUpperCase().split(",");
                    } else if(nStep == 4){
                        if(data.toLowerCase() == "non" || data.toLowerCase() == "nop" || data.toLowerCase() == "no"){
                            data = null;
                            $scope.messages[index + 1].questions = ['Tant pis, on fera sans !'];
                        } else {
                            $scope.messages[index + 1].questions = ['Super le lien ' + data + " est sauvegardé"];
                        }
                        $scope.messages[index + 1].questions.push("Dernière petite question & je te laisse tranquille")
                        $scope.messages[index + 1].questions.push("Est-ce que tu es disponible pour du travail ?")
                    } else if (nStep == 5){
                        if(data.toLowerCase() == "oui" || data.toLowerCase() == "yep" || data.toLowerCase() == "yes" || data.toLowerCase() == "carrément" || data.toLowerCase() == "bien entendu" || data.toLowerCase() == "toujours"){
                            user[$scope.messagesList[index].property] = true;
                        } else if(data.toLowerCase() == "non" || data.toLowerCase() == "nop" || data.toLowerCase() == "t'es ouf" || data.toLowerCase() == "no" || data.toLowerCase() == "trop pas" || data.toLowerCase() == "jamais") {
                            user[$scope.messagesList[index].property] = false;
                        }
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

