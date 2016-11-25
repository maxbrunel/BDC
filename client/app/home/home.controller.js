"use strict";

angular.module("bdc").controller("HomeController",
    ["$rootScope","$scope","$timeout",'UsersService',"SKILLS",
        function($rootScope,$scope,$timeout,UsersService,SKILLS){

            var capitalizeAndLowerCase = function(string){
                if(string){
                    return string[0].toUpperCase() + string.slice(1).toLowerCase();
                }
                return "";
            };

            $scope.messages =[
                {
                    "questions" : [
                        "Génial ! Je me demandais, quel est ton nom (en entier bien sûr) ?"
                    ],
                    stepNumber : 0,
                    placeHolder : "Écris ton nom",
                    finished : false,
                    property : "name",
                    class : "capitalize",
                    checkStep : function(name){
                        return name.split(" ").length >= 2 && name.length != 0;
                    },
                    tips : "Essaie plutôt d'écrire ton prénom <strong>puis</strong> ton nom"
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
                    tips : "Il semblerait que ton e-mail soit incorrecte. Si c'est une blague, c'est pas drôle !"
                },
                {
                    "questions" : [

                    ],
                    stepNumber : 2,
                    placeHolder : "Entreprise / Formation",
                    finished : false,
                    property : "company",
                    class : "capitalize"
                },
                {
                    "questions" : [
                        "Cool ! Du coup, quelles sont tes compétences ?",
                        "Choisis parmis ces compétences en séparant tes choix par des virgules :",
                        SKILLS.availableSkills.map(function(skill){
                            if(skill == "UI" || skill == "UX" || skill == "3D"){
                                return skill;
                            } else {
                                return capitalizeAndLowerCase(skill)
                            }
                        }).join(", ")
                    ],
                    listChoices : SKILLS.availableSkills,
                    stepNumber : 3,
                    placeHolder : "UI, UX, …",
                    finished : false,
                    property : "skills",
                    checkStep : function(skills){
                        var availableSkills = SKILLS.availableSkills;
                        //console.log(availableSkills);
                        var splitedSkills = skills.split(",");
                        var boolean = true;
                        if(splitedSkills.length < 2){
                            return false;
                        } else {
                            splitedSkills.forEach(function(item){
                                //console.log(item.replace(" ","").toUpperCase());
                                if(availableSkills.indexOf(item.trim().toUpperCase()) < 0){
                                    boolean = false;
                                }
                            })
                        }
                        return boolean;
                    },
                    tips : "Choisis au moins 2 compétences & sépare tout ça avec des virgules."
                },
                {
                    "questions" : [
                        "\ud83d\ude3b Tu as un lien où je peux voir ce que tu fais ? Tu peux répondre non !"
                    ],
                    stepNumber : 4,
                    placeHolder : "http://",
                    finished : false,
                    property : "website",
                    checkStep : function(website){
                        return (website.slice(0, 7) == "http://" || website.toLowerCase() == "non" || website.toLowerCase() == "nop" || website.toLowerCase() == "no");

                    },
                    tips : "Pense à mettre le <strong>http://</strong> ou à répondre non !"
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
                    tips : "Il faut répondre par oui ou non, c'est si compliqué ? "
                },
                {
                    "questions" : [
                        "Ça marche. Tu devrais bientôt recevoir un e-mail de Slack pour rejoindre la discussion. Tu pourras commencer par te présenter rapidement sur le channel <strong>#présentation</strong>",
                        "À bientôt \ud83d\udc4a",
                        "– Max"
                    ],
                    stepNumber : 6,
                    finished : false,
                    finalStep : true
                }

            ];
            var user = {};


            $scope.messagesList = [];

            var goToNextStep = function(index){

                if($scope.messages[index + 1]){
                    $timeout(function(){$scope.$apply(function() {
                        $scope.messagesList.push($scope.messages[index + 1]);
                    })})
                } else {
                    //console.log("Inscription terminée");
                    //console.log(user);
                }
            };

            $scope.nextStep = function(nStep,data){
                var index = parseInt(nStep);
                $scope.$apply(function() {
                    if($scope.messages[index]){
                        $scope.messages[index].finished = true;
                        user[$scope.messages[index].property] = data;
                    }
                    if(nStep == 0){
                        $scope.messages[index + 1].questions = ["Enchanté " + data.split(" ")[0] + "&nbsp;\ud83d\udc4b","Peux-tu m'envoyer ton adresse e-mail pour que je finalise ton inscription ?"]
                    } else if (nStep == 1){
                        UsersService.checkIfEmailExists(user.email).then(function(success){
                            if(success.data.exists){
                                $scope.messages[index].questions = ["Il semble que cette adresse e-mail existe déjà. Essayes avec une autre"];
                                goToNextStep(index - 1);
                            } else {
                                $scope.messages[index + 1].questions = ["Merci " + user.name.split(" ")[0] + " \ud83d\udc8c Je t'inscris donc avec l'adresse " + user.email,"À ce propos, où est-ce que tu travailles ? \ud83c\udfe2"]
                                goToNextStep(index);
                            }
                        },function(error){
                            $scope.messages[index].questions = ["Il semble qu'il y ait eut une erreur. Déso. Redonnes moi ton adresse email ?"];
                            goToNextStep(index-1);
                        })
                    } else if(nStep == 3) {
                        user[$scope.messages[index].property] = data.toUpperCase().split(",");
                    } else if(nStep == 4){
                        if(data.toLowerCase() == "non" || data.toLowerCase() == "nop" || data.toLowerCase() == "t'es ouf" || data.toLowerCase() == "no" || data.toLowerCase() == "trop pas" || data.toLowerCase() == "jamais" || data.toLowerCase() == "c'est mort" || data.toLowerCase() == "pourquoi faire ?" || data.toLowerCase() == "je m'en fous" || data.toLowerCase() == "pas vraiment" || data.toLowerCase() == "pas vraiment non" || data.toLowerCase() == "je ne pense pas" || data.toLowerCase() == "je m'en bas les couilles frère") {
                            data = null;
                            $scope.messages[index + 1].questions = ['Tant pis, on fera sans !'];
                        } else {
                            $scope.messages[index + 1].questions = ['Super j\'irai voir ça. Je mets l\'adresse de côté : ' + data + ''];
                        }
                        $scope.messages[index + 1].questions.push("Dernière question & je te laisse tranquille");
                        $scope.messages[index + 1].questions.push("Est-ce que tu es disponible pour du travail ?")
                    } else if (nStep == 5){
                        if(data.toLowerCase() == "oui" || data.toLowerCase() == "yep" || data.toLowerCase() == "yes" || data.toLowerCase() == "carrément" || data.toLowerCase() == "bien entendu" || data.toLowerCase() == "toujours" || data.toLowerCase() == "bien sûr" || data.toLowerCase() == "bien sur" || data.toLowerCase() == "évidemment" || data.toLowerCase() == "plutôt" || data.toLowerCase() == "plutôt oui" || data.toLowerCase() == "plutot" || data.toLowerCase() == "plutot oui"){
                            user[$scope.messagesList[index].property] = true;
                        } else if(data.toLowerCase() == "non" || data.toLowerCase() == "nop" || data.toLowerCase() == "t'es ouf" || data.toLowerCase() == "no" || data.toLowerCase() == "trop pas" || data.toLowerCase() == "jamais" || data.toLowerCase() == "c'est mort" || data.toLowerCase() == "pourquoi faire ?" || data.toLowerCase() == "je m'en fous" || data.toLowerCase() == "pas vraiment" || data.toLowerCase() == "pas vraiment non" || data.toLowerCase() == "je ne pense pas" || data.toLowerCase() == "je m'en bas les couilles frère") {
                            user[$scope.messagesList[index].property] = false;
                        }
                    }

                    if(nStep != 1){
                        goToNextStep(index)
                    }

                    if($scope.messages[index + 1] && $scope.messages[index + 1].finalStep){
                        if(user.website){
                            if(user.website.slice(0, 7) != "http://"){
                                user.website = false;
                            }
                        }

                        UsersService.createUser(user)
                    }
                });

            };

            $scope.launchChat = function(){
                $timeout(function(){$scope.messagesList.push($scope.messages[0]);},500)
            };
        }]);

