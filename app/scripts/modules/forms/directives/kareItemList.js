'use strict';

angular.module('kareWebAppApp').directive('kareItemList', ['$modal','$log','viewsUrl', 'partialsUrl', function($modal,$log, viewsUrl, partialsUrl) {
	return {
		restrict: 'EA',
		scope: {
			isSource: '=',
			listItems: '=',
			otherListItems: '=',
			filter: '&'
		},
		templateUrl: viewsUrl + partialsUrl + '/forms/directives/kareItemList.html',
		controller: ['$scope', function($scope) {
			
			$scope.moveItem = function(item) {
		      	if ($scope.isSource) {
		      		$scope.otherListItems.push(item);
		      	} else {
		      		var index = $scope.listItems.indexOf(item);
      				$scope.removeItem(index);
		      	}
			};

			$scope.removeItem = function(index) {
				$scope.listItems.splice(index, 1);
			};

			$scope.filterList = function(item) {
				return $scope.filter({
					item: item
				});
			};


		}],
		link: function(scope, element, attrs) {

		}
	}
}]);


