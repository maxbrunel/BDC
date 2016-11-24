"use strict";

angular.module("bdc").service('AuthService',
    ['$rootScope','$http',
        function($rootScope,$http){
            return {
                login : function(code){
                    if(code){
                        return $http.get('/api/auth/slack?code=' + code)
                    }
                },
                handleData : function(data){
                    $rootScope.context.user = data;
                },
                logout : function(){
                    //$http.post('https://slack.com/api/auth.revoke?token=' + $rootScope.context.user.access_token);
                    $rootScope.context.user = {};
                }
            }
    }]);
