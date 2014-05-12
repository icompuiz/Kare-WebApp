'use strict';

angular.module('kareWebAppApp').directive('kareSubmissionPatientList', ['$timeout','$http','$cookies', 'viewsUrl', 'partialsUrl', function($timeout,$http,$cookies, viewsUrl, partialsUrl) {
	return {
		restrict: 'EA',
		scope: {},
		templateUrl: viewsUrl + partialsUrl + '/submission/directives/submissionSelectPatientList.html',
		controller: ['$scope', function($scope) {

			var patientsUrl = '/api/patients';
			$http.get(patientsUrl).success(function(data) {
				$scope.patientsList = data;
			});
			$scope.selectedPatient = null;

			var submissionUrl = '/api/submissions';

			$http.get(submissionUrl).success(function(data) {
				$scope.submissions = data;
			});

			$scope.alerts = [
				
			];

			$scope.addAlert = function(msg, type, permanant) {
				$scope.alerts.push({msg: msg, type: type});

				var index = $scope.alerts.length - 1;

				if (!permanant) {
					$timeout(function() {

						$scope.closeAlert(index);

					}, 2000);
				}

			};

			$scope.closeAlert = function(index) {
				$scope.alerts.splice(index, 1);
			};

			$scope.removeSubmission = function(index) {
				
				var submission = $scope.submissions[index];

				$scope.submissions.splice(index, 1);

				$http.delete(submissionUrl + '/' + submission._id).success(function() {
					$scope.addAlert('Submission deleted successfully', 'success');
				}).error(function() {
					$scope.addAlert('An error occured while deleting submission', 'danger');
				});

			};

			if (undefined === $cookies.submissionListCookie) {

				$scope.addAlert('Welcome to the submission list. This is where alerts will appear. Click the x to dismiss.', 'success', true);
				$cookies.submissionListCookie = true;

			}
			
		}],
		link: function(scope, element, attrs) {

			element.addClass('exercise-list');

		}
	}
}]);