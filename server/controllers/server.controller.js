const Server = require('../models/server');
const Arquitecture = require('../models/arquitecture');
const config = require('../config');
const axios = require("axios");
const openstack = require('../functions/openstack');
const serverFunctions = require('../functions/server');

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
    try {
        const server = await Server.findById(req.params.id)
        if(!server){
            res.json({status:404,
                content:server})
        }else{
            res.json({status:200,
                content:server})

        }
    } catch (error) {
        res.json({status:400,
            content:error})
    }

    // await Server.findById(req.params.id, (error, result)=>{
    //     if(error){
    //         res.json({status:400,
    //                     content:error})
    //     }else{
    //         if(!result){
    //             res.json({status:404,
    //                 content:result})
    //         }else{
    //             res.json({status:200,
    //                 content:result})

    //         }   
    //     }
    // })

  
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
                funOnOff=await openstack.onOffServer(server['infoServer'].id);
                if (funOnOff.response == 'ok'){

                    res.json(
                        {
                            status:'200',
                            answer:'action server',
                            action:funOnOff.action
                        }
                    );
                }else{
                    res.status(
                        {
                            status:'300',
                            answer:'fail action',
                            action:funOnOff.action
                        }
                    );
                }
            break;
        case 'delete':
                try {
                    let server= await Server.findById(req.params.id)
                    await openstack.deleteServer(server['infoServer'].id)
                    
                    let arquitecture= await Arquitecture.findById(server.idArquitecture)
                    if (server.type == 'ims') {
                        arquitecture.vmCoreIMS.forEach(async (vm,index) => { 
                            if ( vm._id.toString()== server._id.toString()) {
                                arquitecture.vmCoreIMS.splice( index, 1 );
                                arquitecture.save()
                                await Server.findByIdAndDelete(server._id.toString())
                                res.json(
                                    {
                                        status:'200',
                                        content:'action server'
                                    }
                                );
                            }
                        });

                    }else{
                        console.log(arquitecture.vmAditionals)
                        arquitecture.vmAditionals.forEach(async (vm,index) => { 
                            console.log(vm._id, server._id)
                            if ( vm._id.toString()== server._id.toString()) {
                                console.log('eliminar maquina adicional')
                                arquitecture.vmAditionals.splice( index, 1 );
                                arquitecture.save()
                                await Server.findByIdAndDelete(server._id.toString())
                                res.json(
                                    {
                                        status:'200',
                                        content:'action server'
                                    }
                                );
                            }
                            
                        });
                    }
                } catch (error) {
                    console.log('error')
                    res.json(
                        {
                            status:'404',
                            content:'Server dont exist'
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
            
           let edit = await openstack.resizeServer(server['infoServer'].id, req.body.dataForm)
           
            if(edit == 'ok'){
                
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
        // console.log("vm aditionals", arquitecture.vmAditionals)
        if (arquitecture.vmAditionals.length > 0) {
            for await ( vm of  arquitecture.vmAditionals ) {
                
                let flavor = await openstack.infoFlavor( vm.infoServer.flavor.id);
                resources.ram += flavor.ram
                resources.disk += flavor.disk
                resources.vcpu += flavor.vcpus
            };
        }
        
        resources.ram = arquitecture.maxRAM - resources.ram
        resources.disk = arquitecture.maxHDD - resources.disk
        resources.vcpu = arquitecture.maxCore - resources.vcpu

        if (resources.ram > 0 && resources.disk > 0 && resources.vcpu > 0) {
            idFlavor = await openstack.consultFlavor({},false, req.body.ram, req.body.disk, req.body.cpu)
            if(idFlavor == '-'){
                idFlavor = await openstack.createFlavor(req.body.ram,req.body.disk, req.body.cpu)  
            }
            // console.log(arquitecture.detailNetwork.id)
           let server= await openstack.createServer(req.body.name, req.body.image, config.idIMS.nameKey, idFlavor,arquitecture.detailNetwork.id, arquitecture._id,'aditional');
           if (server.status==200) {
                // server = await openstack.consultServer(server.content.id)
                // // console.log('ip a agregar',server.addresses[Object.keys(server.addresses)[0]][1].addr)
                // idcacti=await serverFunctions.createServerCacti(server.addresses[Object.keys(server.addresses)[0]][1].addr)
                // // console.log("server created")
                // dataServer={
                //     name : req.body.name,
                //     infoServer : server,
                //     idCacti:idcacti,
                //     idArquitecture:arquitecture._id,
                //     type:'aditional'
                // }
                // const virtualMachine = new Server(dataServer);  
                // await virtualMachine.save();
                
                arquitecture.vmAditionals.push(server.content)
                await openstack.updateArquitecture(arquitecture);
                
                res.json(
                    {
                        status:'200',
                        answer:"Server created",
                        content: server.content
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