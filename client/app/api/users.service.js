"use strict";

angular.module("bdc").service('UsersService',
    ['$rootScope','$http',
        function($rootScope,$http){
            var rootUrl = "/api/users";
            return {
                getAll : function(){
                    return $http.get(rootUrl + '/all')
                },
                createUser : function(user){
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
                    return $http.post(rootUrl + "/user/" + user.email,user,{
                        headers :{
                            Authorization : "Bearer " + $rootScope.context.user.access_token
                        }
                    })
                }
            }
        }]);
