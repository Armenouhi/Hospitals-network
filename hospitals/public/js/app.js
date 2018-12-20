'use strict';

// var angular = require('angular');
// var angularUiRouter = require('angular-ui-router');
// var uiRouter = require('@uirouter/angularjs');

// var dependencies = [uiRouter];

// angular.injector(modules);

var app = angular.module('meanApp', ["ngRoute", 'dx'
     // 'ngAnimate',
    // 'ngCookies',
    // 'ngMessages',
    // 'ngResource',
    // 'ngSanitize',
    // 'ngTouch',
    //  'ui.bootstrap',
    // 'colorpicker.module',
    // 'ui.router'
]);
app.config(function($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'view/home.html',
        })
        .when('/centre', {
            templateUrl: 'view/centre.html',
        })
        .when('/centres', {
            templateUrl: 'view/centres.html',
        })
        .when('/info', {
            templateUrl: 'view/info.html',
        })
        .when('/expert', {
            templateUrl: 'view/expert.html',
        })
        .when('/patient', {
            templateUrl: 'view/patient.html',
        })
        .when('/director', {
            templateUrl: 'view/director.html',
        })
        .when('/calendar', {
            templateUrl: 'view/calendar.html',
        })
        .when('/dashboard', {
            templateUrl: 'view/dashboard.html',
        })
        .when('/example', {
            templateUrl: 'view/tui.calendar-master/examples/example.html',
        })


});

