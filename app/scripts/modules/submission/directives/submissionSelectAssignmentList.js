'use strict';

angular.module('kareWebAppApp').directive('kareSubmissionAssignmentList', ['$timeout','$http','$cookies', 'viewsUrl', 'partialsUrl', function($timeout,$http,$cookies, viewsUrl, partialsUrl) {
	return {
		restrict: 'EA',
		scope: {

			},
		templateUrl: viewsUrl + partialsUrl + '/submission/directives/submissionSelectAssignmentList.html',
		controller: ['$scope', '$routeParams', function($scope, $routeParams) {
			
			console.log("Current Demo Patient: " + $routeParams.patientId);
			$scope.patientId = $routeParams.patientId;

			var assignmentsToDo = '/api/assignments?' + $scope.patientId;
			var currentPatient = '/api/patients/' + $scope.patientId;

			$http.get(assignmentsToDo).success(function(data) {
				$scope.assignmentsToDo = data;
			});

			$http.get(currentPatient).success(function(data) {
				$scope.selectedPatient = data;
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