const mongoose = require('mongoose');


const { Schema } = mongoose;

const ArquitectureSchema = new Schema ({
    name: { type: String, required:true},
    domain: { type: String, required:true},
    type: { type: String, required:true},
    maxRAM: { type: String, required:true},
    maxCore: { type: String, required:true},
    maxVM: { type: String, required:true},
    maxHDD: { type: String, required:true},
    vmCoreIMS: { type: Object},
    vmAditionals: { type: Object},
    tests: { type: Object},
    graphs: { type: Object},
    status: { type: String, required:true},
    detail: { type: Object,required:false}
});

module.exports = mongoose.model('Arquitecture', ArquitectureSchema);