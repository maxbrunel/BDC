"use strict";

angular.module("bdc").controller("AuthController",
    ["$rootScope","$stateParams","$scope",'AuthService','CONFIG',
        function($rootScope,$stateParams,$scope,AuthService,CONFIG){
            if($stateParams.code){
                console.log('Code + :' +  $stateParams.code);
                AuthService.login($stateParams.code).then(
                    function(success){
                        if(success.data.ok){
                            AuthService.handleData(success.data);
                            console.log($rootScope.context.user);
                            if(success.data.team.id != CONFIG.teamID){
                                console.log('BAD TEAM');
                                AuthService.logout();
                            }

                        } else {
                            console.log('Error login')
                        }
                    },
                    function(error){
                        console.log(error)
                    }
                )
            }

            $scope.logout = function(){
                AuthService.logout();
            }
        }]);

