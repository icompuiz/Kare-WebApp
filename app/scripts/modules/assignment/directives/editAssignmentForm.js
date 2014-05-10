'use strict';

angular.module('kareWebAppApp').directive('editAssignmentForm', ['$timeout', '$cookies', 'viewsUrl', 'partialsUrl',
	function ($timeout, $cookies, viewsUrl, partialsUrl) {
		return {
			restrict: 'EA',
			scope: {
				assignmentId: '='
			},
			templateUrl: viewsUrl + partialsUrl + '/assignment/directives/editAssignment.html',
			controller: ['$scope', '$http',
				function ($scope, $http) {

					$scope.title = 'Edit Assignment';
					$scope.subtitle = 'Modify this assignment.';

					$scope.assignment = {
						name: '',
						patients: [],
						exercises: []
					};

					$scope.$watch('assignmentId', function (newVal) {
						function getPatients(doneGettingPatients) {
							$http.get('/api/patients').success(function (data) {
								$scope.patientSource = data;
								doneGettingPatients();
							});

						}

						function getExercises(doneGettingExercises) {
							$http.get('/api/exercises').success(function (data) {
								$scope.exercisesSource = data;
								doneGettingExercises();

							});
						}

						function getAssignment(doneGettingAssignment) {
							$http.get('/api/assignments/' + newVal + '?populate=patient%20exercises').success(function (data) {
								$scope.assignment = data;
								doneGettingAssignment();
							});

						}

						async.series([getPatients, getExercises, getAssignment], function() {});

					});

					$scope.submit = function () {

						var assignment = _.clone($scope.assignment);

						assignment.patient = assignment.patient._id;

						assignment.exercises = _.map(assignment.exercises, function (exercise) {
							return exercise._id;
						});

						$http.put('/api/assignments/' + assignment._id, assignment).
						success(function (data, status, headers, config) {
							console.log(data);
							console.log("callback received success")
							$scope.addAlert('Assignment saved successfully', 'success', false);
						}).
						error(function (data, status, headers, config) {
							console.log(data);
							console.log("callback received failure")
							$scope.addAlert('Error while saving assignment', 'danger');
							for (var key in data.errors) {
								var error = data.errors[key];

								$scope.addAlert(error.message, 'danger', false);
							}

						});

						

					};

					$scope.dummyFilter = function () {

						return true;
					};

					$scope.filterAssignedExercises = function (exercise) {

						var arrayOfMatches = _.filter($scope.assignment.exercises, function (item) {
							var match = exercise._id === item._id
							
							if (match) {
								console.log('Excluding', item.name, 'from list');
							} else {
								console.log('Including', item.name, 'from list');
							}

							return match;
						});

						return arrayOfMatches.length === 0;

					};

					$scope.alerts = [];

					$scope.addAlert = function (msg, type, permanant) {
						$scope.alerts.push({
							msg: msg,
							type: type
						});

						var index = $scope.alerts.length - 1;

						if (!permanant) {
							$timeout(function () {

								$scope.closeAlert(index);

							}, 2000);
						}

					};

					$scope.closeAlert = function (index) {
						$scope.alerts.splice(index, 1);
					};

					if (undefined === $cookies.editAssignmentFormCookie) {
						$scope.addAlert('Welcome to the edit assignment view. This is where alerts will appear. Click the x to dismiss.', 'success', true);
						$cookies.editAssignmentFormCookie = true;

					}
				}
			],
			link: function (scope, element, attrs) {

				element.addClass('exercise-form');

			}
		}
	}
]);
