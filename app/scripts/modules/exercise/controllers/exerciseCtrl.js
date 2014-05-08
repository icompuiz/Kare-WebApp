'use strict';

angular.module('kareWebAppApp').controller('ExerciseCtrl',['$scope', '$routeParams', function($scope, $routeParams) {
	$scope.exerciseId = null;
	if ($routeParams.exerciseId) {
		$scope.exerciseId = $routeParams.exerciseId;
	}

}]);