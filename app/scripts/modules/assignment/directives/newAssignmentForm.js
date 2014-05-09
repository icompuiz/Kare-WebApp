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
						
					};

					var search = $location.search();

					if (search.populate === 'true') {
						$scope.assignment = {
							
						};
					}

					$scope.submit = function () {

						$http.post('/api/assignments', $scope.assignment).
						success(function (data, status, headers, config) {
							console.log(data);
							console.log("callback received success")
							$scope.addAlert('Assignment saved successfully', 'success', false, function () {
								$location.path('/assignment/edit/' + data._id);
							});
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
