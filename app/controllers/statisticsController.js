'use strict';

var mainController = angular.module('addTrainerApp/controllers/statisticsController', [
    require('../services/sessionsServices').name
]);

mainController.controller('statisticsController', ['$rootScope', '$scope', 'sessionsStorage',
    function($rootScope, $scope, sessionsStorage) {
        var vm = this;

        vm.sessions = {};

        vm.init = function () {
            vm.sessions = sessionsStorage.sessions;
            console.log(vm.sessions);
        };

        vm.init();
        return vm;
    }
]);

module.exports = mainController;