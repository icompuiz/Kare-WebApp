'use strict';

angular.module('kareWebAppApp').directive('kareList', ['$modal','$log','viewsUrl', 'partialsUrl', function($modal,$log, viewsUrl, partialsUrl) {
	return {
		restrict: 'EA',
		scope: {
			listItems: '='
		},
		templateUrl: viewsUrl + partialsUrl + '/forms/directives/kareList.html',
		controller: ['$scope', function($scope) {
			

			$scope.addItem = function(item) {
			      $scope.listItems.push(item);

			};

			$scope.editItem = function(index) {

				var item = $scope.listItems[index];

				var modalInstance = $modal.open({
					controller: 'EditKareListItemCtrl',
					templateUrl: viewsUrl + partialsUrl + '/forms/directives/kareListAddLisItem.html',
					resolve:{
						item: function() {
							return item
						}
					} 
				});

				modalInstance.result.then(function (selectedItem) {
					$scope.listItems[index] = selectedItem;
			    }, function () {
			      $log.info('Modal dismissed at: ' + new Date());
			    });

			};

			$scope.openNewItemModal = function() {
				var modalInstance = $modal.open({
					controller: 'AddKareListItemCtrl',
					templateUrl: viewsUrl + partialsUrl + '/forms/directives/kareListAddLisItem.html'
				});

				modalInstance.result.then(function (selectedItem) {
					$scope.addItem(selectedItem);
			    }, function () {
			      $log.info('Modal dismissed at: ' + new Date());
			    });

			};

			$scope.removeItem = function(index) {
				$scope.listItems.splice(index, 1);
			}
		}],
		link: function(scope, element, attrs) {

		}
	}
}]).controller('AddKareListItemCtrl', ['$scope','$modalInstance', function($scope, $modalInstance) {


	$scope.item = {
		name: '',
		text: $scope.newItemText
	};

	$scope.ok = function () {
		if ('' !== $scope.item.name.trim() && '' !== $scope.item.text.trim()) {
			$modalInstance.close($scope.item);
		}

		// validation error otherwise
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

}]).controller('EditKareListItemCtrl', ['$scope','$modalInstance','item', function($scope, $modalInstance, item) {


	$scope.item = item

	$scope.ok = function () {
		if ('' !== $scope.item.name.trim() && '' !== $scope.item.text.trim()) {
			$modalInstance.close($scope.item);
		}

		// validation error otherwise
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

}]);;


