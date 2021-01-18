const mongoose = require('mongoose');


const { Schema } = mongoose;

const MachineMovilSchema = new Schema ({
    name: { type: String, required:true},  
    idImageRebuild: { type: String},   
    idArquitecture: { type: String},   
    infoServer: { type: Object},
    graphs: { type: Array},
    idCacti:{ type:String},
    type:{ type:String}
});

module.exports = mongoose.model('MachineMovil', MachineMovilSchema);