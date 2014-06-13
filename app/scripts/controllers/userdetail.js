'use strict';
var yearBook = angular.module('yearBookGuiApp');

yearBook.controller('UserDetailsCtrl', ['$scope', 'Restangular', '$state',
    function ($scope, Restangular, $state) {

    	$scope.temps = {};

		if (!$scope.global.isUserAuthenticated)
		$state.transitionTo('login');

		var restResource = Restangular.one('users/');

		restResource.get().then(
		function(success){
		  // console.log(success);
		  $scope.global.uid = success.data[0].id;
		  $scope.global.username = success.data[0].username;

		  console.log($scope.global.uid);
		  console.log($scope.global.username);
		  // $state.transitionTo('home');
		}, function(error){
		  console.log(error);
		}
		);

		$scope.temps.updateUserDetails = function() {
			var userDetails = {
				name: $scope.temps.name,
				course: $scope.temps.course,
				email: $scope.temps.email,
				phoneNo: $scope.temps.phoneNo,
				dob: $scope.temps.dob,
				hometown: $scope.temps.hometown
			};


		}

}]);