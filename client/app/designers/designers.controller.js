"use strict";



angular.module("bdc").controller("DesignersController",
    ["$rootScope","$scope",'UsersService',
        function($rootScope,$scope,UsersService){
            $scope.users = [];
            var usersBackup = [];
            $scope.filteredSkills = [];
            $scope.searchUser = {};
            $scope.workAvailability = false;
            $scope.filterOnWork = function(){
                if($scope.searchUser.workAvailability){
                    $scope.searchUser.workAvailability = "";
                    $scope.workAvailability = false;
                } else {
                    $scope.searchUser.workAvailability = true;
                    $scope.workAvailability = true;
                }
                //console.log($scope.searchUser);
            };

            $scope.skills = ['UI','UX','Motion-Design', 'Photographie','Illustration','Typographie', 'Front-end'];

            $scope.filterOn = function(index){
                if(index || index == 0){
                    $scope.filteredSkills[index] = !$scope.filteredSkills[index];
                }
                var filteredSkillsArray = [];
                $scope.skills.forEach(function(item,index){
                    if($scope.filteredSkills[index]){
                        filteredSkillsArray.push(item)
                    }
                });
                if(filteredSkillsArray.length == 0){
                    $scope.users = usersBackup;
                } else {
                    var users = [];
                    usersBackup.forEach(function(user){
                        if(checkSkills(user.skills,filteredSkillsArray)){
                            users.push(user)
                        }
                    });
                    $scope.users = users;
                }
                //console.log($scope.users)
            };
            var checkSkills = function(skills,filteredSkillsArray){
                var bool = true;
                var localSkills = angular.copy(skills);
                var localFilteredSkills = angular.copy(filteredSkillsArray);
                localSkills = localSkills.map(function(x){return x.replace(" ","").toUpperCase()});
                localFilteredSkills = localFilteredSkills.map(function(x){return x.replace(" ","").toUpperCase()});
                //console.log(localSkills,localFilteredSkills);
                localFilteredSkills.forEach(function(filterSkill){
                    if(localSkills.indexOf(filterSkill) < 0){
                        bool = false;
                    }
                    //console.log(filterSkill,bool)
                });
                return bool;
            };
            var shuffleArray = function(array) {
                var m = array.length, t, i;

                // While there remain elements to shuffle
                while (m) {
                    // Pick a remaining element…
                    i = Math.floor(Math.random() * m--);

                    // And swap it with the current element.
                    t = array[m];
                    array[m] = array[i];
                    array[i] = t;
                }

                return array;
            }
            UsersService.getAll().then(function(response){
                //console.log(response.data);
                var users = angular.copy(response.data);
                users = shuffleArray(users);
                usersBackup = angular.copy(users);
                $scope.users = users;
            });

        }]);
