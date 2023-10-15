const mongoose = require('mongoose');

// connecting...
mongoose.connect('mongodb://mydb:mydb@localhost:27017/mydb');

exports.Account = require('./accounts');


