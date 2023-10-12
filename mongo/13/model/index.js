const mongoose = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence');
//mongoose.set('useFindAndModify', false);
// mongoose.set('bufferCommands', false);

exports.MongoDB = {
    connect: () => {
        mongoose.connect('mongodb://mydb:mydb@localhost:27017/mydb');
    }
};


exports.Account = require('./accounts');

