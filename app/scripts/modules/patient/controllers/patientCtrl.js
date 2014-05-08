'use strict';

angular.module('kareWebAppApp').controller('PatientCtrl',['$scope', '$routeParams', function($scope, $routeParams) {
	$scope.patientId = null;
	if ($routeParams.patientId) {
		$scope.patientId = $routeParams.patientId;
	}

}]);