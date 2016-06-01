angular.module("bdc")
    .config(function($locationProvider){
        $locationProvider.html5Mode({
            enabled: true
        });
    })
    .config(function ($stateProvider) {
        $stateProvider.state("app",{
            templateUrl : "/app/header-footer/header-footer.html",
            abstract : true,
            controller : "ApplicationController"
        })
            .state('app.home',{
                templateUrl : "/app/home/home.html",
                url : "/"
            })

            .state('app.designers',{
                templateUrl : "/app/designers/designers.html",
                url : "/designers"
            })

            .state('app.deals',{
                templateUrl : "/app/deals/deals.html",
                url : "/deals"
            })
            .state('app.auth',{
                templateUrl : "/app/auth/auth.html",
                url : "/auth?code",
                controller : "AuthController"
            })
    })
    .run(function ($rootScope, $state, $timeout,$location,$anchorScroll) {
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            $timeout(function() {twemoji.parse(document.body, {
                callback: function(icon, options, variant) {
                    switch ( icon ) {
                        case 'a9':      // © copyright
                        case 'ae':      // ® registered trademark
                        case '2122':    // ™ trademark
                            return false;
                    }
                    return ''.concat(options.base, options.size, '/', icon, options.ext);
                    }
            })},100);

            // Scroll top on change state
            $anchorScroll('top');

        });

        $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
            if(toState.name === 'app.deals' && !$rootScope.context.user.ok){
                $state.go('app.auth');
            }
            console.log(toState,$rootScope.context.user.ok);
        });
        $rootScope.context = {
            user : {}
        };
    });