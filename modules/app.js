// Declare app level module which depends on filters, and services
var app = angular.module('sonatask', [
    'ngRoute',
	'sonatask.controllers',
	'UserApp',
	'xeditable',
	'ngResource',
	'720kb.datepicker',
	'ui.sortable',
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/login', {templateUrl: 'views/login.html', public: true, login: true})
	.when('/signup', {templateUrl: 'views/signup.html', public: true})
	.when('/home', {templateUrl: 'views/home.html', controller: 'HomeCtrl'})
	.otherwise({redirectTo: '/home'});
}]);
