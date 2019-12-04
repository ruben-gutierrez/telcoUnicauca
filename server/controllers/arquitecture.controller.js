const Arquitecture = require('../models/arquitecture');
const config = require('../config');
const axios = require("axios");
const openstack = require('../functions/openstack');

const ArquitectureController={};

ArquitectureController.getArquitectures= async(req, res) => {
    const arquitecture = await Arquitecture.find();
    res.json(arquitecture);
};
ArquitectureController.createArquitecture= async(req, res) => {
    const arquitecture = new Arquitecture(req.body);
    //create net
    let network= await openstack.createNetwork(req.body.name);
    if (network != 'error') {
        arquitecture.detail=network.network;
        let subnet= await openstack.createSubnet(arquitecture.detail.id, req.body.domain, req.body.name);
        if (subnet != 'error') {

        }else{
            return 'error al crear la subred'
        }
    }else{
        return 'error al crear la red'
    }
    
        
    
    //create router
    //conect router
    //create vms
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