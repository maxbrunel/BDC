"use strict";

angular.module("bdc").controller("AuthController",
    ["$rootScope","$stateParams","$scope",'AuthService','CONFIG','$state',
        function($rootScope,$stateParams,$scope,AuthService,CONFIG,$state){
            if($stateParams.code){
                console.log('Code + :' +  $stateParams.code);
                AuthService.login($stateParams.code).then(
                    function(success){
                        if(success.data.ok){
                            if(success.data.team.id != CONFIG.teamID){
                                console.log('BAD TEAM');
                                AuthService.logout();
                            }

                            AuthService.handleData(success.data);
                            console.log($rootScope.context.user);
                            $state.go('app.deals');

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

