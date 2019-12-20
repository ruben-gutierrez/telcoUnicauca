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
                                    let coreAIO = await openstack.createCoreIMS(config.VMcoreIMS.aio , config.idIMS.idImage, config.idIMS.nameKey, config.idIMS.idFlavor, arquitecture.detailNetwork.id);
                                    arquitecture.vmCoreIMS=coreAIO;
                                break;
                            case '2': 
                                    let coreDIST = await openstack.createCoreIMS(config.VMcoreIMS.distributed , config.idIMS.idImage, config.idIMS.nameKey, config.idIMS.idFlavor, arquitecture.detailNetwork.id);
                                        arquitecture.vmCoreIMS=coreDIST;
                                break;
                            case '3':
                                    let coreDISTPSTN = await openstack.createCoreIMS(config.VMcoreIMS.distributedPSTN , config.idIMS.idImage, config.idIMS.nameKey, config.idIMS.idFlavor, arquitecture.detailNetwork.id);
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
    const arquitecture = await Arquitecture.findById(req.params.id);
    let vmupdate;
    let delarray=[];
    let coreupdate=[];
    for await ( [i, vm] of arquitecture.vmCoreIMS.entries()){
        if (vm.infoServer) {
            vmupdate= await openstack.consultServer(vm['infoServer'].id);

            if (vmupdate == 'error') {
                delarray.push(i);
            }else{
    
                vm['infoServer']=vmupdate;
            }
        }
       
       
       
       
    
    }
    

    for (var i = delarray.length - 1; i>=0 ;i--){
        arquitecture.vmCoreIMS.splice(i,1);
    }
    let update=await openstack.updateArquitecture(arquitecture);
    
    res.json(arquitecture);
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