const config = require('../config');
const axios = require("axios");
const Server = require('../models/server');
const openstack = require('../functions/openstack')
const serverFunctions = require('../functions/server')
const Arquitecture = require('../models/arquitecture');
let fs = require('fs');

 
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

async function createServer( name, idImage, nameKey, idFlavor, idNet ) {
    let server;
    let answer={
        'status': 400,
        'content' :'Bad Request',
        'error': null
    }
    let file
    try {
        file = fs.readFileSync('server/scripts/coreIMS/'+ name +'.sh', 'utf-8');
      } catch (err) {
        file='apt install sipp -y'
    }
    let body={
        "server": {
            "name": name, 
            "imageRef": idImage, 
            // "key_name": nameKey,
            // "key_name": '1',
            "flavorRef": idFlavor, 
            "max_count": 1, 
            "min_count": 1, 
            "networks": [{"uuid": idNet}],
            // "personality":[{"path":"/", "contents": file}]
        }
    }
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
                answer.status = 400
                answer.content=null
                answer.error=error
            });
    await sleep(10000)
    let portDevice;
    // console.log(answer)
    await axios.get('http://'+config.ipOpenstack+':9696/v2.0/ports?device_id='+answer.content.id, config.headersOpenStack )
    .then(function (response) {
     portDevice= response.data.ports[0].id
    //  console.log(response)
    })
    .catch(error =>{
       console.log(error)
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
    // console.log('error')
    })
    await sleep(10000)
    answer.content= await openstack.consultServer(answer.content.id);
    console.log(answer.content)    
    return answer;
}

async function createCoreIMS( vms,idImage,nameKey,idFlavor,idNet,idArquitecture ) {
    let core=[];
    for await (vm of vms){
        server = await createServer(vm,idImage,nameKey,idFlavor,idNet);
        if(server.status == 200){
            serverFull=await consultServer(server.content.id);
            if (serverFull.addresses.length > 0) {
                
                idcacti=await serverFunctions.createServerCacti(serverFull.addresses[Object.keys(serverFull.addresses)[0]][1].addr)
            }else{
                idcacti=null
            }
            let serverSave={
                        name: vm,   
                        infoServer: serverFull,
                        idCacti:idcacti,
                        idArquitecture:idArquitecture,
                        type:'ims'
                    }
            let serverdb = new Server(serverSave);
            await serverdb.save( );
            core.push(serverdb);
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
        console.log('crear flavor')
        idFlavor = await createFlavor(dataForm.ram, dataForm.disk, dataForm.vcpus)
    }
    
    data={
        "resize": {
            "flavorRef": idFlavor
        }
    }
    console.log('server', server.id,'data',data)
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+ server.id +'/action', data,config.headersOpenStack )
      .then(function (response) {

        answer=response
      })
      .catch(error =>{
          answer='error'
      });
    //   console.log(answer.status)
    if (answer.status == '202') {
        await sleep(10000)
        data={
            "confirmResize": null
        }
        await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+ server.id +'/action', data,config.headersOpenStack )
        .then(function (response) {

           answer2='ok'
        })
        .catch(error =>{
            
            answer2='error'
        });
    }
    
    return answer2;
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
    let answer;
    server = await consultServer(idServer);
    if (server.status == 'ACTIVE') {
        data={
            "os-stop": null
        }
        
        // console.log('apagar maquina')
    }else{
        data={
            "os-start": null
        }
        // console.log('encender maquina')
    }
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+ idServer +'/action', data,config.headersOpenStack )
          .then(function (response) {
            answer= 'ok'
          })
          .catch(error =>{
              answer= 'error'
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