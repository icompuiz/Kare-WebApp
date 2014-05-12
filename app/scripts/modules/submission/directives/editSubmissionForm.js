'use strict';

angular.module('kareWebAppApp').directive('editSubmissionForm', ['$timeout', '$cookies', 'viewsUrl', 'partialsUrl',
	function ($timeout, $cookies, viewsUrl, partialsUrl) {
		return {
			restrict: 'EA',
			scope: {
				submissionId: '='
			},
			templateUrl: viewsUrl + partialsUrl + '/submission/directives/submission.html',
			controller: ['$scope', '$http',
				function ($scope, $http) {

					$scope.title = 'Edit Submission';
					$scope.subtitle = 'Modify this submission.';



					$scope.$watch('submissionId', function (newVal) {
						$http.get('/api/submissions/' + newVal).success(function (data) {
							$scope.submission = data;
						});
					});

					$scope.submit = function () {

						$http.put('/api/submissions/' + $scope.submissionId, $scope.submission).
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
