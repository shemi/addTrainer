'use strict';

var autoSave = angular.module('addTrainer/directives/autoSave', [

]);

autoSave.directive('autoCheck', function(){
    return {
        restrict: 'A',
        scope: {
            'autoCheck': '=',
            'duration': '@?'
        },

        controller: function($scope, $timeout, $element) {

            var timer = null;

            $scope.duration = $scope.duration || 750;
            
            console.log($element);
            
            $element.bind('keyup', function(){

                if(timer) {
                    $timeout.cancel(timer);
                }

                timer = $timeout(function(){
                    $scope.autoCheck();
                }, $scope.duration)

            });
        }
    }
});

module.exports = autoSave;