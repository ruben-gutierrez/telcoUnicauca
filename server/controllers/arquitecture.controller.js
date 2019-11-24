const Arquitecture = require('../models/arquitecture');
const config = require('../config');
const axios = require("axios");

const ArquitectureController={};

ArquitectureController.getArquitectures= async(req, res) => {
    const arquitecture = await Arquitecture.find();
    res.json(arquitecture);
};
ArquitectureController.createArquitecture= async(req, res) => {
    const arquitecture = new Arquitecture(req.body);
    await arquitecture.save();
    res.json(
        {
            status:'200',
            answer:"Arquitecture Created"
        }
    );
};
ArquitectureController.showArquitecture= async(req, res) => {
    const arquitecture = await Arquitecture.findById(req.params.id);
    res.json(arquitecture);
};
ArquitectureController.updateArquitecture=async(req, res) => {
    const idArquitecture = req.params.id;
    const arquitecture = new Arquitecture(req.body);
    await Arquitecture.findByIdAndUpdate(idArquitecture, {$set: arquitecture },{ new: true});
    res.json(
        {
            status:'200',
            answer:"Arquitecture Updated"
        }
    );
};
ArquitectureController.deleteArquitecture=async(req, res) => {
    await Arquitecture.findByIdAndDelete(req.params.id);
    res.json(
        {
            status:'200',
            answer:"Arquitecture Delete"
        }
    );
};

module.exports = ArquitectureController;