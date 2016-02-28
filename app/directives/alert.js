'use strict';

var alert = angular.module('addTrainer/directives/alert', []);

alert.directive('alert', function () {
    return {
        restrict: 'E',
        template: '<div class="alert fade" role="alert">{{ msg }}</div>',
        scope   : {
            'show': '='
        },

        controller: function ($scope, $timeout, $element) {

            $element = $element.find('.alert');

            var timer       = null;
            var lastType    = null;
            $scope.duration = $scope.duration || 1500;
            $scope.type     = null;
            $scope.msg      = '';

            $scope.show = showAlert;

            function showAlert(type, msg) {

                $scope.type = type;
                $scope.msg  = msg;

                if (timer) {
                    $timeout.cancel(timer);
                }

                $element.addClass('alert-' + $scope.type).addClass('in');
                lastType    = $scope.type;

                timer = $timeout(function () {
                    $element.removeClass('in');
                    if (lastType) {
                        $element.removeClass('alert-' + lastType);
                    }
                }, $scope.duration);

            }

        }
    }
});

module.exports = alert;