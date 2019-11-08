const User = require('../models/user');
const userController={};

userController.getUsers= async(req, res) => {
    const users = await User.find();
    res.json(users);
};

userController.createUser=async(req, res) => {
    const user = new User(req.body);
    // console.log(user);
    user.password = await user.encryptPass(user.password);
    console.log(user.password);
    await user.save();
    res.json(
        {status:"User saved"}
    );
};
userController.showUser=async(req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
};
userController.updateUser=async(req, res) => {
    const idUser = req.params.id;
    const user = {
        name: req.body.name,
        identification: req.body.identification,
        role: req.body.role
    };
    await User.findByIdAndUpdate(idUser, {$set: user },{ new: true});
    res.json(
        {status:"User Updated"}
    );
};
userController.deleteUser=async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json(
        {status:"User Deleted"}
    );
};

module.exports = userController;