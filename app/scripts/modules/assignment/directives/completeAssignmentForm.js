'use strict';

angular.module('kareWebAppApp').directive('completeAssignmentForm', ['$timeout', '$cookies', '$location', '$modal', 'viewsUrl', 'partialsUrl',
	function($timeout, $cookies, $location, $modal, viewsUrl, partialsUrl) {
		return {
			restrict: 'EA',
			scope: {
				assignmentId: '='
			},
			templateUrl: viewsUrl + partialsUrl + '/assignment/directives/completeAssignment.html',
			controller: ['$scope', '$http',
				function($scope, $http) {

					$scope.title = 'Complete Assignment';
					$scope.subtitle = 'Go through each exercise and perform the actions described.';

					$scope.assignment = {
						name: '',
						patient: [],
						exercises: []
					};

					$scope.$watch('assignmentId', function(newVal) {

						function populateQuzzes(donePopulatingQuizzes) {

							async.each($scope.assignment.exercises, function(exercise, populateNext) {

								$http.get('/api/exercises/' + exercise._id + '?populate=quiz').success(function(data) {
									exercise.quiz = data.quiz;
									populateNext();
								});


							}, donePopulatingQuizzes);

						}

						function populateSubmissions(donePopulatingSubmissions) {


							async.each($scope.assignment.exercises, function(exercise, populateNext) {

								$http.get('/api/submissions?assignment=' + $scope.assignment._id + '&quiz=' + exercise.quiz._id).success(function(data) {
									console.log(data);
									_.each(data, function(submission) {

										_.each(submission.responses, function(response) {

											var found = _.find(exercise.quiz.questions, {
												_id: response.question
											});

											if (found) {
												found.value = response.value;
											}
										});

									});

									populateNext();

								});


							}, donePopulatingSubmissions);


						}

						function getAssignment(doneGettingAssignment) {
							$http.get('/api/assignments/' + newVal + '?populate=patient%20exercises').success(function(data) {
								$scope.assignment = data;
								doneGettingAssignment();
							});

						}

						async.series([getAssignment, populateQuzzes, populateSubmissions], function() {});

					});

					$scope.isComplete = function(exercise) {

						var isComplete = true;

						_.each(exercise.quiz.questions, function(question) {

							if (!question.value) {
								isComplete = false;
							}

						});

						return isComplete;

					};

					$scope.submit = function() {

						console.log($scope.assignment);

						async.each($scope.assignment.exercises, function(exercise) {

							var submission = {
								_id: exercise.submission,
								assignment: $scope.assignment._id,
								quiz: exercise.quiz._id,
								responses: []
							};

							submission.responses = _.map(exercise.quiz.questions, function(question) {

								var response = {
									question: question._id,
									value: question.value
								};

								return response;

							});

							if (submission._id) {
								$http.put('/api/assignments/' + $scope.assignment._id + '/submissions', submission).success(function(data) {
									$scope.addAlert('Assignment submitted successfully', 'success');
									// $scope.assignment = data;
									console.log(data);

									exercise.submission = data._id;
								}).error(function(data) {
									console.log(data);
									console.log("callback received failure")
									$scope.addAlert('Error while submitting assignment', 'danger');
									for (var key in data.errors) {
										var error = data.errors[key];

										$scope.addAlert(error.message, 'danger', false);
									}
								});
							} else {
								$http.post('/api/assignments/' + $scope.assignment._id + '/submissions', submission).success(function(data) {
									$scope.addAlert('Assignment submitted successfully', 'success');
									console.log(data);

									exercise.submission = data._id;

								}).error(function(data) {
									console.log(data);
									console.log("callback received failure")
									$scope.addAlert('Error while submitting assignment', 'danger');
									for (var key in data.errors) {
										var error = data.errors[key];

										$scope.addAlert(error.message, 'danger', false);
									}
								});
							}

						});

					};

					$scope.openExercise = function(index) {
						var exercise = $scope.assignment.exercises[index];
						console.log(exercise);

						var modalInstance = $modal.open({
							controller: 'CompleteExerciseModalCtrl',
							templateUrl: viewsUrl + partialsUrl + 'assignment/directives/completeExerciseModal.html',
							resolve: {
								exercise: function() {
									return exercise;
								}
							}
						});

						modalInstance.result.then(function() {}, function() {});
					}

					$scope.alerts = [];

					$scope.addAlert = function(msg, type, permanant, callback) {
						$scope.alerts.push({
							msg: msg,
							type: type
						});

						var index = $scope.alerts.length - 1;

						if (!permanant) {
							$timeout(function() {

								$scope.closeAlert(index);

								if (callback) {
									callback();
								}

							}, 2000);
						}

					};

					$scope.closeAlert = function(index) {
						$scope.alerts.splice(index, 1);
					};

					if (undefined === $cookies.newAssignmentFormCookie) {
						$scope.addAlert('Welcome to the submit assignment view. This is where alerts will appear. Click the x to dismiss.', 'success', true);
						$cookies.newAssignmentFormCookie = true;

					}
				}
			],
			link: function(scope, element, attrs) {

				element.addClass('exercise-form');

			}
		}
	}
])
	.controller('CompleteExerciseModalCtrl', ['$scope', '$modalInstance', '$http', 'exercise',
		function($scope, $modalInstance, $http, exercise) {

			$scope.exercise = exercise;

			$scope.ok = function() {
				$modalInstance.close($scope.exercise);
			};

			$scope.cancel = function() {
				$modalInstance.dismiss('cancel');
			};
		}
	]);
