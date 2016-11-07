angular.module("bdc")
    .config(function($locationProvider){
        $locationProvider.html5Mode({
            enabled: true
        });
    })
    .config(function($urlRouterProvider){
        $urlRouterProvider.otherwise('/404');
    })
    .config(function ($stateProvider) {
        $stateProvider.state("app",{
            templateUrl : "/app/header-footer/header-footer.html",
            abstract : true,
            controller : "ApplicationController"
        })
            .state('app.home',{
                templateUrl : "/app/home/home.html",
                url : "/",
                controller : "HomeController"
            })

            .state('app.about',{
                templateUrl : "/app/about/about.html",
                url : "/about"
            })

            .state('app.designers',{
                templateUrl : "/app/designers/designers.html",
                url : "/designers",
                controller : 'DesignersController'
            })
            .state('app.partners',{
                templateUrl : "/app/partners/partners.html",
                url : "/partners"
            })
            .state('app.settings',{
                templateUrl : "/app/settings/settings.html",
                abstract: true,
                url : "/settings"
            })
                .state('app.settings.deals',{
                    templateUrl : "/app/settings/deals/deals.html",
                    url : "/deals"
                })
                .state('app.settings.profile',{
                    templateUrl : "/app/settings/profile/profile.html",
                    url : "/profile",
                    controller : 'ProfileController'
                })
                .state('app.settings.events',{
                    templateUrl : "/app/settings/events/events.html",
                    abstract: true,
                    url : "/events"
                })
                    .state('app.settings.events.upcoming',{
                        templateUrl : "/app/settings/events/upcoming/upcoming.html",
                        url : "/upcoming"
                    })
                    .state('app.settings.events.created',{
                        templateUrl : "/app/settings/events/created/created.html",
                        url : "/created"
                    })
                    .state('app.settings.events.new',{
                        templateUrl : "/app/settings/events/new/new.html",
                        url : "/new"
                    })
            .state('app.404',{
                templateUrl : "/app/404/404.html",
                url : "/404"
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
            if(toState.name.indexOf('app.settings') != -1 && !$rootScope.context.user.ok){
                $state.go('app.auth');
            }
            //console.log(toState,$rootScope.context.user.ok);
        });
        $rootScope.context = {
            user : {}
        };
    });
