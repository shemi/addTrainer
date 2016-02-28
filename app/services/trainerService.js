
'use strict';

var trainerService = angular.module('addTrainerApp/services/trainerServices', [
    require('./sessionsServices').name
]);

trainerService.factory('exerciseFactory', function() {
    var _this = {};

    _this.allOperators = ['*', '/', '/', '+', '/', '*', '+', '-', '*', '+', '-']
    _this.correctAns = null;
    _this.firstNum = null;
    _this.lastNum = null;
    _this.operator = null;

    //functions
    _this.prepareMath = prepareMath;
    _this.test = test;
    _this.getNew = getMath;
    _this.get = getCurrent;

    return _this;

    function getMath() {
        prepareMath();

        return getCurrent();
    }

    function getCurrent() {
        return [_this.firstNum, _this.operator, _this.lastNum];
    }

    function prepareMath() {
        _this.operator = _this.allOperators[generateRandom(_this.allOperators.length - 1)];


        switch (_this.operator) {

            case '*':
                _this.firstNum = generateRandom(12);
                _this.lastNum = generateRandom(12);
                break;

            case '/':
                var numbers = [generateRandom(12), generateRandom(12)];
                var total = numbers[0] * numbers[1];
                _this.firstNum = total;
                _this.lastNum = numbers[generateRandom(1)];
                break;

            default :
                _this.firstNum = generateRandom(100);
                _this.lastNum = generateRandom(100);
                break;

        }

    }

    function test(userAnswer) {
        _this.correctAns = eval(_this.firstNum + _this.operator + _this.lastNum);

        return userAnswer == _this.correctAns;
    }

    function generateRandom(to) {
        to = to || 100;
        var from = 0;
        return Math.floor(Math.random() * to) + from;
    }
});


trainerService.service('trainerSessionService', function(exerciseFactory, sessionsStorage) {

    var _this = this;

    _this.id = null;

    _this.statistics = {
        skips: 0,
        passes: 0,
        fails: 0,
        total: 0
    };

    _this.exercises = [];

    _this.increase = increaseStatistic;
    _this.add = addExercise;
    _this.start = startRestartSession;
    _this.save = saveSession;

    return _this;


    function startRestartSession() {

        _this.statistics['skips'] = 0;
        _this.statistics['passes'] = 0;
        _this.statistics['fails'] = 0;
        _this.statistics['total'] = 0;

        _this.exercises = [];

        _this.id = new Date().getTime();
    }

    function increaseStatistic(key) {
        _this.statistics[key] = _this.statistics[key] + 1;
    }

    function addExercise(userAnswer, pass, time, reason) {
        _this.increase(reason);
        _this.exercises.push({
            exercise: exerciseFactory.get(),
            userAnswer: userAnswer,
            pass: pass,
            time: time,
            reason: reason,
        });
        _this.statistics.total = _this.exercises.length;
        _this.save();
    }

    function saveSession() {
        if(! _this.id && _this.statistics['total'] != 0) {
            return;
        }

        sessionsStorage.add({
            'id': _this.id,
            'statistics': _this.statistics,
            'exercises': _this.exercises
        });


    }

});

module.exports = trainerService;