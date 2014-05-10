'use strict';

angular.module('kareWebAppApp').directive('newAssignmentForm', ['$timeout', '$cookies', '$location', 'viewsUrl', 'partialsUrl',
	function ($timeout, $cookies, $location, viewsUrl, partialsUrl) {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: viewsUrl + partialsUrl + '/assignment/directives/assignment.html',
			controller: ['$scope', '$http',
				function ($scope, $http) {

					$scope.title = 'Create Assignment';
					$scope.subtitle = 'Create a new assignment that can be added to assignments later';

					$scope.assignment = {
						name: '',
						patients: [],
						exercises: []
					};

					var search = $location.search();
					var prepopulate = false;
					if (search.populate === 'true') {

						var prepopulate = true;
						$scope.assignment = {
							name: 'Patient\'s Initial Assesment',
							patients: [],
							exercises: []
						};
					}

					$http.get('/api/patients').success(function (data) {
						$scope.patientSource = data;

						if (prepopulate) {
							if (data.length > 0) {
								$scope.assignment.patients.push($scope.patientSource[0]);
								$scope.patientSource.splice(0, 1);
							}
						}
					});

					$http.get('/api/exercises').success(function (data) {
						$scope.exercisesSource = data;
						if (prepopulate) {
							if (data.length > 0) {
								$scope.assignment.exercises.push($scope.exercisesSource[0]);
								$scope.exercisesSource.splice(0, 1);
							}
						}
					});

					$scope.submit = function () {

						if ($scope.assignment.patients.length === 0) {
							return $scope.addAlert("Please select a patient", "danger");
						}

						async.each($scope.assignment.patients, function (patient, processNextPatient) {

							var assignment = _.clone($scope.assignment);
							delete assignment.patitents;
							assignment.patient = patient._id;

							assignment.exercises = _.map(assignment.exercises, function (exercise) {
								return exercise._id;
							});

							$http.post('/api/assignments', assignment).
							success(function (data, status, headers, config) {
								console.log(data);
								console.log("callback received success")
								$scope.addAlert('Assignment saved successfully', 'success', false, processNextPatient);
							}).
							error(function (data, status, headers, config) {
								console.log(data);
								console.log("callback received failure")
								$scope.addAlert('Error while saving assignment', 'danger');
								for (var key in data.errors) {
									var error = data.errors[key];

									processNextPatient(error.message);
								}

							});
						}, function (err) {
							if (err) {
								return $scope.addAlert(err, 'danger', false);
							}
							$location.path('/assignment');
						});


					};

					$scope.dummyFilter = function (patient) {

						return true;
					};

					$scope.filterAssignedPatients = function (patient) {

						var arrayOfMatches = _.filter($scope.assignment.patients, function (item) {
							var match = patient._id === item._id

							if (match) {
								console.log('Excluding', item.name, 'from list');
							} else {
								console.log('Including', item.name, 'from list');
							}

							return match;
						});

						return arrayOfMatches.length === 0;

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

					$scope.addAlert = function (msg, type, permanant, callback) {
						$scope.alerts.push({
							msg: msg,
							type: type
						});

						var index = $scope.alerts.length - 1;

						if (!permanant) {
							$timeout(function () {

								$scope.closeAlert(index);

								if (callback) {
									callback();
								}

							}, 2000);
						}

					};

					$scope.closeAlert = function (index) {
						$scope.alerts.splice(index, 1);
					};

					if (undefined === $cookies.newAssignmentFormCookie) {
						$scope.addAlert('Welcome to the new assignment view. This is where alerts will appear. Click the x to dismiss.', 'success', true);
						$cookies.newAssignmentFormCookie = true;

					}
				}
			],
			link: function (scope, element, attrs) {

				element.addClass('exercise-form');

			}
		}
	}
]);
