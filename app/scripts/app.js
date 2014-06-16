'use strict';

var app = angular.module('yearBookGuiApp', [
  'ngResource',
  'ngSanitize',
  'ui.router',
  'restangular',
  'mm.foundation'
]);

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/login");
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "views/login.html",
      controller: "LoginCtrl"
    })
    .state('userDetails', {
      url: "/userdetails",
      templateUrl: "views/details.html",
      controller: "UserDetailsCtrl"
    })
    .state('home', {
      url: "/home",
      templateUrl: "views/home.html",
      controller: "HomeCtrl"
    });
});

app.constant('settings', {
  API_BASE_URL: 'http://localhost:8000/',
});

app.config(['$httpProvider', 'RestangularProvider', 'settings', function($httpProvider, RestangularProvider, settings){

  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  RestangularProvider.setBaseUrl(settings.API_BASE_URL);
  RestangularProvider.setDefaultHttpFields({cache: false});
  RestangularProvider.setDefaultHeaders({'Content-Type': 'application/json'});
  RestangularProvider.setDefaultHeaders({'Authorization': ''});
  RestangularProvider.setFullResponse(true);
  RestangularProvider.setDefaultRequestParams({format: 'json'});

}]);
