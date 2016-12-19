var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  email:{
    type:String,
    required: true,
    minlength:5,
    trim: true
  }
});

var User = mongoose.model('User', userSchema); // a new collection called 'users' should get created

module.exports = {User};
