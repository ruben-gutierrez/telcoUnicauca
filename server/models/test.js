const mongoose = require('mongoose');


const { Schema } = mongoose;

const TestSchema = new Schema ({
    name: { type: String, required:true},
    idDomain: { type: String, required:true},
    idUser: { type: String, required:true},
    type: { type: String, required:true},
    status: { type: String, required:true},
    description: { type: String, required:true},
    descriptionUser: { type: String, required:true}
});


module.exports = mongoose.model('Test', TestSchema);