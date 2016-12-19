const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const connectUrl = `mongodb://localhost:27017/TodoApp`;

mongoose.connect(connectUrl);

module.exports = {mongoose};
