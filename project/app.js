var connectionString = 'mongodb://127.0.0.1:27017/BonAppetit';

if(process.env.MONGODB_URI) {
    connectionString = process.env.MONGODB_URI;
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;

require('./services/user.service.server');
require('./services/restaurant.service.server');