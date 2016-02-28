'use strict';

var Tock = require('../libs/Tock');

var clock = angular.module('addTrainer/directives/clock', [

]);

clock.directive('clock', function(){
    return {
        restrict: 'E',
        template: '<span class="trainer-clock">{{ timing }}</span>',
        scope: {
            'lap': '=',
            'restart': '=',
            'start': '=',
            'stop': '=',
        },

        controller: function($scope, $timeout) {


            $scope.timing = '00:00:00';

            $scope.theClock = new Tock({
                callback: updateTime
            });

            function updateTime() {
                $timeout(function(){
                    $scope.timing = $scope.theClock.msToTime($scope.theClock.lap());
                }, 0);
            }

            $scope.lap = function() {
                return $scope.theClock.msToTime($scope.theClock.lap());
            };

            $scope.start = function() {
                $scope.theClock.start();
            };

            $scope.restart = function() {
                $scope.theClock.reset();
                $scope.start();
            };

            $scope.stop = function() {
                $scope.theClock.stop();
            };

        }
    }
});

module.exports = clock;