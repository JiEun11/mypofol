const mongoose = require('mongoose');
const AutoIncrement= require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    status: String,
    createAt: {
        type: Date,
        default: Date.now
    },
    lastUpdateAt: {
        default: Date.now
    }
}, {
//    _id: false,
    versionKey: false
});
schema.plugin(AutoIncrement, {inc_field: 'id'});
// schema.plugin(AutoIncrement, {inc_field: '_id'});

module.exports = mongoose.model('Account', schema);