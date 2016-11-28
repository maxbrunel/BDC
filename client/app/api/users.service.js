"use strict";

angular.module("bdc").service('UsersService',
    ['$rootScope','$http',"SkillService",
        function($rootScope,$http,SkillService){
            var rootUrl = "/api/users";
            return {
                getAll : function(){
                    return $http.get(rootUrl + '/all')
                },
                createUser : function(user){
                    user.skills = SkillService.sanitizeSkills(user.skills);
                    return $http.post(rootUrl + '/create',user)
                },
                checkIfEmailExists : function(email){
                    return $http.get(rootUrl + "/user/exists/" + email)
                },
                getUserInfo : function (email) {
                    return $http.get(rootUrl + "/user/" + email,{
                        headers :{
                            Authorization : "Bearer " + $rootScope.context.user.access_token
                        }
                    })
                },
                updateUserInfo : function (user) {
                    user.skills = SkillService.sanitizeSkills(user.skills);
                    return $http.post(rootUrl + "/user/" + user.email,user,{
                        headers :{
                            Authorization : "Bearer " + $rootScope.context.user.access_token
                        }
                    })
                }
            }
        }]);
