'use strict';

var trainerController = angular.module('addTrainerApp/controllers/trainerController', [
    require('../services/trainerService').name,

    require('../directives/clock').name,
    require('../directives/focusInput').name,
    require('../directives/autoSave').name,
    require('../directives/alert').name,
]);

trainerController.controller('trainerCtrl', ['$rootScope', '$scope', 'exerciseFactory', 'trainerSessionService',
    function($rootScope, $scope, exerciseFactory, trainerSessionService) {
        var vm = this;

        vm.sessionStarts = false;
        vm.focusInput = false;
        vm.firstNum = null;
        vm.lastNum = null;
        vm.operator = null;

        vm.init = function () {
            vm.setMath();
            vm.statistics = trainerSessionService.statistics;
        };

        vm.setMath = function() {
            var exercise = exerciseFactory.getNew();
            vm.firstNum = exercise[0];
            vm.operator = exercise[1];
            vm.lastNum = exercise[2];
        };

        vm.startSession = function() {
            trainerSessionService.start();
            vm.setMath();
            vm.startClock();
            vm.sessionStarts = true;
            vm.focusInput = true;
        };

        vm.stopSession = function() {
            vm.sessionStarts = false;
            vm.clockStop();
        };

        vm.onSubmit = function() {
            var pass = exerciseFactory.test(vm.userAnswer),
                reason = pass ? 'passes' : 'fails';

            if(pass) {
                vm.showAlert('success', 'Good Job :)');
            } else {
                vm.showAlert('danger', 'The correct answer is: ' + exerciseFactory.correctAns);
            }

            resetExercise(pass, reason);
        };

        vm.skip = function() {
            resetExercise(false, 'skips');
        };

        function resetExercise(pass, reason) {
            trainerSessionService.add(vm.userAnswer, pass, vm.clockLap(), reason);
            vm.userAnswer = '';
            vm.setMath();
            vm.clockRestart();
            vm.focusInput = true;
        }

        vm.init();
        return vm;
    }
]);

module.exports = trainerController;