const mongoose = require('mongoose');

const { Schema } = mongoose;

const TestMovilSchema = new Schema ({
    name: { type: String, required:true},
    email: { type: String, required:true, unique:true},
    password: { type: String, required:true},
    role:{ type: String, required:true},
});



module.exports = mongoose.model('TestMovil', TestMovilSchema);