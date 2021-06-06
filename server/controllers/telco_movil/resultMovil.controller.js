const openstack = require('../../functions/openstack');
// const TestMovil = require('../../models/server');
const ResultMovil = require('../../models/telco_movil/resultMovil');

const resultMovilController={};

resultMovilController.createResult=async(req, res)=>{
     console.log("resultad", req.body.ipFlotante)
     let ssh= await openstack.executeComandVM(req.body.ipFlotante, 'oai', 'oai', 'cat /home/oai/openairinterface5g/cmake_targets/lte-simulators/build/*.csv');
    //  let ssh= await openstack.executeComandVM('192.168.40.182', 'oai', 'oai', 'cat /home/oaim/Descargas/A.csv');
    
    let dataj=cvsJSON(ssh);
    var result = new ResultMovil(req.body);    
    console.log(req.body._id);
    // result.idPrueba=req.body_id
    result.infoPrueba = req.body;   
    result.infoResult=dataj
    // console.log("resultado",dataj)




 await result.save();
// tipo=typeof dataj;
    res.json(
        {
            code:"200",
            status: 'ok',
            content: result
        }
    );
    
} 



resultMovilController.getResults=async(req, res)=>{
    let tests = await ResultMovil.find();

    res.json(
        {
            code:"200",
            status: 'ok',
            content: tests
        }
    );
    
}

resultMovilController.deleteResult=async(req, res)=>{
    await ResultMovil.findByIdAndDelete(req.params.id);
    res.json({
        status:'200',
        answer:"Result Delete"
    });
}


function cvsJSON(data){
    //quitar los /n
    var lines=data.split('\n');  
    /**
     * "SNR; MCS"
     * "0.000";"6.000"
     * "0.000";"20.000"
     * "0.000";"6.000"
     * {
     *  "SNR" : [
     *      "0.0000",
     *      "0.0000"
     *  ],
     *  "MCS" : [
     *      "6.000",
     *      "20.000"
     *  ]
     * }
     * 
     */
    // for(var i=0; i<lines.length;i++){
    //     lines[i]=lines[i].replace(/\\/)
    // }
    var result=[]; 
    var header=lines[0].split(";"); // ["SNR", "MCS", ...]


    for(var i=1; i<lines.length;i++){
        var obj={}
        
        var recline=lines[i].split(";");
        // ["0.000", "6.000", ...]
        for(var j=0;j<header.length;j++){
            obj[header[j]]=recline[j];
        }
        result.push(obj);

        //result { "SNR" : "0.000", "MCS" : "6.000", ...}

    }
    //result { "SNR" : [0.0000, 0.0000, ...], "MCS" : [6.000, 20.000, ...], ..}
    // return JSON.stringify(result);
    return result
}


module.exports = resultMovilController;


    //     let datassh = ssh.split('\n');
//    let headers = datassh[0].split(";");
//    headers = headers.map((value)=> value.trim());
//    let result = {};
//    headers.forEach(value => result[value] = []);
//    for (let i = 1; i < datassh.length; i++) {  
//         let values = datassh[i].split(";");
//         values = values.map((value)=> value.trim());
//         for (let j = 0; j < values.length; j++) {
//             let temp = result[headers[j]];
//             temp.push(values[j]);
//             result[headers[j]] = temp;
//         }
//     }   
//     let jsonResult = JSON.stringify(result);