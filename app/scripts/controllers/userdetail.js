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
		  
		  var restResource = Restangular.one('users', $scope.global.uid);
		  restResource.get().then(
		  	function(response) {
		  		// console.log(success.data.length);
		  		if(response.data.length != 0)
		  			$state.transitionTo('home');
		  	});

		});

		$scope.temps.updateUserDetails = function() {
			var userDetails = {
				uid: $scope.global.uid,
				name: $scope.temps.name,
				course: $scope.temps.course,
				email: $scope.temps.email,
				phoneNo: $scope.temps.phoneNo,
				dob: $scope.temps.dob,
				hometown: $scope.temps.hometown,
				answers: []
			};

			var restResource = Restangular.all('users/'+$scope.global.uid);
			restResource.post(userDetails).then(
			function(success){
				localStorage.userDetails = JSON.stringify(userDetails);
				// console.log(success);
				$state.transitionTo('home');
			}, function(error){
				// console.log(error);
			});

		}

}]);