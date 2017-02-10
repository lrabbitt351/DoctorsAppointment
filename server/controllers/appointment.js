var mongoose = require('mongoose');
var Appointment = mongoose.model('Appointment');
var User = mongoose.model('User');

module.exports = (function(req, res){
  return {
    create: function(req, res){
      User.findOne({_id: req.session.user._id}, function(err, user){
        req.body.patient = user.name;
      Appointment.find({date: req.body.date}, function(err, results){
        if(err){

        } else {
          var timeslot = false;
          var userAppt = false;
          for(var j in results){
            if (req.body.patient === results[j].patient){
              userAppt = true;
            }
          }
          if(userAppt === true){
            res.json({status: 'result', result: 'You have already scheduled an appointment for this day. Please pick new day.'});
          } else {
            if(results.length >= 3){
              res.json({status: 'result', result: 'I am sorry, but there are no more available appointments on this day. Please pick a new day.'});
            } else {
              for(var i in results){
                if(req.body.time === results[i].time){
                  timeslot = true;
                }
              }
              if(timeslot === true){
                res.json({status: 'result', result: 'I am sorry, but someone has already picked that time. Please pick a new time.'});
              } else {
                var appointment = new Appointment(req.body);
                console.log(appointment);
                appointment.save(function(err, apptResults){
                  if (err){
                    res.json({status:'result', result:err});
                  }
                });
              }
            }
          }
        }
      });
    });
    },
    getAll: function(req, res){
      Appointment.find({}, function(err, results){
        if(err){
          res.json({status: 'failed', err:err});
        } else {
          res.json(results);
        }
      });
    },
    deleteAppointment: function(req, res){
      Appointment.remove({_id: req.params.id}, function(err, result){
        if(err){
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
};
})();
