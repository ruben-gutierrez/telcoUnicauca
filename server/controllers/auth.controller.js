const Auth = require('../models/auth');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');



const authController={};

authController.signin= async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email});
    if(!user){
        return res.status(404).json({ auth: false, token: null});
    };
    
    const passIsValid = await user.validatePass(password);
    if (!passIsValid) {
        return res.status(404).json({ auth: false, token: null});
        // return res.status(404).send("The pass incorrect");
    }
    user.password = "";
    const token = jwt.sign({id: user._id}, config.secret,{
        expiresIn: 60 * 60 * 1
    })
    res.json({ auth: true, token: token, user});
};


authController.signup= async(req, res) => {
    const user = new User(req.body);
    user.password = await user.encryptPass(user.password);
    await user.save();
    const token = jwt.sign({id: user._id}, config.secret,{
        expiresIn: 60 * 60 * 1
    })
    res.json(
        {
            auth:"true",
            token: token
        }
    );
};
authController.me= async(req, res) => {
    const user = await User.findById(req.userId, {password:0});
    if (!user) {
        return res.error(404).send("No user Found");
    }
    res.json(
        {
            auth:"200",
            user: user
        }
    );
};



module.exports = authController;