'use strict';

angular.module('kareWebAppApp').directive('kareQuiz', ['$modal','$log','viewsUrl', 'partialsUrl', function($modal,$log, viewsUrl, partialsUrl) {
	return {
		restrict: 'EA',
		scope: {
			quizId: '=',
			responses: '='
		},
		templateUrl: viewsUrl + partialsUrl + '/forms/directives/kareQuiz.html',
		controller: ['$scope', '$http', function($scope, $http) {
			$scope.openQuizModal = function() {
				console.log("quizId: " + $scope.quizId);

				$http.get('/api/quizes/' + $scope.quizId).success(function (data) {
					$scope.quiz = data;

					var modalInstance = $modal.open({
						controller: 'DoKareQuizItemCtrl',
						templateUrl: viewsUrl + partialsUrl + '/forms/directives/kareQuizComplete.html',
						scope: $scope
					});

					modalInstance.result.then(function (selectedItem) {
						console.log($scope.responses);
						console.log(selectedItem.response);


						for(var attrname in selectedItem.response) {
							$scope.responses[attrname] = selectedItem.response[attrname];
						}

						console.log($scope.responses);




				    }, function () {
				      $log.info('Modal dismissed at: ' + new Date());
				    });
				});




			};
		}],
		link: function(scope, element, attrs) {

		}
	}

}]).controller('DoKareQuizItemCtrl', ['$scope','$modalInstance', function($scope, $modalInstance) {
	console.log($scope.quiz.questions);

	$scope.item = {
		quizName: $scope.quiz.name,
		quizQuestions: $scope.quiz.questions,
		response: {}
	};

	$scope.ok = function () {
		/*if ('' !== $scope.item.name.trim() && '' !== $scope.item.text.trim()) {
			$modalInstance.close($scope.item);
		}*/

		$modalInstance.close($scope.item);

		// validation error otherwise
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]);


