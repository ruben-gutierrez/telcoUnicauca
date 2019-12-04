const config = require('../config');
const axios = require("axios");
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


exports.createNetwork=createNetwork;
exports.createSubnet=createSubnet;