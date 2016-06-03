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
            controller : ['$scope','$timeout',function($scope,$timeout){
                $scope.messageList = [];
                $scope.questionsAsked = false;


                $scope.setLoadingTimeOut =function(question,index){
                    $timeout(function(){
                        question.loading = false;
                        if(index == $scope.message.questions.length - 1){
                            $scope.questionsAsked = true;
                        }
                    },1500 * (index + 1));
                };

                $scope.pushQuestionInList = function(question,index){
                    $timeout(function(){
                        $timeout(function(){
                            $scope.messageList.push(question);
                            $scope.setLoadingTimeOut(question,index);
                        },500 * index)
                    },1500 * index)
                }

            }],
            link : function(scope, element, attrs) {
                scope.message.questions.forEach(function(questionContent,index){
                    var question = {
                        content : angular.copy(questionContent),
                        loading : true
                    };
                    scope.pushQuestionInList(question,index);
                })
            }
        }
    });

