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

            .state('app.deals',{
                templateUrl : "/app/deals/deals.html",
                url : "/deals"
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
        //$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        //
        //});
    });

angular.module('bdc').controller('HomeCtrl', ['$scope', 'SweetAlert', function($scope, SweetAlert) {
    
    $scope.theme = function() {
        SweetAlert.swal({
        title: "Custom Slack Theme",
        html: 'Copie le code suivant et colle le dans les préférences de Slack <br />' +
        '<input type="text" value="#0F34D2,#0C2BB2,#FFFFFF,#0F34D2,#5E76E0,#FFFFFF,#FFFFFF,#EB4D5C" readonly="readonly" class="code">',
        confirmButtonColor: '#0F34D2',
        type: 'success'
        });
    };
}]);