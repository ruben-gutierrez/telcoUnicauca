const mongoose = require('mongoose');


const { Schema } = mongoose;

const ServerSchema = new Schema ({
    name: { type: String, required:true},
    idDomain: { type: String, required:true},
    infoServer: { type: Object}
});

module.exports = mongoose.model('Server', ServerSchema);