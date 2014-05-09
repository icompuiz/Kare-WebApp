'use strict';

angular.module('kareWebAppApp').directive('editAssignmentForm', ['$timeout', '$cookies', 'viewsUrl', 'partialsUrl',
	function ($timeout, $cookies, viewsUrl, partialsUrl) {
		return {
			restrict: 'EA',
			scope: {
				assignmentId: '='
			},
			templateUrl: viewsUrl + partialsUrl + '/assignment/directives/assignment.html',
			controller: ['$scope', '$http',
				function ($scope, $http) {

					$scope.title = 'Edit Assignment';
					$scope.subtitle = 'Modify this assignment.';



					$scope.$watch('assignmentId', function (newVal) {
						$http.get('/api/assignments/' + newVal).success(function (data) {
							$scope.assignment = data;
						});
					});

					$scope.submit = function () {

						$http.put('/api/assignments/' + $scope.assignmentId, $scope.assignment).
						success(function (data, status, headers, config) {
							console.log(data);
							console.log("callback received success")
							$scope.addAlert('Assignment saved successfully', 'success');
						}).
						error(function (data, status, headers, config) {
							console.log(data);
							console.log("callback received failure")
							$scope.addAlert('Error while saving assignment', 'danger');
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
