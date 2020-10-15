const config = require('../config');
const axios = require("axios");
const Server = require('../models/server');
const openstack = require('../functions/openstack')
const serverFunctions = require('../functions/server')
const graphFunctions = require('../functions/graph')
const Arquitecture = require('../models/arquitecture');
let fs = require('fs');
var SSH = require('simple-ssh');
const { stdout } = require('process');
const exec = require('child_process').exec;
 
async function updateArquitecture(data) {
    // console.log(data)
    const idArquitecture = data._id;
    const arquitecture = new Arquitecture(data);
    await Arquitecture.findByIdAndUpdate(idArquitecture, {$set: arquitecture },{ new: true})
    
    return 'ok'
}
async function createNetwork(nameNet) {
    let answer={
        'status': 400,
        'content' :'Bad Request',
        'error': null
    } 
    data={
        "network": {
            "name": nameNet, 
            "description": "telcoIMS",
            "admin_state_up": true
        }
    }
    await axios.post('http://'+config.ipOpenstack+':9696/v2.0/networks', data,config.headersOpenStack )
      .then(function (response) {
        if (response.data.network) {
            answer.status = 200
           answer.content=response.data.network
           
        }else{
            answer.status = 401
            answer.content=null
            answer.error=response.data
        }
        
      })
      .catch(error =>{
        answer.status = 400
        answer.content="error"
        answer.error=error
      });
    return answer

    
}
async function createSubnet(idNet,ipNet,name) {
    let answer={
        'status': 400,
        'content' :'Bad Request',
        'error': null
    } 
    data={
        "subnet": {
            "ip_version": '4', 
            "network_id": idNet,
            "dns_nameservers": ["8.8.8.8", "8.8.4.4"], 
            "cidr": ipNet+'/24', 
            "name": name
        }
    }
    await axios.post('http://'+config.ipOpenstack+':9696/v2.0/subnets', data,config.headersOpenStack )
      .then(function (response) {
        //   console.log(response.data)

        if (response.data.subnet) {
            answer.status = 200
           answer.content=response.data.subnet
           answer.error=null
        }else{
            answer.status = 401
            answer.content=null
            answer.error=response.data
        }
      })
      .catch(error =>{
        answer.status = 400
        answer.content=null
        answer.error=error
      });
      return answer;
    
}
async function createRouter(name) {
    let answer={
        'status': 400,
        'content' :'Bad Request',
        'error': null
    } 
    data={
        "router": {
            "name": name, 
            "admin_state_up": true
        }
    }
    await axios.post('http://'+config.ipOpenstack+':9696/v2.0/routers', data,config.headersOpenStack )
      .then(function (response) {
        if (response.data.router) {
            answer.status = 200
           answer.content=response.data.router
           answer.error=null
        }else{
            answer.status = 401
            answer.content=null
            answer.error=response.data
        }
      })
      .catch(error =>{
        answer.status = 400
        answer.content=null
        answer.error=error
      });
      return answer;
}
async function conectPublicRouter( idrouter ) {
    let answer={
        'status': 400,
        'content' :'Bad Request',
        'error': null
    }
    let conect
    data={
        "router": {
            "external_gateway_info": {
                "network_id": config.idNetPublic
            }
        }
    }
    await axios.put('http://'+config.ipOpenstack+':9696/v2.0/routers/'+ idrouter , data,config.headersOpenStack )
      .then(function (response) {
        if (response.data.router) {
            answer.status = 200
           answer.content=response.data.router
           answer.error=null
        }else{
            answer.status = 401
            answer.content=null
            answer.error=response.data
        }
      })
      .catch(error =>{
        answer.status = 400
        answer.content=null
        answer.error=error
      });
      return answer;
}
async function conectPrivateRouter( idrouter,idSubnet ) {
    let conect;
    data={
        "subnet_id": idSubnet
    }
    await axios.put('http://'+config.ipOpenstack+':9696/v2.0/routers/'+  idrouter  +'/add_router_interface' , data,config.headersOpenStack )
      .then(function (response) {
        conect=response.data;
        
      })
      .catch(error =>{
         conect='error'
      });
    return conect;
}

async function createServer( name, idImage, nameKey, idFlavor, idNet,idArquitecture=any,typeVM ) {
    let server;
    let answer={
        'status': 400,
        'content' :'Bad Request',
        'error': null
    }
    let file
    try {
        console.log(name)
        // file = fs.readFile('server/scripts/coreIMS/sipp.sh', 'utf-8');
        // file = fs.readFileSync('/home/telcoims/telcoUnicauca/server/scripts/coreIMS/sipp.sh', 'utf-8');
        file = fs.readFileSync('/home/telcoims/telcoUnicauca/server/scripts/coreIMS/'+name+'.sh', 'utf-8');
        // console.log('archivo',file)
      } catch (err) {''
          console.log("fallo el archivo")
        // file="apt install snmpd -y"
        file="echo 'apt install snmpd -y'>testFile"
    }
   
    let body={
        "server": {
            "name": name, 
            "imageRef": idImage, 
            "flavorRef": idFlavor, 
            "key_name": nameKey,
            "min_count": 1, 
            "max_count": 1, 
            "networks": [{"uuid": idNet}],
            // "personality":[{"path":"/root/", "contents": file}]
        }
    }
//ssh -i nameKey ubuntu@ipFlotante
   
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers', body,config.headersOpenStack )
            .then(function (response) {
                
                if (response.data.server) {
                   
                    answer.status = 200
                   answer.content=response.data.server
                   answer.error=null
                }else{
                   
                    answer.status = 401
                    answer.content=null
                    answer.error=response.data
                }
            })
            .catch(error =>{
                // console.log("error creando servidor -------------------------------------------------------")
                console.log(error.response.data.badRequest)
                answer.status = 400
                answer.content=null
                answer.error=error
            });
    await sleep(10000)
    
    let portDevice;
    // console.log(answer)
   console.log("consultando puerto")
    await axios.get('http://'+config.ipOpenstack+':9696/v2.0/ports?device_id='+answer.content.id, config.headersOpenStack )
    .then(function (response) {
     portDevice= response.data.ports[0].id
    //  console.log(response)
    })
    .catch(error =>{
       console.log('error consult ports', error)
    });
    let body2={
        "floatingip": {
            "floating_network_id": config.idNetPublic,
            "port_id": portDevice
        }
    }
    await axios.post('http://'+config.ipOpenstack+':9696/v2.0/floatingips', body2, config.headersOpenStack )
    .then( data =>{
       // console.log(data)
    })
    .catch(error =>{
    console.log('error dd ip float', error)
    })
    await sleep(10000)
    answer.content= await openstack.consultServer(answer.content.id);
    
    
    ipfloat=answer.content.addresses[Object.keys(answer.content.addresses)[0]][1].addr;
    //create user and pass
    


    if (name != 'aio') {
        
        keyPair=fs.readFileSync('server/key.pem', {
            encoding: 'utf8',
          })
    
          var ssh = new SSH({
            host: ipfloat,
            user: 'ubuntu',
            key: keyPair
        });
        
        
        ssh.exec('sudo apt-get install snmpd -y'),
        ssh.exec("sudo sed -i'.bak' '/agentAddress  udp:127.0.0.1:161/d' /etc/snmp/snmpd.conf"),
        ssh.exec("sudo sed -i'.bak' '17i\agentAddress udp:161,udp6:[::1]:161' /etc/snmp/snmpd.conf"),
        ssh.exec("sudo service snmpd restart"),
        ssh.exec("sudo useradd telcoims"),
        ssh.exec("echo telcoims:telcoims | sudo chpasswd"),
        ssh.exec("sudo sed -i '$a telcoims    ALL=(ALL:ALL) ALL' /etc/sudoers"),
    
    
        //install scripts functions coreIMS
        ssh.exec("sudo echo '"+file+"'>fileScript"),
        ssh.exec("sudo chmod 775 fileScript"),
        ssh.exec("./fileScript",{
            pty: true,
            out: console.log.bind(console),
        })
        .start();
    }
    

    console.log('ipFloating',ipfloat)
    // if (answer.content.addresses.length > 0) {
    if (ipfloat) {
        idcacti=await serverFunctions.createServerCacti(ipfloat)
            // console.log('idCacti',idcacti)
    }else{
        idcacti=null
    }
    let serverSave={
        name: name,   
        infoServer: answer.content,
        idCacti:idcacti,
        idArquitecture:idArquitecture,
        type: typeVM
    }
    let serverdb = new Server(serverSave);
    await serverdb.save( );

    //import graphs automatics
    console.log('idServerCacti',serverdb.idCacti)
    if (serverdb.idCacti != null) {
        graphFunctions.importGraphAutomatics(serverdb._id,serverdb.idCacti)
    }

    //save info server created by response
    answer.content=serverdb;

    
    
    return answer;
}

async function createCoreIMS( vms,idImage,nameKey,idFlavor,idNet,idArquitecture,idFlavorAIO ) {
    let core=[];
    for await (vm of vms){
        if (vm == 'aio') {
            
            server = await createServer(vm,config.idIMS.idImage1,nameKey,idFlavorAIO,idNet,idArquitecture,'ims');
        } else {
            
            server = await createServer(vm,idImage,nameKey,idFlavor,idNet,idArquitecture,'ims');
        }
            // server = await createServer(vm,idImage,nameKey,idFlavor,idNet,idArquitecture,'ims');
        if(server.status == 200){
            // serverFull=await consultServer(server.content.id);
            // if (serverFull.addresses.length > 0) {
                
            //     idcacti=await serverFunctions.createServerCacti(serverFull.addresses[Object.keys(serverFull.addresses)[0]][1].addr)
            // }else{
            //     idcacti=null
            // }
            // let serverSave={
            //             name: vm,   
            //             infoServer: serverFull,
            //             idCacti:idcacti,
            //             idArquitecture:idArquitecture,
            //             type:'ims'
            //         }
            // let serverdb = new Server(serverSave);
            // await serverdb.save( );
            core.push(server.content);
        }
    }       
    return core;
}
async function consultServer( idServer ) {
    let server;
    await axios.get('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+idServer, config.headersOpenStack )
      .then(function (response) {
        server = response.data.server
      })
      .catch(error =>{
          server = 'error'
    });
    return server;
}
async function deleteServer( idServer ) {
    let server;
    let answer;
    server = await consultServer(idServer); 
    // console.log(server.id)
    await axios.delete('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+server.id , config.headersOpenStack )
      .then(function (response) {
       answer = 'ok'
      })
      .catch(error =>{
          answer = 'error'
      });
    //   console.log(answer)
    return answer;
}
async function instantServer( idServer , idIMS) {
    let server;
    let answer;
    let images;
    let idimageRebuild;
    server = await consultServer(idServer); 
    data={
        "createBackup": {
            "backup_type": "", 
            "rotation": 1, 
            "name": server.name
        }
    }
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+server.id+'/action', data,config.headersOpenStack )
      .then(function (response) {
        //   console.log(response)
        answer= 'ok'
      })        
      .catch(error =>{
        //   console.log(error)
          answer = 'error'
      });
      images=await getImagesOpenstack();
      
    for await (image of images){
        if (image.image_type == 'backup') {
            
            if (image.instance_uuid == server.id) {
                // console.log(image)
                idimageRebuild=image.id
            }
        }
    }
    
    await Server.findByIdAndUpdate(idIMS, {$set: {idImageRebuild:idimageRebuild} },{ new: true});
    return answer;
}
async function rebuildServer( idServer, img ) {
    let server;
    let answer;
    let idimageRebuild;
    server = await consultServer(idServer); 
    // console.log(img)
    data={
        "rebuild": {
            "imageRef": img
        }
    }
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action', data,config.headersOpenStack )
      .then(function (response) {
        //   console.log(response)
        answer = 'ok'
      })
      .catch(error =>{
        //   console.log(error)
          answer = 'error'
      });
    return answer;
}
async function consoleServer( idServer ) {
    let server;
    let answer;
    server = await consultServer(idServer); 

    data={
        "os-getVNCConsole": {
            "type": "novnc"
        }
    }
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+server.id +'/action', data,config.headersOpenStack )
      .then(function (response) {
        //   console.log(response.data)
        answer = response.data.console.url;
      })
      .catch(error =>{
          
          answer = 'error';
      });
    return answer;
}
async function resizeServer( idServer,dataForm ) {
    
    let server;
    let answer;
    let answer2='error';
    let idFlavor;
    server = await consultServer(idServer);  
   
    //consult flavor
    idFlavor= await consultFlavor(dataForm, true);
    
    if ( idFlavor == '-' ) {
        // console.log('crear flavor')
        idFlavor = await createFlavor(dataForm.ram, dataForm.disk, dataForm.vcpus)
    }
    
    data={
        "resize": {
            "flavorRef": idFlavor
        }
    }
    // console.log('Resize server', server.id,'data',data)
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+ server.id +'/action', data,config.headersOpenStack )
      .then(function (response) {
        answer=response
      })
      .catch(error =>{
          answer=error.response;
      });
    //   console.log(answer.status)
    if (answer.status == '202') {
        console.log("Se puede editar")
        await sleep(10000)
        data={
            "confirmResize": null
        }
        await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+ server.id +'/action', data,config.headersOpenStack )
        .then(function (response) {
            console.log("Editada")
           answer2=response
        })
        .catch(error =>{
            console.log("No editada")
            answer2=error.response
            console.log(error.response)
           
        });
    }else{
        console.log("no se puede editar")
        answer2={
            status: 400,
            content:answer
        }
    }
    
    return answer2
}
async function consultFlavor( dataform, form, ram=0,disk=0,cpu=0 ) {
    // console.log(form);
    
    let idflavor='-';
    let flavors;
    await axios.get('http://'+config.ipOpenstack+'/compute/v2.1/flavors/detail', config.headersOpenStack )
      .then(function (response) {
          flavors = response.data.flavors;
          
      })
      .catch(error =>{
          flavors='error';
    });
    
    if (!form) {
        dataform.ram=+ram * 1024
        dataform.disk=disk
        dataform.vcpus=cpu
        
    }else{
        dataform.ram=dataform.ram*1024
    }
    for await ( flavor of flavors){
        if (flavor.ram == dataform.ram) {
            if (flavor.disk == dataform.disk) {
                if (flavor.vcpus == dataform.vcpus) {
                    idflavor=flavor.id;
                }
            }
        }
    }
    
    return idflavor;
}
async function infoFlavor( idFlavor ) {
    let flavor;
    await axios.get('http://'+config.ipOpenstack+'/compute/v2.1/flavors/'+idFlavor, config.headersOpenStack )
      .then(function (response) {
          flavor = response.data.flavor;
      })
      .catch(error =>{
          flavor='error';
    });
        
    return flavor;
}
async function onOffServer( idServer ) {
    let server;
    let answer={
        action:String,
        response:Boolean
    };
    server = await consultServer(idServer);
    if (server.status == 'ACTIVE') {
        data={
            "os-stop": null
        }
        answer.action='off'
        
        // console.log('apagar maquina')
    }else{
        data={
            "os-start": null
        }
        answer.action='on'
        // console.log('encender maquina')
    }
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+ idServer +'/action', data,config.headersOpenStack )
          .then(function (response) {
            answer.response= 'ok'
          })
          .catch(error =>{
              answer.response= 'error'
          });
    return answer;
}
async function getImagesOpenstack( ) {
    let images;
    await axios.get('http://'+config.ipOpenstack+'/image/v2/images', config.headersOpenStack )
      .then(function (response) {
        images=response.data;
      })
      .catch(error =>{
          images='error'
    });
    return images.images;
}

async function createFlavor(ram, disk, vcpus){
    if (ram<1024) {
        ram *= 1024
    }
    
    
    let idflavor;
    data={
        "flavor": {
            "vcpus": vcpus, 
            "disk": disk, 
            "name": ram+'-'+disk+'-'+vcpus, 
            "os-flavor-access:is_public": true, 
            "rxtx_factor": 1.0, 
            "OS-FLV-EXT-DATA:ephemeral": 0, 
            "ram": ram, 
            "id": null, 
            "swap": 0
        }
    }
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/flavors', data,config.headersOpenStack )
      .then(function (response) {
        //   console.log(response.data)

        idflavor=response.data.flavor.id;
      })
      .catch(error =>{
        //   console.log(error)
        idflavor='error';
      });
      return idflavor;
}
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

async function deleteNetwork(idNetwork){
    let answer
    await axios.delete('http://'+config.ipOpenstack+':9696/v2.0/networks/'+idNetwork, config.headersOpenStack )
    .then(function (response) {
        answer = 'ok'
    })
    .catch(error =>{
        answer= "error"
    });
    return answer
}
async function deleteRouter(idrouter){
    await axios.delete('http://'+config.ipOpenstack+':9696/v2.0/routers/'+idrouter, config.headersOpenStack )
    .then(function (response) {
     return 'ok'
    })
    .catch(error =>{
        return 'error'
    });
}

async function showArquitecture(idArquitecture){
    try {
        const arquitecture = await Arquitecture.findById(idArquitecture);
        if(!arquitecture){
           return({status:404,
                content:arquitecture})
        }else{
            let core=[]
            let core2=[]
            let vmupdate;
            let delarray=[];
            let coreupdate=[];
             for await ( [i, vm] of arquitecture.vmCoreIMS.entries()){

                let vmdb=await Server.findById(vm._id)

                if (vmdb.infoServer) {
                    vmupdate= await openstack.consultServer(vmdb['infoServer'].id);
        
                    if (vmupdate == 'error') {
                       /*  delarray.push(i); */
                        // await Server.findByIdAndDelete(vm._id)
                        core.push(vmdb)
                    }else{
                        vmdb['infoServer']=vmupdate;
                       
                        await vmdb.save();
                        core.push(vmdb)
                    }
                }else{
                    core.push(vm)
                   /*  delarray.push(i); */
                    // await Server.findByIdAndDelete(vm._id)
                }
            }
            /* for (var i = delarray.length - 1; i>=0 ;i--){
                arquitecture.vmCoreIMS.splice(i,1);
            } */
            arquitecture.vmCoreIMS=core
            delarray=[];
            // console.log(arquitecture.vmAditionals)   
            for await ( [i, vm2] of arquitecture.vmAditionals.entries()){
                vm2db=await Server.findById(vm2._id)
                // console.log("maquina",vm2)
                if (vm2db.infoServer) {
                    let vmupdate2= await openstack.consultServer(vm2db['infoServer'].id);
                     
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
                    core2.push(vm2)
                    /* delarray.push(i); */
                    // Server.findByIdAndDelete(vm2._id)
                }
            }
        
           /*  for (var i = delarray.length - 1; i>=0 ;i--){
                arquitecture.vmAditionals.splice(i,1);
            } */
            arquitecture.vmAditionals=core2
        
            
            let update=await openstack.updateArquitecture(arquitecture); 
           return({status:200,
                content:arquitecture})

        }
    } catch (error) {
       return({status:404,
            content:error})
    }


   
}



exports.createNetwork=createNetwork;
exports.createSubnet=createSubnet;
exports.createRouter=createRouter;
exports.conectPublicRouter=conectPublicRouter;
exports.conectPrivateRouter=conectPrivateRouter;
exports.createServer=createServer;
exports.createCoreIMS=createCoreIMS;
exports.consultServer=consultServer;
exports.onOffServer=onOffServer;
exports.deleteServer=deleteServer;
exports.instantServer=instantServer;
exports.rebuildServer=rebuildServer;
exports.consoleServer=consoleServer;
exports.resizeServer=resizeServer;
exports.updateArquitecture=updateArquitecture;
exports.deleteNetwork=deleteNetwork;
exports.deleteRouter=deleteRouter;
exports.consultFlavor=consultFlavor;
exports.createFlavor=createFlavor;
exports.infoFlavor=infoFlavor;
exports.showArquitecture=showArquitecture;