'use strict';
var yearBook = angular.module('yearBookGuiApp');

yearBook.controller('HomeCtrl', ['$scope', 'Restangular', '$state',
  	function ($scope, Restangular, $state) {
      if (!$scope.global.isUserAuthenticated)
        $state.transitionTo('login');

      var restResource = Restangular.one('users', $scope.global.uid);
      restResource.get().then(
        function(response){
          var userDetails = response.data[0];
          console.log(userDetails);
          localStorage.userDetails = JSON.stringify(userDetails);
      });
  }]);
