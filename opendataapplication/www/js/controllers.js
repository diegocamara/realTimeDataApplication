'use strict';

angular.module('opendataapplication', ['ionic', 'ionic-material', 'ngCordova'])

.controller('appController', function($timeout, $scope, $http, ionicMaterialInk, ionicMaterialMotion, $ionicHistory){

    //////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

})

.controller('homeController', function($timeout, $scope, $http, ionicMaterialInk, ionicMaterialMotion){

  //$scope.$parent.showHeader();
  //$scope.$parent.clearFabs();
  //$scope.$parent.setHeaderFab('center');

  // $timeout(function () {
  //   $scope.isExpanded = true;
  //   $scope.$parent.setExpanded(true);
  // }, 100);

  //ionicMaterialMotion.fadeSlideInRight();

  ionicMaterialInk.displayEffect();


})

.controller('mapController', function($scope, $state, $timeout, $cordovaGeolocation, $ionicLoading, ionicMaterialInk, ionicMaterialMotion){

  $timeout(function () {
    $scope.isHideNavbar = true;
  }, 100);

  var options = {timeout: 10000, enableHighAccuracy:true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

  }, function(error){
    console.log("Could not get location");
  });

  ionicMaterialInk.displayEffect();

});
