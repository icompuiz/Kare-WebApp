'use strict';

angular.module('kareWebAppApp').directive('editExerciseForm', ['$timeout', '$cookies', 'viewsUrl', 'partialsUrl',
	function ($timeout, $cookies, viewsUrl, partialsUrl) {
		return {
			restrict: 'EA',
			scope: {
				exerciseId: '='
			},
			templateUrl: viewsUrl + partialsUrl + '/exercise/directives/exercise.html',
			controller: ['$scope', '$http',
				function ($scope, $http) {

					$scope.title = 'Edit Exercise';
					$scope.subtitle = 'Modify this exercise.';

					$scope.$watch('exerciseId', function (newVal) {
						$http.get('/api/exercises/' + newVal).success(function (data) {
							$scope.exercise = data;
							if (!$scope.exercise.quiz) {
								$scope.exercise.quiz = {
									name: 'tmp',
									questions: []
								};
							}
						});
					});

					$scope.submit = function () {

						var data = {
							name: $scope.exercise.name,
							instructions: $scope.exercise.instructions,
							quiz: $scope.exercise.quiz
						};


						$http.put('/api/exercises/' + $scope.exerciseId, data).
						success(function (data, status, headers, config) {
							console.log(data);
							console.log("callback received success")
							$scope.addAlert('Exercise saved successfully', 'success');
						}).
						error(function (data, status, headers, config) {
							console.log(data);
							console.log("callback received failure")
							$scope.addAlert('Error while saving exercise', 'danger');
							for (var key in data.errors) {
								var error = data.errors[key];
								$scope.addAlert(error.message, 'danger', true);
							}
						});

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

					if (undefined === $cookies.editExerciseFormCookie) {
						$scope.addAlert('Welcome to the edit exercise view. This is where alerts will appear. Click the x to dismiss.', 'success', true);
						$cookies.editExerciseFormCookie = true;

					}
				}
			],
			link: function (scope, element, attrs) {

				element.addClass('exercise-form');

			}
		}
	}
]);
