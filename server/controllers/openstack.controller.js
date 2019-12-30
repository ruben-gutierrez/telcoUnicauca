const Arquitecture = require('../models/arquitecture');
const config = require('../config');
const axios = require("axios");

const OpenStackController={};
const URLconsult = "http://"+config.ipOpenstack;

// errors
// 200: "requrest ok"
// 300: "function not defined"
// 401: "request failed"

OpenStackController.consoleVM= async(req, res) => {
    data={
        "os-getVNCConsole": {
            "type": "novnc"
        }
    }
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+req.params.id+'/action', data,config.headersOpenStack )
      .then(function (response) {
        //   console.log(response)
        res.json(response.data);
      })
      .catch(error =>{
          res.json(
              {'status': '401',
                    'content': error
                })
      });
};

OpenStackController.getNetworks= async(req, res) => {
    await axios.get('http://'+config.ipOpenstack+':9696/v2.0/networks', config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json({'status': '401',
                    'content': error})
    });
};

OpenStackController.showNetwork= async(req, res) => {
    res.json({ "status": "300",
                "content": "Function available in next update"})
};
OpenStackController.createNetwork= async(req, res) => {

    data={
        "network": {
            "name": req.body.name, 
            "description": "telcoIMS",
            "admin_state_up": true
        }
    }
    await axios.post('http://'+config.ipOpenstack+':9696/v2.0/networks', data,config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json(
              {
                  'status': '401',
                  'content': error
                })
      });
};

OpenStackController.deleteNetwork= async(req, res) => {
    await axios.delete('http://'+config.ipOpenstack+':9696/v2.0/networks/'+req.params.id, config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json(
              {'status': '401',
                    'content': error
                })
      });
    
};
OpenStackController.updateNetwork= async(req, res) => {
    res.json({ "status": "300",
                "content": "Function available in next update"})
};


OpenStackController.getRouters= async(req, res) => {
    res.json({ "status": "300",
                "content": "Function available in next update"})
};
OpenStackController.showRouter= async(req, res) => {
    res.json({ "status": "300",
                "content": "Function available in next update"})
};
OpenStackController.createRouter= async(req, res) => {
    data={
        "router": {
            "name": req.body.nameRouter, 
            "admin_state_up": true
        }
    }
    await axios.post('http://'+config.ipOpenstack+':9696/v2.0/routers', data,config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json(
              {'status': '401',
                    'content': error
                })
      });
};
OpenStackController.deleteRouter= async(req, res) => {
    await axios.delete('http://'+config.ipOpenstack+':9696/v2.0/routers/'+req.params.id, config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json(
              {'status': '401',
                    'content': error
                })
      });
};
OpenStackController.updateRouter= async(req, res) => {
    res.json({ "status": "300",
                "content": "Function available in next update"})
};
OpenStackController.conectPublicRouter= async(req, res) => {
    data={
        "router": {
            "external_gateway_info": {
                "network_id": req.params.idnet
            }
        }
    }
    await axios.put('http://'+config.ipOpenstack+':9696/v2.0/routers/'+ req.params.id , data,config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json(
              {'status': '401',
                    'content': error
                })
      });
};
OpenStackController.conectPrivateRouter= async(req, res) => {
    data={
        "subnet_id": req.params.idnet
    }
    await axios.put('http://'+config.ipOpenstack+':9696/v2.0/routers/'+ req.params.id +'/add_router_interface' , data,config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json(
              {'status': '401',
                    'content': error
                })
      });
};
OpenStackController.deletePortRouter= async(req, res) => {
    data={
        "port_id": req.idPortRouter
    }
    await axios.put('http://'+config.ipOpenstack+':9696/v2.0/routers/'+req.idRouter+'/remove_router_interface', config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json(
              {'status': '401',
                    'content': error
                })
      });
};




OpenStackController.getSubnets= async(req, res) => {
    await axios.get('http://'+config.ipOpenstack+':9696/v2.0/subnets', config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json({'status': '401',
                    'content': error})
    });
};
OpenStackController.showSubnet= async(req, res) => {
    res.json({ "status": "300",
                "content": "Function available in next update"})
};
OpenStackController.createSubnet= async(req, res) => {
    data={
        "subnet": {
            "ip_version": req.ipVersion, 
            "network_id": req.idNet,
            "dns_nameservers": req.dnsServers, 
            "cidr": req.cidr, 
            "name": req.nameSubNet
        }
    }
    await axios.post('http://'+config.ipOpenstack+':9696/v2.0/subnets', data,config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json(
              {'status': '401',
                    'content': error
                })
      });
};
OpenStackController.deleteSubnet= async(req, res) => {
    res.json({ "status": "300",
                "content": "Function available in next update"})
};
OpenStackController.updateSubnet= async(req, res) => {
    res.json({ "status": "300",
                "content": "Function available in next update"})
};


OpenStackController.getServers= async(req, res) => {
    await axios.get('http://'+config.ipOpenstack+'/compute/v2.1/servers/detail', config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json({'status': '401',
                    'content': error})
    });
};
OpenStackController.showServer= async(req, res) => {
    await axios.get('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+req.params.id, config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json({'status': '401',
                    'content': error})
    });
};
OpenStackController.createServer= async(req, res) => {
    
    data={
        "server": {
            "name": req.body.name, 
            "imageRef": req.body.idImage, 
            // "key_name": req.body.nameKey, 
            "flavorRef": req.body.idFlavor, 
            "max_count": 1, 
            "min_count": 1, 
            "networks": [{"uuid": req.body.idNet}]
        }
    }

    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers', data,config.headersOpenStack )
      .then(function (response) {
        res.json(response.data); 
      })
      .catch(error =>{
          res.json(
              {'status': '401',
                    'content': error
                })
      });
};
OpenStackController.deleteServer= async(req, res) => {
    await axios.delete('http://'+config.ipOpenstack+':9696/compute/v2.1/servers/'+req.params.id, config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json(
              {'status': '401',
                    'content': error
                })
      });
};
OpenStackController.updateServer= async(req, res) => {
    data={
        "resize": {
            "flavorRef": req.params.idFlavor
        }
    }
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+ req.params.id +'/action', data,config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json(
              {'status': '401',
                    'content': error
                })
      });

    await sleep(10)
    data={
        "confirmResize": null
    }
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+ req.params.id +'/action', data,config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json(
              {'status': '401',
                    'content': error
                })
      });

};

OpenStackController.shutdownServer= async(req, res) => {
    data={
        "os-stop": null
    }
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+ req.params.id +'/action', data,config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json(
              {'status': '401',
                    'content': error
                })
      });
};
OpenStackController.turnOnServer= async(req, res) => {
    data={
        "os-start": null
    }
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+ req.params.id +'/action', data,config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json(
              {'status': '401',
                    'content': error
                })
      });
};

OpenStackController.createImageFromServer= async(req, res) => {
    data={
        "createBackup": {
            "backup_type": "", 
            "rotation": 1, 
            "name": req.params.nameImage
        }
    }
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+req.params.id+'/action', data,config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json(
              {'status': '401',
                    'content': error
                })
      });
};
OpenStackController.rebuildServer= async(req, res) => {
    data={
        "rebuild": {
            "imageRef": req.params.idImage
        }
    }
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers/'+req.params.id+'/action', data,config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json(
              {'status': '401',
                    'content': error
                })
      });
};
OpenStackController.showPortsServer= async(req, res) => {
    await axios.get('http://'+config.ipOpenstack+':9696/v2.0/ports?device_id='+req.params.id, config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json({'status': '401',
                    'content': error})
    });
};



OpenStackController.getFlavors= async(req, res) => {
    await axios.get('http://'+config.ipOpenstack+'/compute/v2.1/flavors/detail', config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json({'status': '401',
                    'content': error})
    });
};
OpenStackController.showFlavor= async(req, res) => {
    

    await axios.get('http://'+config.ipOpenstack+'/compute/v2.1/flavors/'+req.params.id, config.headersOpenStack )
      .then(function (response) {   
        res.json(response.data);
      })
      .catch(error =>{
          res.json({'status': '401',
                    'content': error})
    });
};
OpenStackController.createFlavor= async(req, res) => {
    console.log(req.body)
    data={
        "flavor": {

            "vcpus": req.body.vpcus, 
            "disk": req.body.disk, 
            "name": req.body.nameFlavor, 

            "os-flavor-access:is_public": true, 
            "rxtx_factor": 1.0, 
            "OS-FLV-EXT-DATA:ephemeral": 0, 
            "ram": req.body.ram, 
            "id": null, 
            "swap": 0
        }
    }
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/flavors', data, config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json(
              {'status': '400',
                    'content': error
                })
      });
};
OpenStackController.deleteFlavor= async(req, res) => {
    res.json({ "status": "300",
                "content": "Function available in next update"})
};
OpenStackController.updateFlavor= async(req, res) => {
    res.json({ "status": "300",
                "content": "Function available in next update"})
};


OpenStackController.getImages= async(req, res) => {
    await axios.get('http://'+config.ipOpenstack+'/image/v2/images', config.headersOpenStack )
      .then(function (response) {
        res.json(response.data.images);
      })
      .catch(error =>{
          res.json({'status': '401',
                    'content': error})
    });
};
OpenStackController.showImage= async(req, res) => {
    res.json({ "status": "300",
                "content": "Function available in next update"})
};
OpenStackController.createImage= async(req, res) => {
    res.json({ "status": "300",
                "content": "Function available in next update"})
};
OpenStackController.deleteImage= async(req, res) => {
    await axios.delete('http://'+config.ipOpenstack+'/image/v2/images/'+req.params.id, config.headersOpenStack )
    .then(function (response) {
      res.json(response.data);
    })
    .catch(error =>{
        res.json(
            {'status': '401',
                  'content': error
              })
    });
};
OpenStackController.updateImage= async(req, res) => {
    res.json({ "status": "300",
                "content": "Function available in next update"})
};



OpenStackController.getPorts= async(req, res) => {
    await axios.get('http://'+config.ipOpenstack+':9696/v2.0/ports', config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json({'status': '401',
                    'content': error})
    });
};
OpenStackController.showPort= async(req, res) => {
    res.json({ "status": "300",
                "content": "Function available in next update"})
};
OpenStackController.createPort= async(req, res) => {
    res.json({ "status": "300",
                "content": "Function available in next update"})
};
OpenStackController.deletePort= async(req, res) => {
    res.json({ "status": "300",
                "content": "Function available in next update"})
};
OpenStackController.updatePort= async(req, res) => {
    res.json({ "status": "300",
                "content": "Function available in next update"})
};


OpenStackController.getInstants= async(req, res) => {
    res.json({ "status": "300",
    "content": "Function available in next update"})
};
OpenStackController.showInstant= async(req, res) => {
    res.json({ "status": "300",
                "content": "Function available in next update"})
};
OpenStackController.createInstant= async(req, res) => {
    res.json({ "status": "300",
                "content": "Function available in next update"})
};
OpenStackController.deleteInstant= async(req, res) => {
    await axios.delete('http://'+config.ipOpenstack+'/image/v2/images/'+req.params.id, config.headersOpenStack )
    .then(function (response) {
      res.json(response.data);
    })
    .catch(error =>{
        res.json(
            {'status': '401',
                  'content': error
              })
    });
};
OpenStackController.updateInstant= async(req, res) => {
    res.json({ "status": "300",
                "content": "Function available in next update"})
};


OpenStackController.getIpfloats= async(req, res) => {
    await axios.get('http://'+config.ipOpenstack+':9696/v2.0/floatingips', config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json({'status': '401',
                    'content': error})
    });
};
OpenStackController.showIpfloat= async(req, res) => {
    res.json({ "status": "300",
                "content": "Function available in next update"})
};
OpenStackController.createIpfloat= async(req, res) => {
    data={
        "floatingip": {
            "floating_network_id": req.idNetPublic
        }
    }
    await axios.post('http://'+config.ipOpenstack+':9696/v2.0/floatingips', data,config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json(
              {'status': '401',
                    'content': error
                })
      });
};
OpenStackController.deleteIpfloat= async(req, res) => {
    await axios.delete('http://'+config.ipOpenstack+':9696/v2.0/floatingips/'+req.params.id, config.headersOpenStack )
    .then(function (response) {
      res.json(response.data);
    })
    .catch(error =>{
        res.json(
            {'status': '401',
                  'content': error
              })
    });
};
OpenStackController.updateIpfloat= async(req, res) => {
    res.json({ "status": "300",
                "content": "Function available in next update"})
};
OpenStackController.SetServerIpfloat= async(req, res) => {
    data={
        "floatingip": {
            "port_id": req.params.idPort
        }
    }
    await axios.put('http://'+config.ipOpenstack+':9696/v2.0/floatingips/'+ req.params.id, data,config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json(
              {'status': '401',
                    'content': error
                })
      });
};
OpenStackController.createAndLinkIpfloat= async(req, res) => {
    data={
        "floatingip": {
            "floating_network_id": req.idNetPublic,
            "port_id": req.idPotr
        }
    }
    await axios.post('http://'+config.ipOpenstack+':9696/v2.0/floatingips', data,config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json(
              {'status': '401',
                    'content': error
                })
      });
}; 
// const getData = async url => {
//     let data;
//     try {
//       const response = await axios.get(URLconsult+url);
//       data = response.data;
//     } catch (error) {
//         data = 'error';
//     }
//     return data;
//   };

// OpenStackController.getArquitectures= async(req, res) => {
//     const arquitecture = await Arquitecture.find();
//     res.json(arquitecture);
// };
// OpenStackController.createArquitecture= async(req, res) => {
//     const arquitecture = new Arquitecture(req.body);
//     await arquitecture.save();
//     res.json(
//         {
//             status:'200',
//             answer:"Arquitecture Created"
//         }
//     );
// };
// OpenStackController.showArquitecture= async(req, res) => {
//     const arquitecture = await Arquitecture.findById(req.params.id);
//     res.json(arquitecture);
// };
// OpenStackController.updateArquitecture=async(req, res) => {
//     const idArquitecture = req.params.id;
//     const arquitecture = new Arquitecture(req.body);
//     await Arquitecture.findByIdAndUpdate(idArquitecture, {$set: arquitecture },{ new: true});
//     res.json(
//         {
//             status:'200',
//             answer:"Arquitecture Updated"
//         }
//     );
// };
// OpenStackController.deleteArquitecture=async(req, res) => {
//     await Arquitecture.findByIdAndDelete(req.params.id);
//     res.json(
//         {
//             status:'200',
//             answer:"Arquitecture Delete"
//         }
//     );
// };
OpenStackController.test= async(req, res) => {
    console.log(req);
    // console.log(config.tokenOpenStack)
};


module.exports = OpenStackController;