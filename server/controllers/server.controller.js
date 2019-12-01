const Server = require('../models/server');
const config = require('../config');
const axios = require("axios");

const ServerController={};

ServerController.getServers= async(req, res) => {
    const server = await Server.find();
    res.json(server);
};
ServerController.createServer= async(req, res) => {
    const server = new Server(req.body);
    await server.save();
    res.json(
        {
            status:'200',
            answer:"Server Created"
        }
    );
};
ServerController.showServer= async(req, res) => {
    const server = await Server.findById(req.params.id);
    res.json(server);
};
ServerController.updateServer=async(req, res) => {
    const idServer = req.params.id;
    const server = new Server(req.body);
    await Server.findByIdAndUpdate(idServer, {$set: server },{ new: true});
    res.json(
        {
            status:'200',
            answer:"Server Updated"
        }
    );
};
ServerController.deleteServer=async(req, res) => {
    await Server.findByIdAndDelete(req.params.id);
    res.json(
        {
            status:'200',
            answer:"Server Delete"
        }
    );
};

module.exports = ServerController;