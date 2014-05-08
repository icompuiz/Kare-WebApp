'use strict';

angular.module('kareWebAppApp').directive('newExerciseForm', ['$timeout', '$cookies', '$location', 'viewsUrl', 'partialsUrl',
	function ($timeout, $cookies, $location, viewsUrl, partialsUrl) {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: viewsUrl + partialsUrl + '/exercise/directives/exercise.html',
			controller: ['$scope', '$http',
				function ($scope, $http) {

					$scope.title = 'Create Exercise';
					$scope.subtitle = 'Create a new exercise that can be added to assignments later';

					$scope.exercise = {
						name: '',
						instructions: [],
						quiz: {
							name: 'Exercise Quiz',
							questions: []
						}
					};

					var search = $location.search();

					if (search.populate === 'true') {
						$scope.exercise = {
							name: 'Planks',
							descriptipn: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus augue eu dolor sagittis, eu pulvinar ligula ultricies. Aliquam facilisis diam nec neque convallis sollicitudin.',
							instructions: [{
								name: 'Perform a plank',
								text: 'The plank is a balance and core conditioning exercise. In yoga, the plank is often done as part of the sun salutation sequence, or as part of a vinyasa in a yoga flow sequence. You can also perform the plank as a stand-alone exercise. There are two major types of planks, the full plank, where you balance on both arms, and the side plank, where you balance on one arm.'
							}],
							quiz: {
								name: 'Plank Quiz',
								questions: [{
									name: 'How long was the patient able to hold the plank?',
									text: 'Enter your response in minutes and seconds held.'
								}]
							}
						};
					}
					$scope.submit = function () {

						$http.post('http://localhost:9000/api/exercises', $scope.exercise).
						success(function (data, status, headers, config) {
							console.log(data);
							console.log("callback received success")
							$scope.addAlert('Exercise saved successfully', 'success', false, function () {
								$location.path('/exercise/edit/' + data._id);
							});
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

					if (undefined === $cookies.newExerciseFormCookie) {
						$scope.addAlert('Welcome to the new exercise view. This is where alerts will appear. Click the x to dismiss.', 'success', true);
						$cookies.newExerciseFormCookie = true;

					}
				}
			],
			link: function (scope, element, attrs) {

				element.addClass('exercise-form');

			}
		}
	}
]);
