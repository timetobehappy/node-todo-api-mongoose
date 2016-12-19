const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const connectUrl = process.env.MONGODB_URI || `mongodb://localhost:27017/TodoApp`;

mongoose.connect(connectUrl);

module.exports = {mongoose};
