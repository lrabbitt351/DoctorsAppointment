var  app = angular.module('doctorApp', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/login',{
		templateUrl: 'partials/login.html',
	})
	.when('/dash',{
		templateUrl: 'partials/dash.html',
	})
  .when('/addAppointment',{
		templateUrl: 'partials/makeAppointment.html',
	})
	.otherwise({
		redirectTo: '/login'
	});

});
