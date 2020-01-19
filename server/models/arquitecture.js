const mongoose = require('mongoose');


const { Schema } = mongoose;

const ArquitectureSchema = new Schema ({
    name: { type: String, required:true},
    domain: { type: String, required:true},
    type: { type: String, required:true},
    maxRAM: { type: Number, required:true},
    maxCore: { type: Number, required:true},
    maxVM: { type: Number, required:true},
    maxHDD: { type: Number, required:true},
    status: { type: String, required:true},
    vmCoreIMS: { type: Array},
    vmAditionals: { type: Array},
    tests: { type: Object},
    graphs: { type: Object},
    detailNetwork: { type: Object},
    detailSubnetwork: { type: Object},
    detailRouter: { type: Object}
});

module.exports = mongoose.model('Arquitecture', ArquitectureSchema);