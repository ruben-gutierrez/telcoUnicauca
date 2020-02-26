const mongoose = require('mongoose');


const { Schema } = mongoose;

const GraphSchema = new Schema ({
    name: { type: String, required:true},
    idServer: { type: String, required:true},
    idTemplate: { type: String},
    created_at: { type: Date, required: true, default: Date.now },
    infoCacti: { type: Object, required:true},
});


module.exports = mongoose.model('Graph', GraphSchema);