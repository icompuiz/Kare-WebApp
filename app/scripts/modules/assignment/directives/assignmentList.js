'use strict';

angular.module('kareWebAppApp').directive('kareAssignmentList', ['$timeout','$http','$cookies', 'viewsUrl', 'partialsUrl', function($timeout,$http,$cookies, viewsUrl, partialsUrl) {
	return {
		restrict: 'EA',
		scope: {},
		templateUrl: viewsUrl + partialsUrl + '/assignment/directives/assignmentList.html',
		controller: ['$scope', function($scope) {

			var assignmentUrl = '/api/assignments';

			$http.get(assignmentUrl + '?populate=patient').success(function(data) {
				$scope.assignments = data;
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

			$scope.removeAssignment = function(index) {
				
				var assignment = $scope.assignments[index];

				$scope.assignments.splice(index, 1);

				$http.delete(assignmentUrl + '/' + assignment._id).success(function() {
					$scope.addAlert('Assignment deleted successfully', 'success');
				}).error(function() {
					$scope.addAlert('An error occured while deleting assignment', 'danger');
				});

			};

			if (undefined === $cookies.assignmentListCookie) {

				$scope.addAlert('Welcome to the assignment list. This is where alerts will appear. Click the x to dismiss.', 'success', true);
				$cookies.assignmentListCookie = true;

			}
			
		}],
		link: function(scope, element, attrs) {

			element.addClass('exercise-list');

		}
	}
}]);