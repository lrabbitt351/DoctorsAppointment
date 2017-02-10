app.factory('userFactory', function($http, $route, $location){
  factory = {};

  factory.checkStatus = function(cb){
    $http.get('/checkstatus').then(function(output){
      if(output.data){
        cb(output.data);
        if($location.$$path == '/login'){
          $location.url('/dash');
        }
      } else {
        $location.url('/login');
      }
    });
  };

  factory.login = function(user){
    $http.post('/login', user).then(function(output){
      if(output.data){
        $location.url('/dash');
      }
    });
  };

  factory.index = function(cb){
    $http.get('/users').then(function(output){
      cb(output.data);
    });
  };
  factory.getUser = function(cb){
    $http.get('/users/getUser').then(function(output){
      cb(output.data);
    });
  };
return factory;
});
