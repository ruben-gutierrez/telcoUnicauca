const mongoose = require('mongoose');


const { Schema } = mongoose;

const ServerSchema = new Schema ({
    name: { type: String, required:true},  
    ram: { type: String},
    cpu: { type: String},
    disk: { type: String},
    idImageRebuild: { type: String},   
    idArquitecture: { type: String},   
    infoServer: { type: Object},
    graphs: { type: Array},
    idCacti:{ type:String},
    type:{ type:String}
});

module.exports = mongoose.model('Server', ServerSchema);