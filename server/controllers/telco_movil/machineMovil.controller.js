const MachineMovil = require('../../models/server');
const ImagenMovil = require('../../models/telco_movil/imagenMovil');
const config = require('./../../config');
const openstack = require('../../functions/openstack');

const MachineMovilController={};



//Encontrar todas las maquinas consultando de la bd MONGODB
MachineMovilController.getMachinesMovil=async(req, res)=>{
    const server = await MachineMovil.find( { idArquitecture : 'machineProyectMovil'} );

    res.json(server);
    
};



//Crear las maquinas

MachineMovilController.createMachineMovil=async(req, res)=>{

  let  token = await openstack.createToken(config.proyectMovil.username, config.proyectMovil.projectName, config.proyectMovil.projectDomainName, config.proyectMovil.userDomainName, config.proyectMovil.password, config.proyectMovil.authURL)

    let server = await openstack.createOnlyServer( req.body.name, config.proyectMovil.idImageOAI, 'ims', config.proyectMovil.idFlavorOAI,config.proyectMovil.idNetworkProjectMovil, token);
  
    //valida el estado de respuesta de la funcion createOnlyServer
   await openstack.sleep(8000);
   var consServer= await openstack.consultServer(server.content.id);
    // console.log(consServer);

    if( server.status ){ //investigar que significa esta linea de codigo  if( varibale )
        if( server.status == 200){            
                var server1 = new MachineMovil(req.body);
                // server1.infoServer = server.content;
                server1.infoServer = consServer;
                server1.idArquitecture = req.body.idArq
                console.log(server.content.id);  
                server1.cpu=req.body.cpu;
                server1.ram=req.body.ram;
                server1.disk=req.body.disk;
                // server1.infoServer.address=consServer.content;
                // console.log(server1)
                await server1.save();
            res.json({
                status:'200',
                answer:"server Created",
                content: server
            })
        }else{
            res.json({
                status:'400',
                answer:"server Not created",
                content: server
            })
        }
    }else{
        res.json({
            status:'400',
            answer:"Error function create server",
            content: server
        })
    }
    
};



//Encontrar una maquina por ID (404=no encontrado, 200=OK, 400=)


   
// let consulMachine=await openstack.consultServer(server.content.id);
//                 console.log("guardar en bd")
//                 console.log(consulMachine);
    
MachineMovilController.showMachineMovil = async(req, res)=>{
    try{        
        const server = await MachineMovil.findById(req.params.id)
        if(!server){
            res.json({status:404,
                content:server
            })
        }else{
            res.json({status:200,
                content:server
            })
        }
    }catch(error){
        res.json({status:400,
            content:error

        })

    }
};
//EDITAR maquinas 
MachineMovilController.updatedMachineMovil=async(req,res) => {
    const idServer = req.params.id;
    const server = new MachineMovil(req.body);
    await MachineMovil.findByIdAndUpdate(idServer, {$set: server }, {new:true});
    res.json({
        status:'200',
        answer: "Server Update"

    });
};


MachineMovilController.deleteMachineMolvil=async(req, res)=>{
    await MachineMovil.findByIdAndDelete(req.params.id);
    res.json({
        status:'200',
        answer:"Server Delete"
    });
};
//imagenes

MachineMovilController.getImagesMovil=async(res, req)=>{
const imagen = await ImagenMovil.find();
res.json(imagen)
}

MachineMovilController.createImagenMovil=async(req, res)=>{
    
    const server = new ImagenMovil(req.body);
    await server.save();
    res.json({
        status:'200',
        answer:"server Created",
        content: server
    })
    
};

MachineMovilController.addMachineOp= async (req, res) => {
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




module.exports = MachineMovilController;