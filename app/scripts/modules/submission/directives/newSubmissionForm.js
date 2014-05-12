'use strict';

angular.module('kareWebAppApp').directive('newSubmissionForm', ['$timeout', '$cookies', '$location', 'viewsUrl', 'partialsUrl',
	function ($timeout, $cookies, $location, viewsUrl, partialsUrl) {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: viewsUrl + partialsUrl + '/submission/directives/submission.html',
			controller: ['$scope', '$http',
				function ($scope, $http) {

					$scope.title = 'Create Submission';
					$scope.subtitle = 'Create a new submission that can be added to assignments later';

					$scope.submission = {
						name: '',
						email: '',
						birthdate: ''
					};

					var search = $location.search();

					if (search.populate === 'true') {
						$scope.submission = {
							name: 'Jane Doe',
							email: 'sample@contoso.com',
							birthdate: moment().format('YYYY-MM-DD')
						};
					}

					$scope.submit = function () {

						$http.post('/api/submissions', $scope.submission).
						success(function (data, status, headers, config) {
							console.log(data);
							console.log("callback received success")
							$scope.addAlert('Submission saved successfully', 'success', false, function () {
								$location.path('/submission/edit/' + data._id);
							});
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

					if (undefined === $cookies.newSubmissionFormCookie) {
						$scope.addAlert('Welcome to the new submission view. This is where alerts will appear. Click the x to dismiss.', 'success', true);
						$cookies.newSubmissionFormCookie = true;

					}
				}
			],
			link: function (scope, element, attrs) {

				element.addClass('exercise-form');

			}
		}
	}
]);
