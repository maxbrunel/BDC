"use strict";

angular.module("bdc").service('SkillService',
    ['$rootScope','SKILLS',
        function($rootScope,SKILLS){
            var capitalizeAndLowerCase = function(string){
                if(string){
                    return string[0].toUpperCase() + string.slice(1).toLowerCase();
                }
                return "";
            };

            var sanitizeSkills = function(skills){
                return skills.map(function(skill){
                    var newSkill = skill.trim().toUpperCase();
                    if(newSkill == "UI" || newSkill == "UX" || skill == "3D"){
                        return newSkill;
                    } else {
                        return capitalizeAndLowerCase(newSkill)
                    }
                });
            };

            var getDisplayedSkills = function(){
                return sanitizeSkills(SKILLS.availableSkills)
            };

            var isUserHaveSkills = function(skills, user) {
                var bool = true;
                if(Array.isArray(skills)){
                    var skillsToCheck = sanitizeSkills(skills);
                    var userSkills = sanitizeSkills(user.skills);
                    skillsToCheck.forEach(function(filterSkill){
                        if(userSkills.indexOf(filterSkill) < 0){
                            bool = false;
                        }
                    });
                    return bool;
                } else {
                    return false;
                }
            };


            var checkSkillsBeforeSave = function(skills){
                if(skills.length < 2){
                    return false;
                }
                var skillsToCheck =  sanitizeSkills(skills);
                var boolean = true;
                skillsToCheck.forEach(function(skill){
                    if(getDisplayedSkills().indexOf(skill) < 0){
                        boolean = false;
                    }
                });
                return boolean && !(skillsToCheck.slice().sort()[0] == skillsToCheck.slice().sort()[1]);
            };

            return {
                sanitizeSkills: sanitizeSkills,
                isUserHaveSkills : isUserHaveSkills,
                getDisplayedSkills : getDisplayedSkills,
                checkSkillsBeforeSave : checkSkillsBeforeSave
            }
        }]);
