angular.module('opendataapplication').directive('searchBar', [function () {
	return {
		scope: {
			ngModel: '='
		},
		require: ['^ionNavBar', '?ngModel'],
		restrict: 'E',
		replace: true,
		template:

		'<ion-nav-buttons side="right" class="header-item-search">'+
		  '<label class="item-input-wrapper header-item-search" ng-show="ngModel.show">'+
			'<style>.buttons-right{width:100%;position:relative;} .right-buttons{width:85%;} .ng-pristine{width:100% !important;} .button{position:fixed;right:2%;}</style>'+

		      '<input id="inputId" type="search" placeholder="Procurar..." ng-model="ngModel.txt" ng-change="inputChange(ngModel.txt)" style="width:80%;">'+
		  '</label>'+
			'<button class="button icon no-text button-clear ion-android-search header-item-search" style="color:white;" ng-click="inputFocus(ngModel.show); ngModel.txt=\'\';ngModel.show=!ngModel.show" ng-show="!ngModel.show"></button>'+
			'<button class="button icon no-text button-clear ion-close-round header-item-search" style="color:white;" ng-click="inputFocus(ngModel.show); ngModel.txt=\'\';ngModel.show=!ngModel.show" ng-show="ngModel.show"></button>'+
		'</ion-nav-buttons>',

		compile: function (element, attrs) {
			var icon=attrs.icon
					|| (ionic.Platform.isAndroid() && 'ion-android-search')
					|| (ionic.Platform.isIOS()     && 'ion-ios7-search')
					|| 'ion-search';
			angular.element(element[0].querySelector('.icon')).addClass(icon);

			return function($scope, $element, $attrs, ctrls) {
				var navBarCtrl = ctrls[0];
				$scope.navElement = $attrs.side === 'right' ? navBarCtrl.rightButtonsElement : navBarCtrl.leftButtonsElement;

			};
		},
		controller: ['$scope','$ionicNavBarDelegate', function($scope,$ionicNavBarDelegate){
			var title, definedClass;

			$scope.$watch('ngModel.show', function(showing, oldVal, scope) {

				if(showing!==oldVal) {

					if(showing) {
						if(!definedClass) {
							var numicons=$scope.navElement.children().length;
							angular.element($scope.navElement[0].querySelector('.searchBar')).addClass('numicons'+numicons);
						}

						title = $ionicNavBarDelegate.title();
						$ionicNavBarDelegate.setTitle('');
					} else {
						$ionicNavBarDelegate.setTitle(title);
					}
				} else if (!title) {
					title = $ionicNavBarDelegate.title();
				}
			});
		}]
	};
}]);
