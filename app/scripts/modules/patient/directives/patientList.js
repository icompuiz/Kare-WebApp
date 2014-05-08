'use strict';

angular.module('kareWebAppApp').directive('karePatientList', ['$timeout','$http','$cookies', 'viewsUrl', 'partialsUrl', function($timeout,$http,$cookies, viewsUrl, partialsUrl) {
	return {
		restrict: 'EA',
		scope: {},
		templateUrl: viewsUrl + partialsUrl + '/patient/directives/patientList.html',
		controller: ['$scope', function($scope) {

			var patientUrl = '/api/patients';

			$http.get(patientUrl).success(function(data) {
				$scope.patients = data;
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

			$scope.removePatient = function(index) {
				
				var patient = $scope.patients[index];

				$scope.patients.splice(index, 1);

				$http.delete(patientUrl + '/' + patient._id).success(function() {
					$scope.addAlert('Patient deleted successfully', 'success');
				}).error(function() {
					$scope.addAlert('An error occured while deleting patient', 'danger');
				});

			};

			if (undefined === $cookies.patientListCookie) {

				$scope.addAlert('Welcome to the patient list. This is where alerts will appear. Click the x to dismiss.', 'success', true);
				$cookies.patientListCookie = true;

			}
			
		}],
		link: function(scope, element, attrs) {

			element.addClass('exercise-list');

		}
	}
}]);