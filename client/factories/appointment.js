app.factory('appointmentFactory', function($http, $route, $location){
  factory = {};
  factory.addAppointment = function(appointment, cb){
    $http.post('/appointments/create', appointment).then(function(output){cb(output.data);}).then($location.url('/dash'));
  };
  factory.getAll = function(cb){
    $http.get('/appointments/getAll').then(function(output){
      cb(output.data);
    });
  };
  factory.deleteAppointment = function(id){
    $http.delete('/destroyAppointment/' + id).then(function(output){

    });
  };
return factory;
});
