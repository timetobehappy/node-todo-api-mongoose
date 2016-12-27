
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todoSchema = new Schema({
  text:{
    type:String,
    required: true,
    minlength:1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {
    type: Schema.Types.ObjectId,
    required: true

  }
});

var Todo = mongoose.model('Todo', todoSchema); // a new collection called 'todos' should get created

module.exports = {Todo};
