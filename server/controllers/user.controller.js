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
    const user = new User(req.body);
    user.password = await user.encryptPass(user.password);
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