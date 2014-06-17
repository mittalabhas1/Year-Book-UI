'use strict';
var yearBook = angular.module('yearBookGuiApp');

  yearBook.controller('MainCtrl', ['$scope', 'Restangular', '$state',
    function ($scope, Restangular, $state) {

      $scope.global = {};
      $scope.global.isUserAuthenticated = false;

      $scope.global.resetAuthCredentials = function() {
        delete localStorage.token;
        delete localStorage.userDetails;
        delete localStorage.user;
        Restangular.setDefaultHeaders({'Authorization': ''});
        $scope.global.updateLoginStatus();
      }

      $scope.global.updateLoginStatus = function() {
        if(localStorage.token)
          $scope.global.isUserAuthenticated = true;
        else
          $scope.global.isUserAuthenticated = false;
      }

      $scope.global.logout = function() {
        $scope.global.resetAuthCredentials();
        $state.transitionTo('login');
        console.log("Logged out...");
      }

  }]);

  yearBook.controller('OffCanvasDemoCtrl', ['$scope',
    function ($scope) {

  }]);
