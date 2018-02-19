'use strict';

/**
 * @ngdoc overview
 * @name temisApp
 * @description
 * # temisApp
 *
 * Main module of the application.
 */
angular
  .module('temisApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/module', {
        templateUrl: 'views/module.html',
        controller: 'ModuleCtrl',
        controllerAs: 'module'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
