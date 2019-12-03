const ProyectTelco = require('../models/proyectTelco');
const config = require('../config');
const axios = require("axios");

const ProyectTelcoController={};

ProyectTelcoController.getProyectsTelco= async(req, res) => {
    const proyectTelco = await ProyectTelco.find();
    res.json(proyectTelco);
};
ProyectTelcoController.createProyectTelco= async(req, res) => {
    const proyectTelco = new ProyectTelco(req.body);
    await proyectTelco.save();
    res.json(
        {
            status:'200',
            answer:"ProyectTelco Created"
        }
    );
};
ProyectTelcoController.showProyectTelco= async(req, res) => {
    const proyectTelco = await ProyectTelco.findById(req.params.id);
    res.json(proyectTelco);
};
ProyectTelcoController.updateProyectTelco=async(req, res) => {
    const idProyectTelco = req.params.id;
    const proyectTelco = new ProyectTelco(req.body);
    await ProyectTelco.findByIdAndUpdate(idProyectTelco, {$set: proyectTelco },{ new: true});
    res.json(
        {
            status:'200',
            answer:"ProyectTelco Updated"
        }
    );
};
ProyectTelcoController.deleteProyectTelco=async(req, res) => {
    await ProyectTelco.findByIdAndDelete(req.params.id);
    res.json(
        {
            status:'200',
            answer:"ProyectTelco Delete"
        }
    );
};

module.exports = ProyectTelcoController;