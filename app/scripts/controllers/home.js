'use strict';
var yearBook = angular.module('yearBookGuiApp');

yearBook.controller('HomeCtrl', ['$scope', 'Restangular', '$state',
  	function ($scope, Restangular, $state) {
      if (!$scope.global.isUserAuthenticated)
        $state.transitionTo('login');

      var restResource = Restangular.one('users', $scope.global.uid);
      restResource.get().then(
        function(response){
          localStorage.userDetails = JSON.stringify(response.data[0]);
          $scope.global.userDetails = response.data[0];
          // console.log($scope.global.userDetails);
      });
  }]);
