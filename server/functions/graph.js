const config = require('../config');
const axios = require("axios");
const Server = require('../models/server');
const Graph = require('../models/graph');
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


async function importGraphAutomatics(idServer,idCacti) {

  try {
    exec("php /var/www/html/cacti/cli/list-graphs-host.php --list-graphs-host="+ idCacti+"  | sed '1d' | sed '/^$/d' ", async (error, stdout, stderr) => {
        if (error) {
          console.log('error')
          return 'error';
        }
       
        ansCacti=stdout.split('\n')
        //  ansCacti.forEach(async  (line,index) => {
         for await ([index, line] of ansCacti){
           
            if (line !='') {
                
                ansCacti[index]=line.split('\t')
                
                if (ansCacti[index][ansCacti[index].length] == undefined) {
                    ansCacti[index].splice(ansCacti[index].length - 1,1)
                }
                console.log(ansCacti)
                //save graphs automatics
                let server = await Server.findById(idServer);
                infoGraph={
                    name: ansCacti[index][2],
                    idServer:idServer,
                    infoCacti: {idHost:idCacti, idGraph:ansCacti[index][0],idFile:'xx' },
                }
                const graph = new Graph(infoGraph);
                await graph.save()
                await server.graphs.push(graph)
                console.log(sever.graphs)
                await server.save()
                
            }else{
              
              
              // await Server.findByIdAndUpdate(idServer,server,{ new: true})
                ansCacti.splice(index,1)
            }
            
            
        };
        
        
        
      });
       
      } catch (e) {
        return 'error'
      }















  
  



}
exports.getGraphsTypes=getGraphsTypes;
exports.importGraphAutomatics=importGraphAutomatics;
