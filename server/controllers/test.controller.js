const Test = require('../models/test');
const config = require('../config');
const axios = require("axios");

const TestController={};

TestController.getTests= async(req, res) => {
    const test = await Test.find();
    res.json(test);
};
TestController.createTest= async(req, res) => {
    const test = new Test(req.body);
    await test.save();
    res.json(
        {
            status:'200',
            answer:"Test Created"
        }
    );
};
TestController.showTest= async(req, res) => {
    const test = await Test.findById(req.params.id);
    res.json(test);
};
TestController.updateTest=async(req, res) => {
    const idTest = req.params.id;
    const test = new Test(req.body);
    await Test.findByIdAndUpdate(idTest, {$set: test },{ new: true});
    res.json(
        {
            status:'200',
            answer:"Test Updated"
        }
    );
};
TestController.deleteTest=async(req, res) => {
    await Test.findByIdAndDelete(req.params.id);
    res.json(
        {
            status:'200',
            answer:"Test Delete"
        }
    );
};

module.exports = TestController;