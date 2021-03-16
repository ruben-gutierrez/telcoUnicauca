const mongoose = require('mongoose');

const { Schema } = mongoose;

const TestMovilSchema = new Schema ({
    // tramas:{ type: String, required:true},
    // inisnr:{ type: String, required:true},
    canal :{ type: String, required:true},
    // modotx :{ type: String, required:true},
    // antenasenb : { type: String, required:true},
    // modelocanal: { type: String, required:true},
    // mcs: { type: String, required:true},
    // bloquerecu:{ type: String, required:true},
    // simsnr:{ type: String, required:true},
    // antenasue:{ type: String, required:true},
    // puerenb:{ type: String, required:true}




    
});



module.exports = mongoose.model('TestMovil', TestMovilSchema);