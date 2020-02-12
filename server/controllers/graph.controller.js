const express = require('express');
const Graph = require('../models/graph');
const Server = require('../models/server');
const router = express.Router()
const config = require('../config');
const axios = require("axios");
const exec = require("child_process").exec
const openstack = require('../functions/openstack');
const serverFunctions = require('../functions/server');
const graphFunctions = require('../functions/graph');

var fs = require('fs')

const GraphController={};

GraphController.getGraphs= async(req, res) => {

            const graph = await Graph.find();
            res.json(graph);
            
  
};
GraphController.createGraph= async(req, res) => {
    let idGraphCreate=req.body.idTemplate;
    // let idGraphCreate="10";
    let nameGraphCreate=req.body.name;
    let server=await Server.findById(req.body.idServer)
    if(server.idCacti==null){
        serverFull=await openstack.consultServer(server.infoServer.id);
        idcacti=await serverFunctions.createServerCacti(serverFull.addresses[Object.keys(serverFull.addresses)[0]][1].addr)
        server.idCacti=idcacti
        server.infoServer=serverFull
        serverFunctions.updateServer(server)
        ¨
    }else{
        console.log("Host cacti exist", server.idCacti)

    }
    const regex = /(\d+)/g;
    // exec('php -q /var/www/html/cacti/cli/add_graph_template.php --list-hosts', (error, stdout, stderr) => {
    exec('php -q /var/www/html/cacti/cli/add_graphs.php --host-id='+server.idCacti+' --graph-title='+nameGraphCreate+' --graph-type=cg --graph-template-id='+idGraphCreate, async (error, stdout, stderr) => {
        let arrayAnswer=stdout.split('-')
        // console.log(arrayAnswer,server.idCacti,idGraphCreate)
        if( arrayAnswer[0] == "Graph Added "){
            let idGraph =arrayAnswer[1].match(regex)[0]
            let idFile =arrayAnswer[2].match(regex)[0]
            infoGraph={
                name: nameGraphCreate,
                idServer:server._id,
                idTemplate: idGraphCreate,
                infoCacti: {idHost:idFile, idGraph:idGraph },
            }
            const graph = new Graph(infoGraph);
            // if (server.graphs) {
                server.graphs.push(graph)
            // }else{
                // server.graphs=graph
            // }
            console.log(server)
            await Server.findByIdAndUpdate(server._id,server,{ new: true})
            res.json(
                {   
                    status:'200',
                    answer:"Graph Created",
                    content: graph
                }
            );
            
            
            await graph.save();
        }else{
            if( arrayAnswer[0] == "NOTE: Not Adding Graph "){
                return res.json(
                    {
                        status:'400',
                        answer:"Graph exist"
                    }
                );
            }
            res.json(
                {
                    status:'404',
                    answer:"Graph Not exist"
                }
            );
        }
    })

};
GraphController.showGraph= async(req, res) => {
    try {
        const graph = await Graph.findById(req.params.id);
       
        if(!graph){
            res.json({status:404,
                content:"graph don exist",
                graphSearch:req.params.id
            })
        }else{
            res.json({status:200,
            content:graph})
        }
    }catch{
        res.json({status:404,
            content:"graph don exist",
            graphSearch:req.params.id
        })
    }
};
GraphController.getDataGraph= async(req, res) => {
    try {
        const graph = await Graph.findById(req.params.id);
       
        if(!graph){
            res.json({status:404,
                content:"graph don exist"})
        }else{
            // fs.readFile('/var/www/html/cacti/rra/'+graph.infoCacti.idHost+'/'+graph.infoCacti.idGraph+'.rrd.json','utf8', function(err, data) {
            fs.readFile('/var/www/html/cacti/rra/41/252.rrd.json','utf8', function(err, data) {
                        if (err) {
                        //   return console.log(err);
                          return  res.json({
                            status:404,
                            message: "error leer archivo",
                            content:err
                        })
                        }
                        try {
                            data=JSON.parse(data)
                        } catch (error) {
                            console.log(error)
                        }
                        return res.json({
                            status:200,
                            content: data
                        })
                        
                      });
        }
    } catch (error) {
        res.json({status:404,
        content:error})
    }
};

GraphController.updateGraph=async(req, res) => {
    const idGraph = req.params.id;
    const graph = new Graph(req.body);
    await Graph.findByIdAndUpdate(idGraph, {$set: graph },{ new: true});
    res.json(
        {
            status:'200',
            answer:"Graph Updated"
        }
    );
};

GraphController.deleteGraph=async(req, res) => {
    console.log("arquitectura a borrar",req.params.id)
    await Graph.findByIdAndDelete(req.params.id);
    res.json(
        {
            status:'200',
            answer:"Graph Delete"
        }
    );
};
GraphController.graphTypes=async(req, res) => {
    try{
        let graphsTypes=await graphFunctions.getGraphsTypes(req.params.id)
       if (graphsTypes == 'error') {
        res.json(
            {
                status:'404',
                content: 'Resource dont find'
            }
        );
       }else{
        res.json(
            {
                status:'200',
                content: graphsTypes
            }
        );
       }
            

        
    }catch{
        res.json(
            {
                status:'404',
                content: 'Resource dont find'
            }
        );
        
    }
    // await Graph.findByIdAndDelete(req.params.id);
    
};

async function getHostCacti(idServer){
    let server = await Server.findById(idServer);
    // console.log(server.infoServer.addresses[Object.keys(server.infoServer.addresses)[0]][1].addr)
    if (server.idCacti) {
       return server.idCacti  
    }
    if (server.infoServer.addresses) {
       ansCacti= await serverFunctions.createServerCacti(server.infoServer.addresses[Object.keys(server.infoServer.addresses)[0]][1].addr)
        
        // return 1
        // if (server.infoServer.addresses) {
            
        // }
    }
    // let portDevices
    // let serverOpenstack= await openstack.consultServer(server.infoServer.id);
    
    // await axios.get('http://'+config.ipOpenstack+':9696/v2.0/ports?device_id='+server.infoServer.id, config.headersOpenStack )
    //     .then(function (response) {
    //     portDevice= response.data.ports[0].id
    //     //  console.log(portDevice)
    //     })
    //     .catch(error =>{
    //     //    console.log(error)
    //     });
    // console.log(serverOpenstack.addresses)
    
    // body={
    //             "floatingip": {
    //                 "floating_network_id": config.idNetPublic,
    //                 "port_id": portDevice
    //             }
    //     }
    // await axios.post('http://'+config.ipOpenstack+':9696/v2.0/floatingips', body, config.headersOpenStack )
    // .then( data =>{
    //     // console.log(data)
    //     console.log("respuesta create ip")
    // })
    // .catch(error =>{
    //     console.log('error')
    // })
    // console.log('actializar')
    // console.log(portDevice)
    // console.log(config.idNetPublic)
   
    // server.infoServer=serverOpenstack
    // console.log(server.infoServer.addresses.aiotest[0].addr)
    // serverOpenstack= await openstack.consultServer(server.infoServer.id);
    // console.log(serverOpenstack.addresses)
    return 1
}

module.exports = GraphController;

