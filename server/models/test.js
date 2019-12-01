const mongoose = require('mongoose');


const { Schema } = mongoose;

const TestSchema = new Schema ({
    name: { type: String, required:true},
    description: { type: String, required:true},
    type: { type: String, required:true},
    file: { type: String, required:true},
    descriptionUser: { type: String, required:true},
    idArquitecture: { type: String, required:true},
    notes: { type: Object, required:true},
    status: { type: String, required:true}
});

module.exports = mongoose.model('Test', TestSchema);