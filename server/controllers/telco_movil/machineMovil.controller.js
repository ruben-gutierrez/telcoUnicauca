const machineMovil = require('../../models/telco_movil/machineMovil');
const MachineMovil = require('../../models/telco_movil/machineMovil');

const MachineMovilController={};



//Encontrar todas las maquinas 
MachineMovilController.getMachinesMovil=async(req, res)=>{
    const server = await MachineMovil.find();
    res.json(server);
    
};
//Crear las maquinas

MachineMovilController.createMachineMovil=async(req, res)=>{
    //tarea
    // crear y asignar una variable con el token

    //una variable con el nombre de la maquina

    // una variable con el id de la imagen a usar


    const server = new MachineMovil(req.body);
    server.save();
    res.json({
        status:'200',
        answer:"server Created",
        content: server
    })
    
};

//Encontrar una maquina por ID (404=no encontrado, 200=OK, 400=)

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
//Editar una maquina
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



module.exports = MachineMovilController;