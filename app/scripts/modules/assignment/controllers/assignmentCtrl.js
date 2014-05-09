'use strict';

angular.module('kareWebAppApp').controller('AssignmentCtrl',['$scope', '$routeParams', function($scope, $routeParams) {
	$scope.assignmentId = null;
	if ($routeParams.assignmentId) {
		$scope.assignmentId = $routeParams.assignmentId;
	}

}]);