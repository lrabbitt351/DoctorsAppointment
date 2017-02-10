var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AppointmentSchema = new Schema({
  patient: {
    type:String,
  },
  date: {
    type:String,
    required: [true, 'Date must be provided.'],
  },
  time: {
    type:String,
    required: [true, 'Time must be provided.']
  },
  complaint: {
    type:String,
    required: true,
    minlength: [10, 'Complaint must be at least 10 characters in length.']
  },
    _user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  },
},
{
  timestamps: true
});


mongoose.model('Appointment', AppointmentSchema);
