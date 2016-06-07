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
                getUserByMail : function(email){
                    return $http.get(rootUrl + "/user?email=" + email)
                }
            }
        }]);
