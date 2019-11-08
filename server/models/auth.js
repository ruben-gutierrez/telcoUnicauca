const mongoose = require('mongoose');

const { Schema } = mongoose;

const AuthSchema = new Schema ({
    name: { type: String, required:true},
    pass: { type: String, required:true},
    email:{ type: String, required:true}
});

module.exports = mongoose.model('Auth', AuthSchema);