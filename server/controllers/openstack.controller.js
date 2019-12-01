const Arquitecture = require('../models/arquitecture');
const config = require('../config');
const axios = require("axios");

const OpenStackController={};
const URLconsult = "http://"+config.ipOpenstack;

const getData = async url => {
    let data;

    try {
      const response = await axios.get(URLconsult+url);
      data = response.data;
    } catch (error) {
        data = 'error';
    }
    return data;
  };

OpenStackController.test= async(req, res) => {
    await axios.get('http://10.55.2.24/compute/v2.1/flavors/detail', config.headersOpenStack )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(error =>{
          res.json({'status': '401',
                    'content': error})
    });
};


OpenStackController.consoleVM= async(req, res) => {
    answer = await getData(':9696/v2.0/networks');
    //guardar los datos

    //answer of controller
    res.json(answer);
};
OpenStackController.getArquitectures= async(req, res) => {
    const arquitecture = await Arquitecture.find();
    res.json(arquitecture);
};
OpenStackController.createArquitecture= async(req, res) => {
    const arquitecture = new Arquitecture(req.body);
    await arquitecture.save();
    res.json(
        {
            status:'200',
            answer:"Arquitecture Created"
        }
    );
};
OpenStackController.showArquitecture= async(req, res) => {
    const arquitecture = await Arquitecture.findById(req.params.id);
    res.json(arquitecture);
};
OpenStackController.updateArquitecture=async(req, res) => {
    const idArquitecture = req.params.id;
    const arquitecture = new Arquitecture(req.body);
    await Arquitecture.findByIdAndUpdate(idArquitecture, {$set: arquitecture },{ new: true});
    res.json(
        {
            status:'200',
            answer:"Arquitecture Updated"
        }
    );
};
OpenStackController.deleteArquitecture=async(req, res) => {
    await Arquitecture.findByIdAndDelete(req.params.id);
    res.json(
        {
            status:'200',
            answer:"Arquitecture Delete"
        }
    );
};



OpenStackController.getNetworks= async(req, res) => {
    answer = await getData(':9696/v2.0/networks');
    res.json(answer);
    
};

OpenStackController.showNetwork= async(req, res) => {
    
};
OpenStackController.createNetwork= async(req, res) => {
    
    const arquitecture = new Arquitecture(req.body);
    await arquitecture.save();
    res.json(
        {status:"User saved"}
    );
    
};
OpenStackController.deleteNetwork= async(req, res) => {
    
};
OpenStackController.updateNetwork= async(req, res) => {
    
};


OpenStackController.getRouters= async(req, res) => {
    // answer = await getData('/rest/v2/lang/es')
    //guardar los datos

    //answer of controller
    res.json(answer);
};
OpenStackController.showRouter= async(req, res) => {
    
};
OpenStackController.createRouter= async(req, res) => {
    
};
OpenStackController.deleteRouter= async(req, res) => {
    
};
OpenStackController.updateRouter= async(req, res) => {
    
};


OpenStackController.getSubnets= async(req, res) => {
    answer = await getData(':9696/v2.0/subnets');
    //guardar los datos

    //answer of controller
    res.json(answer);
};
OpenStackController.showSubnet= async(req, res) => {
    
};
OpenStackController.createSubnet= async(req, res) => {
    
};
OpenStackController.deleteSubnet= async(req, res) => {
    
};
OpenStackController.updateSubnet= async(req, res) => {
    
};


OpenStackController.getServers= async(req, res) => {
    answer = await getData('/compute/v2.1/servers/detail')
    //guardar los datos

    //answer of controller
    res.json(answer);
};
OpenStackController.showServer= async(req, res) => {
    
};
OpenStackController.createServer= async(req, res) => {
    
};
OpenStackController.deleteServer= async(req, res) => {
    
};
OpenStackController.updateServer= async(req, res) => {
    
};


OpenStackController.getFlavors= async(req, res) => {
    answer = await getData('/compute/v2.1/flavors/detail')
    //guardar los datos

    //answer of controller
    res.json(answer);
};
OpenStackController.showFlavor= async(req, res) => {
    
};
OpenStackController.createFlavor= async(req, res) => {
    
};
OpenStackController.deleteFlavor= async(req, res) => {
    
};
OpenStackController.updateFlavor= async(req, res) => {
    
};


OpenStackController.getImages= async(req, res) => {
    answer = await getData('/image/v2/images')
    //guardar los datos

    //answer of controller
    res.json(answer);
};
OpenStackController.showImage= async(req, res) => {
    
};
OpenStackController.createImage= async(req, res) => {
    
};
OpenStackController.deleteImage= async(req, res) => {
    
};
OpenStackController.updateImage= async(req, res) => {
    
};


OpenStackController.getPorts= async(req, res) => {
    answer = await getData(':9696/v2.0/ports')
    //guardar los datos

    //answer of controller
    res.json(answer);
};
OpenStackController.showPort= async(req, res) => {
    
};
OpenStackController.createPort= async(req, res) => {
    
};
OpenStackController.deletePort= async(req, res) => {
    
};
OpenStackController.updatePort= async(req, res) => {
    
};


OpenStackController.getInstants= async(req, res) => {
    // answer = await getData('/rest/v2/lang/es')
    //guardar los datos

    //answer of controller
    res.json(answer);
};
OpenStackController.showInstant= async(req, res) => {
    
};
OpenStackController.createInstant= async(req, res) => {
    
};
OpenStackController.deleteInstant= async(req, res) => {
    
};
OpenStackController.updateInstant= async(req, res) => {
    
};


OpenStackController.getIpfloats= async(req, res) => {
    answer = await getData(':9696/v2.0/floatingips')
    //guardar los datos

    //answer of controller
    res.json(answer);
};
OpenStackController.showIpfloat= async(req, res) => {
    
};
OpenStackController.createIpfloat= async(req, res) => {
    
};
OpenStackController.deleteIpfloat= async(req, res) => {
    
};
OpenStackController.updateIpfloat= async(req, res) => {
    
};




module.exports = OpenStackController;