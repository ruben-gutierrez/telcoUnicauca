const config = require('../config');
const axios = require("axios");
const Server = require('../models/server');
const Arquitecture = require('../models/arquitecture');
let fs = require('fs');
// const exec = require("child_process").exec

const util = require('util');
const exec = util.promisify(require('child_process').exec);

 
async function updateServer(data) {
    // console.log(data)
    const idArquitecture = data._id;
    const arquitecture = new Arquitecture(data);
    await Arquitecture.findByIdAndUpdate(idArquitecture, {$set: arquitecture },{ new: true})
    return 'ok'

}

async function createServerCacti(ip) {
    
    
    try {
        const { stdout, stderr } = await exec('php -q /var/www/html/cacti/cli/add_device.php --description='+ip+' --ip='+ip+' --template='+config.templateHostCacti+' --community='+config.comunityCacti)
        if(stdout){
            ansCacti=stdout.split('-')
            // console.log( ansCacti[2].match(config.regexNumber)[0])
            // console.log("servidor cacti creado",ansCacti[2].match(config.regexNumber)[0])
            return ansCacti[2].match(config.regexNumber)[0]
        }
      } catch (e) {
        if(e.stdout){
            ansCacti=e.stdout.split('-')
            // console.log(  ansCacti[1].match(config.regexNumber)[0])
            return ansCacti[1].match(config.regexNumber)[0]
        }
      }


   
    // console.log(await exec('php -q /var/www/html/cacti/cli/add_device.php --description='+ip+' --ip='+ip+' --template='+config.templateHostCacti+' --community='+config.comunityCacti))
   
     
    //    ansCacti=stdout.split('-')
    //    console.log(ansCacti)
    //     if(ansCacti[1] === " new device"){
    //         return ansCacti[2].match(config.regexNumber)[0]
            
    //     }else{
    //         return ansCacti[1].match(config.regexNumber)[0]
    //     }
    
       
    
    
   
}
exports.updateServer=updateServer;
exports.createServerCacti=createServerCacti;