'use strict';

var focusInput = angular.module('addTrainerApp/directives/inputFocus', [

]);

focusInput.directive('inputFocus', function($timeout, $parse) {
    return {
        link: function(scope, element, attrs) {
            var model = $parse(attrs.inputFocus);

            scope.$watch(model, function(value) {
                if(value === true) {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            });

            element.bind('blur', function() {
                scope.$apply(model.assign(scope, false));
            });
        }
    };
});

module.exports = focusInput;