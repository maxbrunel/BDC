"use strict";

angular.module("bdc").directive("bdcFormMessenger",
    function(){
        return {
            restrict : 'E',
            scope : {
                'message' : '=',
                'callBack' : '='
            },
            'templateUrl' :'/app/components/bdc-form-messenger.html',
            controller : ['$scope','$timeout','$sanitize',function($scope,$timeout,$sanitize){
                $scope.messageList = [];
                $scope.questionsAsked = false;


                $scope.setLoadingTimeOut =function(question,index){
                    $timeout(function(){
                        question.loading = false;
                        if(index == $scope.message.questions.length - 1){
                            $timeout(function(){
                                $scope.questionsAsked = true;
                                if($scope.message.finalStep){
                                    $scope.callBack();
                                }
                            },400);
                        }
                    },1000 * (index + 1));
                };

                $scope.pushQuestionInList = function(question,index){
                    $timeout(function(){
                        $timeout(function(){
                            $scope.messageList.push(question);
                            $scope.setLoadingTimeOut(question,index);
                        },500 * index)
                    },(1000  + $scope.message.questions.length * 150) * index)
                };

                $scope.parseEmoji = function(string){
                    return $sanitize(twemoji.parse(string));
                }

            }],
            link : function(scope, element, attrs) {
                scope.message.questions.forEach(function(questionContent,index){
                    var question = {
                        content : angular.copy(questionContent),
                        loading : true
                    };
                    scope.pushQuestionInList(question,index);
                });
            }
        }
    });

