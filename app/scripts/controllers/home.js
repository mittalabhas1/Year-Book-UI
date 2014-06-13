'use strict';
var yearBook = angular.module('yearBookGuiApp');

yearBook.controller('HomeCtrl', ['$scope', 'Restangular', '$state',
  	function ($scope, Restangular, $state) {
      if (!$scope.global.isUserAuthenticated)
        $state.transitionTo('login');
  }]);