const Server = require('../models/server');
const Arquitecture = require('../models/arquitecture');
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
                Server.findByIdAndDelete(req.params.id);
                
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
            if (await openstack.instantServer(server['infoServer'].id, req.params.id) == 'ok'){
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
            if (await openstack.rebuildServer(server['infoServer'].id, server.idImageRebuild) == 'ok'){
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
                        status:'400',
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

ServerController.addServerArquitecture= async (req, res) => {
    let idFlavor
    let resources={
        ram:0,
        disk:0,
        vcpu:0
    }
    let arquitecture = await Arquitecture.findById(req.params.id);
    // console.log(req.body)
    if (arquitecture.vmAditionals.length < arquitecture.maxVM) {
        for await ( vm of  arquitecture.vmCoreIMS ) {
            let flavor = await openstack.infoFlavor( vm.infoServer.flavor.id);
            resources.ram += flavor.ram
            resources.disk += flavor.disk
            resources.vcpu += flavor.vcpus
        };
        resources.ram = arquitecture.maxRAM - resources.ram
        resources.disk = arquitecture.maxHDD - resources.disk
        resources.vcpu = arquitecture.maxCore - resources.vcpu

        if (resources.ram > 0 && resources.disk > 0 && resources.vcpu > 0) {
            idFlavor = await openstack.consultFlavor({},false, req.body.ram, req.body.disk, req.body.cpu)
            if(idFlavor == '-'){
                idFlavor = await openstack.createFlavor(req.body.ram,req.body.disk, req.body.cpu)  
            }
            // console.log(arquitecture.detailNetwork.id)
           let server= await openstack.createServer(req.body.name, req.body.image, 'ims', idFlavor,arquitecture.detailNetwork.id);
           if (server.status==200) {
                server = await openstack.consultServer(server.content.id)
                // console.log(server)
                dataServer={
                    name : req.body.name,
                    infoServer : server
                }
                const virtualMachine = new Server(dataServer);  
                await virtualMachine.save();
                
                arquitecture.vmAditionals.push(virtualMachine)
                await openstack.updateArquitecture(arquitecture);
                
                res.json(
                    {
                        status:'200',
                        answer:"Server created",
                        content: virtualMachine
                    }
                );
            }
            
           
        }
       
       
    
    }
    // else{
        res.status(
            {
                status:'400',
                answer:"Server create error",
                content: "vm aditional is full"
            }
        );
    // } 
};

module.exports = ServerController;