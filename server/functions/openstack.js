const config = require('../config');
const axios = require("axios");
const Server = require('../models/server');


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
    data={
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
     await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers', data,config.headersOpenStack )
      .then(function (response) {
        server=response.data;
      })
      .catch(error =>{
          server=error;
      });
    return server;
}
async function createCoreIMS( vms,idImage,nameKey,idFlavor,idNet ) {
    let core=[];
    for await (vm of vms){
        
        server = await createServer(vm,idImage,nameKey,idFlavor,idNet);
        if (server.server) {
            serverFull=await consultServer(server.server.id);
                
            let serverSave={
                name: vm,
                infoServer: serverFull.server
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
    await axios.delete('http://'+config.ipOpenstack+':9696/compute/v2.1/servers/'+server['server'].id, config.headersOpenStack )
      .then(function (response) {
       answer = 'ok'
      })
      .catch(error =>{
          answer = 'error'
      });
    return answer;
}
async function instantServer( idServer ) {
    let server;
    let answer;
    server = await consultServer(idServer); 
    data={
        "createBackup": {
            "backup_type": "", 
            "rotation": 1, 
            "name": server['server'].name
        }
    }
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+server['server'].id+'/action', data,config.headersOpenStack )
      .then(function (response) {
        answer= 'ok'
      })
      .catch(error =>{
          answer = 'error'
      });
    return answer;
}
async function rebuildServer( idServer ) {
    let server;
    let answer;
    server = await consultServer(idServer); 
    data={
        "rebuild": {
            "imageRef": server['idImageRebuild']
        }
    }
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+server['infoServer'].id+'/action', data,config.headersOpenStack )
      .then(function (response) {
        answer = 'ok'
      })
      .catch(error =>{
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
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+server['infoServer'].id +'/action', data,config.headersOpenStack )
      .then(function (response) {
        answer = response;
      })
      .catch(error =>{
          answer = 'error';
      });
    return answer;
}
async function resizeServer( idServer,dataForm ) {
    let server;
    let answer;
    let answer2;
    let idFlavor;
    server = await consultServer(idServer);  

    //consult flavor
    idFlavor= await consultFlavor(dataForm);
    data={
        "resize": {
            "flavorRef": idFlavor
        }
    }
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+ server['infoServer'].id +'/action', data,config.headersOpenStack )
      .then(function (response) {
        answer='ok'
      })
      .catch(error =>{
          answer='error'
      });
    if (anwer == 'ok') {
        await sleep(10)
        data={
            "confirmResize": null
        }
        await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+ server['infoServer'].id +'/action', data,config.headersOpenStack )
        .then(function (response) {
            answer='ok'
        })
        .catch(error =>{
            answer='error'
        });
    }
    
    return answer;
}
async function consultFlavor( dataform ) {
    let idflavor='-';
    let flavors;
    await axios.get('http://'+config.ipOpenstack+'/compute/v2.1/flavors/detail', config.headersOpenStack )
      .then(function (response) {
        flavors = response.flavors;
      })
      .catch(error =>{
          flavors='error';
    });
    for await ( flavor of flavors){
        if (flavor.ram == dataform.ram) {
            if (flavor.disk == dataform.disk) {
                if (flavor.disk == dataform.disk) {
                    idflavor=flavor.id;
                }
            }
        }
    }

    if ( idflavor == '-' ) {
        idflavor = await creteFlavor(dataform.ram, dataform.disk, dataform.vcpus)
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
        idflavor=response.data.id;
      })
      .catch(error =>{
          idflvor='error';
      });
      return idflavor;
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