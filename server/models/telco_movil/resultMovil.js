const mongoose = require('mongoose');
const { json } = require('restler');


const { Schema } = mongoose;

const ResultMovilSchema = new Schema ({
    // name: { type: String, required:true},  
    idPrueba: { type: String},   
    // idMv: { type: String},   
    infoResult: { type: Object},
    infoPrueba:{type:Object}
    //graphs: { type: Array},
    //idCacti:{ type:String},
    //type:{ type:String}
});

module.exports = mongoose.model('ResultMovil', ResultMovilSchema);