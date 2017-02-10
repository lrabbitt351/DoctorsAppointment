var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function(req, res){
  return {
  login: function(req, res){
    User.findOne({name: req.body.name}, function(err, user){
      if(err){
        console.log(err);
        res.json(err);
      } else {
        if(!user){
          var newUser = new User(req.body);
          newUser.save(function(err, data){
            req.session.user = newUser;
            req.session.save();
            res.json(data);
          });
        }else{
          req.session.user = user;
          req.session.save();
          res.json(user);
        }
      }
    });
  },
  checkStatus: function(req, res){
    if(req.session.user){
      res.json(req.session.user);
    }else{
      res.json(null);
    }
  },
  logout: function(req, res){
    req.session.destroy();
    res.redirect('/');
  },
  index: function(req, res){
    User.find({}, function(err, data){
      if(err){
        res.json(err);
      } else {
        res.json(data);
      }
    });
  },
  getUser: function(req, res){
  User.findOne({_id: req.session.user}, function(err, user){
    if(err){
        res.json(err);
      } else {
        res.json(user);
      }
    });
  },
};
})();
