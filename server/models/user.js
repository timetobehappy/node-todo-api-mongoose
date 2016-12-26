const mongoose = require('mongoose');
const validator = require('validator');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
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
userSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject(); // takes mongooser object user and converts it to a regular object where only the properties available on the document exist.

    return _.pick(userObject, ['_id', 'email']);
};

userSchema.methods.generateAuthToken = function() {
    var user = this; // Instance methods get called with the doc as the this binding
    var access = 'auth';

    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, rahas_thak).toString();

    user.tokens.push({
        access,
        token
    });

    return user.save().then(() => {
        return token;
    });
};


userSchema.statics.findByToken = function(token) { //Model methods
    var User = this; // Model methods get called with model as the this binding

    var decoded;

    try {
        decoded = jwt.verify(token, rahas_thak); //Happy path
    } catch (e) {
        return Promise.reject('jwt failure'); // or below will also work
        // return new Promise((resolve, reject)=>{
        //   reject();
        // });
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};


userSchema.pre('save', function(next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            //console.log('Salt is ', salt);
            bcrypt.hash(user.password, salt, (err, hash) => {
                //console.log('Hashed value is :', hash);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});






var User = mongoose.model('User', userSchema); // a new collection called 'users' should get created

module.exports = {
    User
};
