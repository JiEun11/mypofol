const mongoose = require('mongoose');
//mongoose.set('useFindAndModify', false);
// mongoose.set('bufferCommands', false);

mongoose.connect('mongodb://mydb:mydb@localhost:27017/mydb');

exports.Account = require('./accounts');

