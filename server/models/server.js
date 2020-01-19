const mongoose = require('mongoose');


const { Schema } = mongoose;

const ServerSchema = new Schema ({
    name: { type: String, required:true},   
    idImageRebuild: { type: String},   
    infoServer: { type: Object},
    graphs: { type: Object},
    idCacti:{ type:String},
    
});

module.exports = mongoose.model('Server', ServerSchema);