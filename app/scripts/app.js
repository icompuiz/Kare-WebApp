'use strict';

angular
  .module('kareWebAppApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap'
  ])
  .value('viewsUrl', 'views/')
  .value('partialsUrl', 'partials/')
  .config(function ($routeProvider) {

    var views = 'views/';
    var partials = views + 'partials/';
   $routeProvider
      .when('/404', {
        templateUrl: views + '404.html'
      })
      .when('/', {
        templateUrl: partials + '/home/home.html',
        controller: 'HomeCtrl'
      })
      .when('/exercise', {
        templateUrl: partials + 'exercise/list.html',
        controller: 'ExerciseCtrl'
      })
      .when('/exercise/new', {
        templateUrl: partials + 'exercise/create.html',
        controller: 'ExerciseCtrl'
      })
      .when('/exercise/edit/:exerciseId', {
        templateUrl: partials + 'exercise/edit.html',
        controller: 'ExerciseCtrl'
      })
      .when('/patient', {
        templateUrl: partials + 'patient/list.html',
        controller: 'PatientCtrl'
      })
      .when('/patient/new', {
        templateUrl: partials + 'patient/create.html',
        controller: 'PatientCtrl'
      })
      .when('/patient/edit/:patientId', {
        templateUrl: partials + 'patient/edit.html',
        controller: 'PatientCtrl'
      })

      .when('/assignment', {
        templateUrl: partials + 'assignment/list.html',
        controller: 'AssignmentCtrl'
      })
      .when('/assignment/new', {
        templateUrl: partials + 'assignment/create.html',
        controller: 'AssignmentCtrl'
      })
      .when('/assignment/edit/:assignmentId', {
        templateUrl: partials + 'assignment/edit.html',
        controller: 'AssignmentCtrl'
      })

      .when('/submission', {
        templateUrl: partials + 'submission/patientList.html',
        controller: 'SubmissionCtrl'
      })

      .when('/submission/:patientId', {
        templateUrl: partials + 'submission/assignmentList.html',
        controller: 'SubmissionCtrl'
      })

      .when('/submission/:patientId/:assignmentId', {
        templateUrl: partials + 'submission/completeAssignment.html',
        controller: 'SubmissionCtrl'
      })

      .otherwise({
        redirectTo: '/404'
      });
  }).run(['$rootScope', '$location','$route','$interval',
    function($rootScope, $location, $route, $interval) {


      var search = $location.search();

      if ("true" === search.autoreload) {

        var interval = parseInt(search.interval);

        if (!interval || interval < 1000) {
          interval = 1000;
        }

        $interval(function() {

          console.log('Refreshing the page!');
          location.reload();

        }, interval);

      }
      

    }
  ]);
