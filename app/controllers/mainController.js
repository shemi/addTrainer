'use strict';

var mainController = angular.module('addTrainerApp/controllers/mainCController', [

]);

mainController.controller('mainCtrl', ['$rootScope', '$scope',
    function($rootScope, $scope) {
        var vm = this;

        vm.init = function () {

        };

        vm.init();
        return vm;
    }
]);

module.exports = mainController;