const Arquitecture = require('../models/arquitecture');
const Server = require('../models/server');
const config = require('../config');
const axios = require("axios");
const openstack = require('../functions/openstack');
const serverFunctions = require('../functions/server');

const ArquitectureController={};

ArquitectureController.getArquitectures= async(req, res) => {
    let arquitecturedb = await Arquitecture.find();
    for await (arquitecture of arquitecturedb){
       await  openstack.showArquitecture(arquitecture._id)
    }
    arquitecturedb = await Arquitecture.find();
    res.json(arquitecturedb);
};
ArquitectureController.createArquitecture= async(req, res) => {
    const arquitecture = new Arquitecture(req.body);
    //create net
    let network= await openstack.createNetwork(req.body.name);
    // console.logs(network)
   
    if (network.status == 200 ) {
        arquitecture.detailNetwork=network.content;
        let subnet= await openstack.createSubnet(arquitecture.detailNetwork.id, req.body.domain, req.body.name);
        
        if (subnet.status == 200) {
            arquitecture.detailSubnetwork=subnet.content;
            let router= await openstack.createRouter(req.body.name);
            
            if (router.status == 200) {
                arquitecture.detailRouter=router.content;
               
                let conect = await openstack.conectPublicRouter( arquitecture.detailRouter.id );
                if (conect.status == 200) {
                    arquitecture.detailRouter=conect.content;
                    
                    let conectPrivate = await openstack.conectPrivateRouter( arquitecture.detailRouter.id,arquitecture.detailSubnetwork.id );
                    if ( conectPrivate != 'error' ) {
                        
                        switch (arquitecture.type) {
                            case '1':
                                    let coreAIO = await openstack.createCoreIMS(config.VMcoreIMS.aio , config.idIMS.idImage, config.idIMS.nameKey, config.idIMS.idFlavor, arquitecture.detailNetwork.id, arquitecture._id,config.idIMS.idFlavor1);
                                    arquitecture.vmCoreIMS=coreAIO;
                                break;
                            case '2': 
                                    let coreDIST = await openstack.createCoreIMS(config.VMcoreIMS.distributed , config.idIMS.idImage, config.idIMS.nameKey, config.idIMS.idFlavor, arquitecture.detailNetwork.id,arquitecture._id,config.idIMS.idFlavor1);
                                        arquitecture.vmCoreIMS=coreDIST;
                                break;
                            case '3':
                                    let coreDISTPSTN = await openstack.createCoreIMS(config.VMcoreIMS.distributedPSTN , config.idIMS.idImage, config.idIMS.nameKey, config.idIMS.idFlavor, arquitecture.detailNetwork.id, arquitecture._id,config.idIMS.idFlavor1);
                                    arquitecture.vmCoreIMS=coreDISTPSTN;
                                break;
                        
                            default:
                                console.log('error tipo de arquitectura')
                                break;
                        }
                        
                        if (arquitecture.vmCoreIMS.length === 0 ) {
                            let answererror = await openstack.deleteRouter(arquitecture.detailRouter.id)
                            answererror = await openstack.deleteNetwork(arquitecture.detailNetwork.id)

                            console.log('error conectando router')
                            res.json(
                                {
                                    status:'403',
                                    answer:"Error conect router"
                                }
                            );      

                        }else{
                            await arquitecture.save();
                            res.json(
                                {
                                    status:'200',
                                    answer:"Arquitecture Created"
                                }
                            );
                        }

                        
                    }else{
                        
                        let answererror = await openstack.deleteRouter(arquitecture.detailRouter.id)
                        answererror = await openstack.deleteNetwork(arquitecture.detailNetwork.id)

                        console.log('error conectando router')
                        res.status(
                            {
                                status:'403',
                                answer:"Error conect router"
                            }
                        );
                    }
                }else{
                     
                    let answererror = await openstack.deleteRouter(arquitecture.detailRouter.id)
                    answererror = await openstack.deleteNetwork(arquitecture.detailNetwork.id)
                     console.log('error conectando router');
                     res.json(
                        {
                            status:'403',
                            answer:"Error conect router"
                        }
                    );
                }
            }else{
                
                
                answererror = await openstack.deleteNetwork(arquitecture.detailNetwork.id)
                console.log('error creando router');
                res.json(
                    {
                        status:'403',
                        content:"Error create router"
                    }
                );
            }
        }else{
            
            let answererror = await openstack.deleteNetwork(arquitecture.detailNetwork.id)
            console.log('error creando subnet');
            // console.log(answererror)
            res.json(
                {
                    status:'403',
                    content:"Error create subnet"
                }
            );
        }
    }else{
        console.log('error creando red');
        res.status(
            network
        );
    }
    
    
};
ArquitectureController.showArquitecture= async(req, res) => {
    try {
        const arquitecture = await Arquitecture.findById(req.params.id);
        if(!arquitecture){
            res.json({status:404,
                content:arquitecture,
            coment:"resource dont exist"})
        }
        else{
            let core=[]
            let core2=[]
            let vmupdate;
            let delarray=[];
            let coreupdate=[];
            
            if (arquitecture.vmCoreIMS.length > 0) {
                for await ( [i, vm] of arquitecture.vmCoreIMS.entries()){
                
                    let vmdb=await Server.findById(vm._id)
                    // console.log('error',vmdb.infoServer)
                    if (vmdb['infoServer']) {
                        vmupdate= await openstack.consultServer(vmdb['infoServer'].id);
            
                        if (vmupdate == 'error') {
                           /*  delarray.push(i); */
                            // await Server.findByIdAndDelete(vm._id)
                            core.push(vm)
                        }else{
                            vmdb['infoServer']=vmupdate;
                            await vmdb.save();
                            core.push(vmdb)
                        }
                    }else{
                        delarray.push(i); 
                        // await Server.findByIdAndDelete(vm._id)
                        // core.push(vm)
                    }
                }
                for (var i = delarray.length - 1; i>=0 ;i--){
                    arquitecture.vmCoreIMS.splice(i,1);
                } 
                arquitecture.vmCoreIMS=core
            } 
            
            delarray=[];
            // // console.log(arquitecture.vmAditionals)  
            if (arquitecture.vmAditionals.length > 0) {
                for await ( [i, vm2] of arquitecture.vmAditionals.entries()){
                    let vm2db=await Server.findById(vm2._id)
                    // console.log(vm2db)
                    if (vm2db['infoServer']) {
                        vmupdate2= await openstack.consultServer(vm2db['infoServer'].id);
                         
                        if (vmupdate2 == 'error') {
                            // Server.findByIdAndDelete(vm2._id)
                            /* delarray.push(i); */
                            core2.push(vm2db)
                        }else{
                            vm2db['infoServer']=vmupdate2;
                            await vm2db.save();
                            core2.push(vm2db)
                        }
                    }else{
                        delarray.push(i); 
                        // Server.findByIdAndDelete(vm2._id)
                        // core2.push(vm2)
                    }
                }
            
                 for (var i = delarray.length - 1; i>=0 ;i--){
                    arquitecture.vmAditionals.splice(i,1);
                } 
                arquitecture.vmAditionals=core2
            }
           
        
            
            let update=await openstack.updateArquitecture(arquitecture); 
            res.json({status:200,
                content:arquitecture})

        }
    } catch (error) {
        res.json({status:400,
            content:error,
        coment:'error of information'})
    }


   
};
ArquitectureController.updateArquitecture=async(req, res) => {
    const idArquitecture = req.params.id;
    const arquitecture = new Arquitecture(req.body);
    console.log(req.body)
    await Arquitecture.findByIdAndUpdate(idArquitecture, {$set: arquitecture },{ new: true});
    res.json(
        {
            status:'200',
            answer:"Arquitecture Updated"
        }
    );
};
ArquitectureController.dropArquitecture=async(req, res) => {
    
    try {
       
        
            console.log(req.params.id)
            await Arquitecture.findByIdAndUpdate(req.params.id, { status: 'public' },{ new: true});
            res.json(
                {
                    status:'200',
                    answer:"Arquitecture Updated"
                }
            );
        
    } catch (error) {
        res.json(
            {
                status:'404',
                answer:"Resource dont exist"
            }
        );
    }
   
   
    
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