'use strict';

angular.module('kareWebAppApp').controller('SubmissionCtrl',['$scope', '$routeParams', function($scope, $routeParams) {
	$scope.submissionId = null;
	$scope.assignmentId = null;
	$scope.patientId = null;

	
	if ($routeParams.submissionId) {
		$scope.submissionId = $routeParams.submissionId;
	}

	if ($routeParams.patientId) {

		$scope.patientId = $routeParams.patientId;
	}

	if ($routeParams.assignmentId) {

		$scope.assignmentId = $routeParams.assignmentId;
	}

}]);