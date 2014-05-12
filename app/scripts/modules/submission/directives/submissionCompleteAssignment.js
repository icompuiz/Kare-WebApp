'use strict';

angular.module('kareWebAppApp').directive('completeAssignment', ['$timeout', '$cookies', 'viewsUrl', 'partialsUrl',
	function ($timeout, $cookies, viewsUrl, partialsUrl) {
		return {
			restrict: 'EA',
			scope: {
				assignmentId: '=',
				patientId: '='
			},
			templateUrl: viewsUrl + partialsUrl + '/submission/directives/completeAssignment.html',
			controller: ['$scope', '$http',
				function ($scope, $http) {

/*
					$scope.$watch('patientId', function (newVal) {
						console.log("Patient Id: " + newVal);
						$http.get('/api/patients/' + newVal).success(function (data) {
							$scope.patient = data;
							$scope.subtitlePatient = data.name;
						});
					});
*/
					


					$scope.responses = {};

					$scope.$watch('assignmentId', function (newVal) {
						console.log("Assignment Id: " + newVal);

						$http.get('/api/submissions/?assignmentId=' + newVal + '&').success(function (data) {
							if(data.length == 0) {
								$scope.alreadyCompleted = false;
							}else{
								$scope.alreadyCompleted = true;
							}
						});

						var populate = '?populate=patient%20exercises';
						
						$http.get('/api/assignments/' + newVal + populate).success(function (data) {
							$scope.assignment = data;
							$scope.subtitleAssignment = data.name;
							$scope.subtitlePatient = data.patient.name;
							$scope.exercises = data.exercises;


						});
					});



					$scope.submit = function () {
						var response = [];

						for(var attrname in $scope.responses) {
							var newResponse = {
								'value': $scope.responses[attrname],
								'questionId': attrname
							}
							response.push(newResponse);
						}

						var dataToPut = {
							'patientId': $scope.patientId,
							'assignmentId': $scope.assignmentId,
							'responses': response
						}

						$http.post('/api/submissions', dataToPut).
						success(function (data, status, headers, config) {
							console.log(data);
							console.log("callback received success")
							$scope.addAlert('Submission saved successfully', 'success');
						}).
						error(function (data, status, headers, config) {
							console.log(data);
							console.log("callback received failure")
							$scope.addAlert('Error while saving submission', 'danger');
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





					if (undefined === $cookies.editSubmissionFormCookie) {
						$scope.addAlert('Welcome to the edit submission view. This is where alerts will appear. Click the x to dismiss.', 'success', true);
						$cookies.editSubmissionFormCookie = true;

					}

				}
			],
			link: function (scope, element, attrs) {

				element.addClass('exercise-form');

			}
		}
	}
]);
