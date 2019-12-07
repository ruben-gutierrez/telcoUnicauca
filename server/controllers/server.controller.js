const Server = require('../models/server');
const config = require('../config');
const axios = require("axios");
const openstack = require('../functions/openstack');

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
ServerController.actionsServer=async(req, res) => {
    const server = await Server.findById(req.params.id);
    switch (req.body.action) {
        case 'on/off':
    //             consolse.log(server['infoServer'].id)
                // console.log(server);
                if (await openstack.onOffServer(server['infoServer'].id) == 'ok'){

                    res.json(
                        {
                            status:'200',
                            answer:'action server'
                        }
                    );
                }else{
                    res.status(
                        {
                            status:'300',
                            answer:'fail action'
                        }
                    );
                }
            break;
        case 'delete':
            if (await openstack.deleteServer(server['infoServer'].id) == 'ok'){
                res.json(
                    {
                        status:'200',
                        answer:'action server'
                    }
                );
            }else{
                res.status(
                    {
                        status:'300',
                        answer:'fail action'
                    }
                );
            }
            break;
        case 'instant':
            if (await openstack.instantServer(server['infoServer'].id) == 'ok'){
                res.json(
                    {
                        status:'200',
                        answer:'action server'
                    }
                );
            }else{
                res.status(
                    {
                        status:'300',
                        answer:'fail action'
                    }
                );
            }
            break;
        case 'rebuild':
            if (await openstack.rebuildServer(server['infoServer'].id) == 'ok'){
                res.json(
                    {
                        status:'200',
                        answer:'action server'
                    }
                );
            }else{
                res.status(
                    {
                        status:'300',
                        answer:'fail action'
                    }
                );
            }
            break;
        case 'console':
            let consoleVm = await openstack.consoleServer(server['infoServer'].id);
            if ( consoleVm != 'error'){
                res.json(
                    {
                        status:'200',
                        answer:'action server',
                        consoleLink: consoleVm
                    }
                );
            }else{
                res.status(
                    {
                        status:'300',
                        answer:'fail action'
                    }
                );
            }
            break;
    
        case 'resize':
            if(await openstack.resizeServer(server['infoServer'].id, req.body.dataForm) == 'ok'){
                res.json(
                    {
                        status:'200',
                        answer:'action server'
                    }
                );
            }else{
                res.status(
                    {
                        status:'300',
                        answer:'fail action'
                    }
                );
            }
            
            break;
    
        default:
                res.status(
                    {
                        status:'300',
                        answer:'fail action'
                    }
                );
            break;
    }

   
    
};



module.exports = ServerController;