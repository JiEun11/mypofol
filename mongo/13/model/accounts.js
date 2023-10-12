const mongoose = require('mongoose');
const AutoIncrement= require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
    id: Number,
    name: String,
    password: String,
    regDate: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});
schema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model('Account', schema);