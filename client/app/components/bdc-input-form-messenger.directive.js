"use strict";

angular.module("bdc").directive("bdcInputFormMessenger",
    function(){
        return {
            restrict : 'E',
            scope : {
                'onStepValidate' : '=',
                'placeholder' : "@",
                'stepNumber' : "@"
            },
            'template' :'<input ng-if="!disabled" type="text" placeholder="{{placeholder}}" ng-model="input.content"/><div ng-if="disabled">{{input.content}}</div>',
            controller : ['$scope',function($scope){
                $scope.input = {
                    content : ""
                };
            }],
            link : function(scope, element, attrs) {
                element.bind("keydown keypress", function(event) {
                    if(event.which === 13) {
                        if(typeof scope.onStepValidate == 'function'){
                            scope.disabled = true;
                            scope.onStepValidate(scope.stepNumber,scope.input.content);
                        }
                        event.preventDefault();
                    }
                });
            }
        }
    });

