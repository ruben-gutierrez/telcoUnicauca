const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const { Schema } = mongoose;

const UserSchema = new Schema ({
    name: { type: String, required:true},
    email: { type: String, required:true, unique:true},
    password: { type: String, required:true},
    role:{ type: String, required:true},
});







UserSchema.methods.encryptPass = async (password) => {
    const salt =await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

UserSchema.methods.validatePass = function (password) {
    return bcrypt.compare( password, this.password );
}

module.exports = mongoose.model('User', UserSchema);