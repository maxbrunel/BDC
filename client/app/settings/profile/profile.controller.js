"use strict";



angular.module("bdc").controller("ProfileController",
    ["$rootScope","$scope",'UsersService',"SKILLS",
        function($rootScope,$scope,UsersService, SKILLS) {

            var capitalizeAndLowerCase = function(string){
                if(string){
                    return string[0].toUpperCase() + string.slice(1).toLowerCase();
                }
                return "";
            };

            $scope.availableSkills = SKILLS.availableSkills.map(function(skill){
                if(skill == "UI" || skill == "UX"){
                    return skill;
                } else {
                    return capitalizeAndLowerCase(skill)
                }
            });

            $scope.isLoading = true;
            UsersService.getUserInfo($rootScope.context.user.user.email).then(function(success){
                var user = success.data;
                user.skills = user.skills.map(function(skill){
                    var newSkill = skill.trim().toUpperCase();
                    if(newSkill == "UI" || newSkill == "UX"){
                        return newSkill;
                    } else {
                        return capitalizeAndLowerCase(newSkill)
                    }
                });
                user.skills.forEach(function(skill){
                    user.skills[skill] = true;
                });
                $scope.user = user;
                $scope.userToSave = user;
            },function (err) {
                console.log(err)
            }).finally(function(){
                $scope.isLoading = false;
            });


            $scope.save = function(){
                $scope.isLoading = true;
                var userToSave = angular.copy($scope.userToSave);
                userToSave.skills = [];
                for(var skill in $scope.userToSave.skills){
                    if($scope.userToSave.skills[skill] && !parseInt(skill) && skill != "0"){ //FUCK THIS
                        userToSave.skills.push(skill)
                    }
                }
                UsersService.updateUserInfo(userToSave).then(
                    function(success){
                        console.log(success)
                    },
                    function(err){
                        console.log(err)
                    }).finally(function(){
                        $scope.isLoading = false;
                    })
            }
        }
    ]
);
