
'use strict';

var app = angular.module('addTrainerApp', [
    require('angular-route'),

    require('./controllers/mainController').name,
    require('./controllers/trainerController').name,
    require('./controllers/statisticsController').name,
    require('./controllers/singleSessionController').name,
]);

app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            template: require('./views/trainer.html'),
            controller: 'trainerCtrl as vm'
        })
        .when('/statistic', {
            template: require('./views/sessions.html'),
            controller: 'statisticsController as vm',
        }).when('/statistic/:id', {
            template: require('./views/singleSession.html'),
            controller: 'singleSessionController as vm',
        });
});

module.exports = app;