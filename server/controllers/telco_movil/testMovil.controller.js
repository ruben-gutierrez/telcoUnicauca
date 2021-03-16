const openstack = require('../../functions/openstack');
// const TestMovil = require('../../models/server');
const TestMovil = require('../../models/telco_movil/testMovil');

const testMovilController={};


testMovilController.executeTest= async(req, res) => {

    let ssh= await openstack.executeComandVM('192.168.40.229', 'oai', 'oai', 'cat /home/oai/Escritorio/test.');
     var test = new TestMovil();
    //  console.log(req.body.dataForm.canal)
     test.canal =req.body.dataForm.canal
    // // server1.infoServer = server.content;
    // server1.infoServer = consServer;
    // server1.idArquitecture = req.body.idArq
    // console.log(server.content.id);                
    // // server1.infoServer.address=consServer.content;
    // // console.log(server1)
    

    await test.save();
    res.json(
        {
            code:"200",
            status: 'ok',
            content: ssh
        }
    );
};

testMovilController.getDataTest=async(req, res)=>{
    // let ssh= await openstack.executeComandVM('192.168.40.222', 'oaim', 'oai', 'cat /home/oaim/oai/openairinterface5g/cmake_targets/build/bler_tx2_chan5_nrx2__mcs20.csv');
    let ssh= await openstack.executeComandVM('192.168.40.249 ', 'oaim', 'oai', 'cat /home/oaim/pr1.csv');
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
    let prueba2="entro"
    let dataj=cvsJSON(ssh);
    // tipo=typeof dataj;
    // console.log(dataj)
    res.json(
        {
            code:"200",
            status: 'ok',
            content: dataj
        }
    );
    
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
testMovilController.getTests=async(req, res)=>{
    let tests = await TestMovil.find();

    res.json(
        {
            code:"200",
            status: 'ok',
            content: tests
        }
    );
    
}
testMovilController.createTest=async()=>{

}
testMovilController.showTest=async()=>{

}
testMovilController.updateTest=async()=>{

}
testMovilController.deleteTest=async()=>{

}



module.exports = testMovilController;