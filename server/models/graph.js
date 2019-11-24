const mongoose = require('mongoose');


const { Schema } = mongoose;

const GraphSchema = new Schema ({
    name: { type: String, required:true},
    idDomain: { type: String, required:true},
    idServer: { type: String, required:true},
    idUser: { type: String, required:true},
    type: { type: String, required:true},
    parameters: { type: String, required:true},
});


module.exports = mongoose.model('Graph', GraphSchema);