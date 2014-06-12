'use strict';
var yearBook = angular.module('yearBookGuiApp');

  yearBook.controller('MainCtrl', ['$scope', 'Restangular', '$state',
    function ($scope, Restangular, $state) {
      
      $scope.global = {};
      $scope.global.isUserAuthenticated = false;
      
      $scope.global.resetAuthCredentials = function() {
        delete localStorage.token;
        delete localStorage.username;
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
  
  yearBook.controller('LoginCtrl', ['$scope', 'Restangular', '$state',
    function ($scope, Restangular, $state) {
      $scope.temps = {};
      $scope.temps.username = 'macchli';
      $scope.temps.password = 'qwerty';
      $scope.temps.title = 'Login';
      
      if($scope.global.isUserAuthenticated)
        $state.transitionTo('userDetails');

      $scope.temps.tryLogin = function() {
        $scope.temps.login($scope.temps.username, $scope.temps.password);
      }


      $scope.temps.login = function(username, password) {
        var user = {
          username: username,
          password: password
        };
        console.log(user);

        var restResource = Restangular.all('auth-token/');

        restResource.post(user).then(
          function(success) {
            console.log(success.data.token);
            localStorage.token = 'JWT ' + success.data.token;
            localStorage.username = username;
            $scope.global.updateLoginStatus();
            
            if($scope.global.isUserAuthenticated){
              console.log("Authorization token recieved...");
              Restangular.setDefaultHeaders({'Authorization': localStorage.token});
              $state.transitionTo('userDetails');
            }
          }, function(error) {
            console.log(error.data.non_field_errors[0]);
            $scope.temps.error = error.data.non_field_errors[0];
            $scope.global.resetAuthCredentials();
          }
        );
      }

  }]);

  yearBook.controller('HomeCtrl', ['$scope', 'Restangular', '$state',
  	function ($scope, Restangular, $state) {
      if (!$scope.global.isUserAuthenticated)
        $state.transitionTo('login');
  }]);

  yearBook.controller('UserDetailsCtrl', ['$scope', 'Restangular', '$state',
    function ($scope, Restangular, $state) {

      if (!$scope.global.isUserAuthenticated)
        $state.transitionTo('login');

      var restResource = Restangular.all('users/');

      restResource.post(localStorage.username).then(
        function(success){
          
        }, function(error){
          
        }
      );

  }]);
