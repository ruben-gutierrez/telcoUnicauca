const mongoose = require('mongoose');

const { Schema } = mongoose;

const TestMovilSchema = new Schema ({
    idMv:{ type: String, required:true},
    name:{type: String, required:true},
    ipFlotante:{type: String, required:true},
    tramas:{ type: String, required:true},
    inisnr:{ type: String},
    canal :{ type: String},
    modotx :{ type: String},
    antenasenb : { type: String},
    modelocanal: { type: String},
    mcs: { type: String},
    bloquerecu:{ type: String},
    simsnr:{ type: String},
    antenasue:{ type: String},
    puerenb:{ type: String},
    infoResult: { type: Object},   
});



module.exports = mongoose.model('TestMovil', TestMovilSchema);