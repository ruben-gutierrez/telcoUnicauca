const mongoose = require('mongoose');


const { Schema } = mongoose;

const ProyectTelcoSchema = new Schema ({
    name: { type: String, required:true},
    status: { type: String, required:true}
});

module.exports = mongoose.model('ProyectTelco', ProyectTelcoSchema);