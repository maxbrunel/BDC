"use strict";

angular.module("bdc").directive("bdcInputFormMessenger",
    function(){
        return {
            restrict : 'E',
            scope : {
                'onStepValidate' : '=',
                'placeholder' : "@",
                'stepNumber' : "@",
                'checkStep' : '=',
                'tips' : '=',
                'message' : '=',
                'class' : '='
            },
            'template' :'<input ng-if="!disabled" type="text" placeholder="{{placeholder}}" ng-model="input.content"/><div ng-if="disabled" class="{{class}}">{{input.content}}</div>',
            controller : ['$scope','$compile','$element','$sanitize','$timeout',function($scope,$compile,$element,$sanitize,$timeout){
                $scope.glued = true;        // Autoscroll for new messages
                $scope.input = {
                    content : ""
                };
                $scope.add = function () {
                    $scope.retryMessage = angular.copy($scope.message);
                    $scope.retryMessage.questions = [];
                    $scope.retryMessage.questions.push("Oups je n'ai pas compris");
                    $scope.retryMessage.questions.push($scope.message.tips);
                    var el = $compile('<bdc-form-messenger message="retryMessage" call-back="onStepValidate"></bdc-form-messenger>')( $scope );
                    $element.parent().parent().parent().append(el);
                };

                $scope.focusInput = function(elementThis){
                    $timeout(function(){
                        elementThis.children().context.childNodes[1].focus();
                    })
                }
            }],
            link : function(scope, element, attrs) {
                if(typeof scope.checkStep != 'function'){
                    scope.checkStep = function(){return true;}
                }

                scope.focusInput(element);

                element.bind("keydown keypress", function(event) {
                    if(event.which === 13) {
                        if(scope.checkStep(scope.input.content)){
                            if(typeof scope.onStepValidate == 'function'){
                                scope.disabled = true;
                                scope.onStepValidate(scope.stepNumber,scope.input.content);
                            }
                        } else {
                            scope.disabled = true;
                            scope.add();
                        }
                        event.preventDefault();
                    }
                });
            }
        }
    });

