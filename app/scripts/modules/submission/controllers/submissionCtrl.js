'use strict';

angular.module('kareWebAppApp').controller('SubmissionCtrl',['$scope', '$routeParams', function($scope, $routeParams) {
	$scope.submissionId = null;
	$scope.assignmentId = null;

	
	if ($routeParams.submissionId) {
		$scope.submissionId = $routeParams.submissionId;
	}

	if ($routeParams.assignmentId) {
		$scope.assignmentId = $routeParams.assignmentId;
	}

}]);