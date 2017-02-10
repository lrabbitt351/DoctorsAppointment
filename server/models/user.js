var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type:String,
    required: [true, 'User name is not provided.'],
    minlength: [3, 'User name is not at least 3 characters in length.'],
    maxlength: [10, 'User name cannot exceed 10 characters in length.']
  },
},
{
  timestamps: true
});


mongoose.model('User', UserSchema);
