const config = require('../config');
const axios = require("axios");
const Server = require('../models/server');
const Arquitecture = require('../models/arquitecture');
let fs = require('fs');

 
async function updateArquitecture(data) {
    console.log(data)
    const idArquitecture = data._id;
    const arquitecture = new Arquitecture(data);
    await Arquitecture.findByIdAndUpdate(idArquitecture, {$set: arquitecture },{ new: true})
    
    return 'ok'
}
async function createNetwork(nameNet) {
    let network;
    data={
        "network": {
            "name": nameNet, 
            "description": "telcoIMS",
            "admin_state_up": true
        }
    }
    await axios.post('http://'+config.ipOpenstack+':9696/v2.0/networks', data,config.headersOpenStack )
      .then(function (response) {
        //   console.log(response.data)
        network=response.data;
      })
      .catch(error =>{
          netwotk='error'
      });
      return network;
    
}
async function createSubnet(idNet,ipNet,name) {
    let subnet;
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
        subnet=response.data;
      })
      .catch(error =>{
          subnet="error";
      });
      return subnet;
    
}
async function createRouter(name) {
    let router;
    data={
        "router": {
            "name": name, 
            "admin_state_up": true
        }
    }
    await axios.post('http://'+config.ipOpenstack+':9696/v2.0/routers', data,config.headersOpenStack )
      .then(function (response) {
        router=response.data;
      })
      .catch(error =>{
        router='error';
      });
      return router;
}
async function conectPublicRouter( idrouter ) {
    let conect;
    data={
        "router": {
            "external_gateway_info": {
                "network_id": config.idNetPublic
            }
        }
    }
    await axios.put('http://'+config.ipOpenstack+':9696/v2.0/routers/'+ idrouter , data,config.headersOpenStack )
      .then(function (response) {
       conect=response.data;
       
      })
      .catch(error =>{
          conect="error";
      });
      return conect;
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
    let body;
    
       body = await fs.readFile('server/scripts/coreIMS/'+ name +'.sh', 'utf-8', (err, data) => {
            if(err) {
               return {
                    "server": {
                        "name": name, 
                        "imageRef": idImage, 
                        // "key_name": nameKey, 
                        "flavorRef": idFlavor, 
                        "max_count": 1, 
                        "min_count": 1, 
                        "networks": [{"uuid": idNet}]
                       
                    }
                }
               
            } else {
                return {
                    "server": {
                        "name": name, 
                        "imageRef": idImage, 
                        // "key_name": nameKey, 
                        "flavorRef": idFlavor, 
                        "max_count": 1, 
                        "min_count": 1, 
                        "networks": [{"uuid": idNet}],
                        "personality":[{"path":"/", "contents": data}]
                    }
                
            }
        }
            
    });
    console.log(body)
    // await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers', body,config.headersOpenStack )
    //         .then(function (response) {
    //             console.log(response)
    //             server = response.data;
    //         })
    //         .catch(error =>{
    //             console.log(error)
    //             server= 'error'
    //         });
            return 'error';
    
    
     
    
}
async function createCoreIMS( vms,idImage,nameKey,idFlavor,idNet ) {
    let core=[];
    for await (vm of vms){
        
        server = await createServer(vm,idImage,nameKey,idFlavor,idNet);
        console.log(server)
        if(server == 'error'){
            
        }else {
            
            serverFull=await consultServer(server.server.id);
                
            let serverSave={
                name: vm,
                infoServer: serverFull.server
            }
            let serverdb = new Server(serverSave);
            await serverdb.save( );
             core.push(serverdb);
        }
        switch (vm) {
            case 'sipp':
                
                break;
        
            default:
                break;
        }
        
    }       
    return core;
}
async function consultServer( idServer ) {
    let server;
    await axios.get('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+idServer, config.headersOpenStack )
      .then(function (response) {
        server = response.data;
        
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
    console.log(server['server'].id)
    await axios.delete('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+server['server'].id, config.headersOpenStack )
      .then(function (response) {
        

       answer = 'ok'
      })
      .catch(error =>{
          answer = 'error'
      });
      console.log(answer)
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
            "name": server.server.name
        }
    }
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+server['server'].id+'/action', data,config.headersOpenStack )
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
            
            if (image.instance_uuid == server.server.id) {
                console.log(image)
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
    console.log(img)
    data={
        "rebuild": {
            "imageRef": img
        }
    }
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+idServer+'/action', data,config.headersOpenStack )
      .then(function (response) {
          console.log(response)
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
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+server.server.id +'/action', data,config.headersOpenStack )
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
    idFlavor= await consultFlavor(dataForm);
    if ( idFlavor == '-' ) {
        idFlavor = await creteFlavor(dataForm.ram, dataForm.disk, dataForm.vcpus)
    }
    
    data={
        "resize": {
            "flavorRef": idFlavor
        }
    }
    
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+ server.server.id +'/action', data,config.headersOpenStack )
      .then(function (response) {
        console.log(response)
        answer=response
      })
      .catch(error =>{
 
          answer='error'
      });
      console.log(answer.status)
    if (answer.status == '202') {
        await sleep(10000)
        data={
            "confirmResize": null
        }
        await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+ server.server.id +'/action', data,config.headersOpenStack )
        .then(function (response) {

           answer2='ok'
        })
        .catch(error =>{
            
            answer2='error'
        });
    }
    
    return answer2;
}
async function consultFlavor( dataform ) {
    let idflavor='-';
    let flavors;
    await axios.get('http://'+config.ipOpenstack+'/compute/v2.1/flavors/detail', config.headersOpenStack )
      .then(function (response) {
          flavors = response.data.flavors;
          
      })
      .catch(error =>{
          flavors='error';
    });
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
async function onOffServer( idServer ) {
    let server;
    let answer;
    server = await consultServer(idServer);
    if (server['server'].status == 'ACTIVE') {
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

async function creteFlavor(ram, disk, vcpus){
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

        idflavor=response.data.flavor.id;
      })
      .catch(error =>{
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
    await axios.delete('http://'+config.ipOpenstack+':9696/v2.0/networks/'+idNetwork, config.headersOpenStack )
    .then(function (response) {
      return 'ok'
    })
    .catch(error =>{
        return "error"
    });
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