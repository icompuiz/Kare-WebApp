'use strict';

angular.module('kareWebAppApp').directive('kareExerciseList', ['$timeout','$http','$cookies', 'viewsUrl', 'partialsUrl', function($timeout,$http,$cookies, viewsUrl, partialsUrl) {
	return {
		restrict: 'EA',
		scope: {},
		templateUrl: viewsUrl + partialsUrl + '/exercise/directives/exerciseList.html',
		controller: ['$scope', function($scope) {

			var exerciseUrl = '/api/exercises';

			$http.get(exerciseUrl).success(function(data) {
				$scope.exercises = data;
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

			$scope.removeExercise = function(index) {
				
				var exercise = $scope.exercises[index];

				$scope.exercises.splice(index, 1);

				$http.delete(exerciseUrl + '/' + exercise._id).success(function() {
					$scope.addAlert('Exercise deleted successfully', 'success');
				}).error(function() {
					$scope.addAlert('An error occured while deleting exercise', 'danger');
				});

			};

			if (undefined === $cookies.exerciseListCookie) {

				$scope.addAlert('Welcome to the exercise list. This is where alerts will appear. Click the x to dismiss.', 'success', true);
				$cookies.exerciseListCookie = true;

			}
			
		}],
		link: function(scope, element, attrs) {

			element.addClass('exercise-list');

		}
	}
}]);