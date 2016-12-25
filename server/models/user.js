const mongoose = require('mongoose');
const validator = require('validator');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const _ = require('lodash');



const rahas_thak = process.env.RAHAS_THAK;

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'User email required'],
        minlength: 5,
        trim: true,
        unique: true,
        validate: {
            validator: (value) => {

                return validator.isEmail(value);
            },
            message: '{VALUE} is not a valid email!'
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 8

    },

    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

//Override to determine what data gets send back when model is converted to a JSON value
userSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject(); // takes mongooser object user and converts it to a regular object where only the properties available on the document exist.

  return _.pick(userObject, ['_id', 'email']);
};

userSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';

    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, rahas_thak).toString();

    user.tokens.push({access, token});

    return user.save().then(()=>{
      return token;
    });
};









var User = mongoose.model('User', userSchema); // a new collection called 'users' should get created

module.exports = {
    User
};
