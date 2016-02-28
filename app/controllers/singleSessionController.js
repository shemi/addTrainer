'use strict';

var mainController = angular.module('addTrainerApp/controllers/singleSessionController', [
    require('../services/sessionsServices').name
]);

mainController.controller('singleSessionController', ['$rootScope', '$scope', 'sessionsStorage', '$routeParams',
    function($rootScope, $scope, sessionsStorage, $routeParams) {
        var vm = this;

        vm.sessions = {};

        vm.init = function () {
            vm.session = sessionsStorage.sessions[$routeParams.id];
            vm.statistics = vm.session.statistics;
            console.log(vm.session);
        };


        vm.formatExercise = function(exercise) {
            return exercise[0] + exercise[1] + exercise[2]
        };

        vm.checkAns = function(exercise) {
            var ex = vm.formatExercise(exercise);
            return eval(ex);
        };


        vm.init();
        return vm;
    }
]);

module.exports = mainController;