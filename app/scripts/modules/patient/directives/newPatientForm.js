'use strict';

angular.module('kareWebAppApp').directive('newPatientForm', ['$timeout', '$cookies', '$location', 'viewsUrl', 'partialsUrl',
	function ($timeout, $cookies, $location, viewsUrl, partialsUrl) {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: viewsUrl + partialsUrl + '/patient/directives/patient.html',
			controller: ['$scope', '$http',
				function ($scope, $http) {

					$scope.title = 'Create Patient';
					$scope.subtitle = 'Create a new patient that can be added to assignments later';

					$scope.patient = {
						name: '',
						email: '',
						birthdate: ''
					};

					var search = $location.search();

					if (search.populate === 'true') {
						$scope.patient = {
							name: 'Jane Doe',
							email: 'sample@contoso.com',
							birthdate: new Date()
						};
					}

					$scope.submit = function () {

						$http.post('http://localhost:9000/api/patients', $scope.patient).
						success(function (data, status, headers, config) {
							console.log(data);
							console.log("callback received success")
							$scope.addAlert('Patient saved successfully', 'success', false, function () {
								$location.path('/patient/edit/' + data._id);
							});
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

					if (undefined === $cookies.newPatientFormCookie) {
						$scope.addAlert('Welcome to the new patient view. This is where alerts will appear. Click the x to dismiss.', 'success', true);
						$cookies.newPatientFormCookie = true;

					}
				}
			],
			link: function (scope, element, attrs) {

				element.addClass('exercise-form');

			}
		}
	}
]);
