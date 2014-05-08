'use strict';

angular.module('kareWebAppApp').directive('editPatientForm', ['$timeout', '$cookies', 'viewsUrl', 'partialsUrl',
	function ($timeout, $cookies, viewsUrl, partialsUrl) {
		return {
			restrict: 'EA',
			scope: {
				patientId: '='
			},
			templateUrl: viewsUrl + partialsUrl + '/patient/directives/patient.html',
			controller: ['$scope', '$http',
				function ($scope, $http) {

					$scope.title = 'Edit Patient';
					$scope.subtitle = 'Modify this patient.';



					$scope.$watch('patientId', function (newVal) {
						$http.get('/api/patients/' + newVal).success(function (data) {
							$scope.patient = data;
						});
					});

					$scope.submit = function () {

						$http.put('/api/patients/' + $scope.patientId, $scope.patient).
						success(function (data, status, headers, config) {
							console.log(data);
							console.log("callback received success")
							$scope.addAlert('Patient saved successfully', 'success');
						}).
						error(function (data, status, headers, config) {
							console.log(data);
							console.log("callback received failure")
							$scope.addAlert('Error while saving patient', 'danger');
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

					if (undefined === $cookies.editPatientFormCookie) {
						$scope.addAlert('Welcome to the edit patient view. This is where alerts will appear. Click the x to dismiss.', 'success', true);
						$cookies.editPatientFormCookie = true;

					}
				}
			],
			link: function (scope, element, attrs) {

				element.addClass('exercise-form');

			}
		}
	}
]);
