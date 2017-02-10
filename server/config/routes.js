var users = require('./../controllers/user.js');
var appointments = require('./../controllers/appointment.js');

module.exports = function(app){
  app.post('/login', users.login);
  app.get('/users', users.index);
  app.get('/checkstatus', users.checkStatus);
  app.get('/logout', users.logout);
  app.get('/users/getUser', users.getUser);
  app.post('/appointments/create', appointments.create);
  app.get('/appointments/getAll', appointments.getAll);
  app.delete('/destroyAppointment/:id', appointments.deleteAppointment);
};
