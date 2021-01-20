const mongoose = require('mongoose');


const { Schema } = mongoose;

const ImagenMovilSchema = new Schema ({
    name: { type: String, required:true}
});

module.exports = mongoose.model('ImagenMovil', ImagenMovilSchema);