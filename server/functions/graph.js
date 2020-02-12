const config = require('../config');
const axios = require("axios");
const Server = require('../models/server');
const Arquitecture = require('../models/arquitecture');
let fs = require('fs');
// const exec = require("child_process").exec

const util = require('util');
const exec = util.promisify(require('child_process').exec);

 


async function getGraphsTypes(idServer) {
  let server
  try{
    server = await Server.findById(idServer)
    
  }catch{

  }
    try {
    
        const { stdout, stderr } = await exec("php -q /var/www/html/cacti/cli/add_graphs.php --host-id='+server.idCacti+' --list-graph-templates | sed '1d'")
        if(stdout){
            ans=[]
              ansCacti=stdout.split('\n')
             ansCacti.forEach(line => {
               if (line.length >0) {
                 
                 ans.push(line.split('\t'))
               }
               
             });
             return ans

            
           
           
             
        }
      } catch (e) {
       return 'error'
      }


   

       
    
    
   
}
exports.getGraphsTypes=getGraphsTypes;
