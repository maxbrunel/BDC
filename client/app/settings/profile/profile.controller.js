"use strict";



angular.module("bdc").controller("ProfileController",
    ["$rootScope","$scope",'UsersService',"SKILLS",
        function($rootScope,$scope,UsersService, SKILLS) {
            $scope.availableSkills = SKILLS.availableSkills;
            $scope.isLoading = true;
            UsersService.getUserInfo($rootScope.context.user.user.email).then(function(success){
                var user = success.data;
                user.skills.forEach(function(skill){
                    user.skills[skill.trim()] = true;
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
