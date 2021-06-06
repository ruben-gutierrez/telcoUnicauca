const openstack = require('../../functions/openstack');
// const TestMovil = require('../../models/server');
const TestMovil = require('../../models/telco_movil/testMovil');

const testMovilController = {};


testMovilController.executeTest = async (req, res) => {

    //variables de entrada
    var ipFlotant = req.body.dataForm.ipFlotante;   
    console.log("la ip flotante", ipFlotant)
    let snr = req.body.dataForm.tramas;
    let tramas = req.body.dataForm.tramas;
    let inisnr = req.body.dataForm.tramas;
    let canal = req.body.dataForm.tramas;
    let modotx = req.body.dataForm.tramas;
    let antenasenb = req.body.dataForm.tramas;
    let modelocanal = req.body.dataForm.tramas;
    let mcs = req.body.dataForm.tramas;
    let bloquerecu = req.body.dataForm.tramas;
    let simsnr = req.body.dataForm.tramas;
    let antenasue = req.body.dataForm.tramas;
    let puerenb = req.body.dataForm.tramas;
    let ssh;

    
    
    //clearAll(ipFlotant);
    // let eliminarDir =  openstack.executeComandVM(ipFlotant, 'oai', 'oai', 'rm -rf /home/telcoims/prueba/');
    // let crearDir =   openstack.executeComandVM(ipFlotant, 'oai', 'oai', 'mkdir /home/oai/prueba');

    //let crearPruebas= await openstack.executeComandVM(ipFlotant, 'oai', 'oai', 'cd /home/oai/pruebas')
    // let crearPruebas= await openstack.executeComandVM(ipFlotant, 'oai', 'oai', 'cd /home/oai/pruebas')
    //  let ssh = await openstack.executeComandVM(ipFlotant, 'oai', 'oai', 'cat /home/oai/*.csv');
    //  console.log("hhh",ssh)
    // var test = new TestMovil(req.body.dataForm);

    // guardarBD(ssh)    
    // let ='Promise { <pending> }'
    // var test = new TestMovil(req.body.dataForm);
    // console.log("ejecutar prueba",exe_prueba ) 
    //  cccccccccccccccclet ssh= 0;
    let contador = 0;

    var intevalId = setInterval(() => {
        // let findCSV = openstack.executeComandVM(ipFlotant, 'oai', 'oai', '/home/oai/prueba/ -name *csv');
        nombre(ipFlotant).then(val => {
            console.log("fiiiiiiiiin proemasa",val) 
                           })

                           console.log("afuera de val", val)


        findCSV= testconsul(ipFlotant)
         console.log("find es nn", findCSV)
        console.log("no encuentra archivo")
        //if(findCSV=''){
        // let mov = openstack.executeComandVM(ipFlotant, 'oai', 'oai', 'mv /home/oai/*csv /home/oai/prueba');
        
        console.log("encontro algo", findCSV)

        console.log("contador", contador);
        if (findCSV != null) {
            
            // ssh=testconsul(ipFlotant)
            // let ssh =  openstack.executeComandVM(ipFlotant, 'oai', 'oai', 'cat /home/oai/prueba/*.csv');
     
            clearInterval(intevalId)
        }
        contador++;
    }, 1000)
    ssh =1
    console.log("lo que tiene el ssh", ssh)
    let dataj = cvsJSON(ssh);
    test.infoResult = dataj;
    console.log("loque hay en la prueba", ssh)
    var test = new TestMovil(req.body.dataForm);
     test.save();
     res.json(
         {
             code: "200",
             status: 'ok',
             content: test
         }
     );


};

function guardarBD(ssh) {
    console.log('lo que hay en ssh', ssh)
    var test = new TestMovil(req.body.dataForm);
    let dataj = cvsJSON(ssh);
    test.infoResult = dataj;
    test.save();
    res.json(
        {
            code: "200",
            status: 'ok',
            content: test
        }
    );
}
var testExec = async function (ipFlotant){
    let exe_prueba = openstack.executeComandVM(ipFlotant, 'oai', 'oai', '/home/oai/openairinterface5g/cmake_targets/lte-simulators/build/./dlsim -n100');
    return exe_prueba;       
    // let  findCSV = await openstack.executeComandVM(ipFlotant, 'oai', 'oai', 'ls /home/oai/prueba');
    //  console.log("encontrar en find ",findCSV) 
}
var testFind = async function (ipFlotant){
    let  findCSV = await openstack.executeComandVM(ipFlotant, 'oai', 'oai', 'ls /home/oai/prueba');
    return findCSV;        
}
async function testconsul(ipFlotant) {
    // let  findCSV = openstack.executeComandVM(ipFlotant, 'oai', 'oai', '/home/oai/prueba/ -name *csv');

    let ssh =  await openstack.executeComandVM(ipFlotant, 'oai', 'oai', 'cat /home/oai/prueba/*.csv');
    return ssh
    
}

function clearAll(ipFlotant) {
    let eliminarDir = openstack.executeComandVM(ipFlotant, 'oai', 'oai', 'rm -rf /home/telcoims/prueba/');
    let crearDir = openstack.executeComandVM(ipFlotant, 'oai', 'oai', 'mkdir /home/oai/prueba');

}
function cvsJSON(data) {
    //quitar los /n
    var lines = data.split('\n');
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
    var result = [];
    var header = lines[0].split(";"); // ["SNR", "MCS", ...]


    for (var i = 1; i < lines.length; i++) {
        var obj = {}

        var recline = lines[i].split(";");
        // ["0.000", "6.000", ...]
        for (var j = 0; j < header.length; j++) {
            obj[header[j]] = recline[j];
        }
        result.push(obj);

        //result { "SNR" : "0.000", "MCS" : "6.000", ...}

    }
    //result { "SNR" : [0.0000, 0.0000, ...], "MCS" : [6.000, 20.000, ...], ..}
    // return JSON.stringify(result);
    return result
}



testMovilController.getDataTest = async (req, res) => {
    // let ssh= await openstack.executeComandVM('192.168.40.222', 'oaim', 'oai', 'cat /home/oaim/oai/openairinterface5g/cmake_targets/build/bler_tx2_chan5_nrx2__mcs20.csv');
    let ssh = await openstack.executeComandVM('192.168.40.249 ', 'oaim', 'oai', 'cat /home/oaim/pr1.csv');
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
    let prueba2 = "entro"
    let dataj = cvsJSON(ssh);
    // tipo=typeof dataj;
    // console.log(dataj)
    res.json(
        {
            code: "200",
            status: 'ok',
            content: dataj
        }
    );

}
testMovilController.getTests = async (req, res) => {
    let tests = await TestMovil.find();

    res.json(
        {
            code: "200",
            status: 'ok',
            content: tests
        }
    );

}
testMovilController.createTest = async () => {

}
testMovilController.getTest = async (req, res) => {
    try {
        const test = await TestMovil.findById(req.params.id)
        if (!test) {
            res.json({
                status: 404,
                content: test
            })
        } else {
            res.json({
                status: 200,
                content: test
            })
        }
    } catch (error) {
        res.json({
            status: 400,
            content: error

        })
    }
}
testMovilController.updateTest = async () => {

}
testMovilController.deleteTest = async (req, res) => {
    await TestMovil.findByIdAndDelete(req.params.id);
    res.json({
        status: '200',
        answer: "Server Delete"
    });
}



module.exports = testMovilController;

 // console.log('lo que hay en ssh', ssh)
    // var test = new TestMovil(req.body.dataForm);
    // let dataj = cvsJSON(ssh);
    // test.infoResult = dataj;

    // await test.save();
    // res.json(
    //     {
    //         code: "200",
    //         status: 'ok',
    //         content: test
    //     }
    // );
    // function findCSV(){
    //     let myVar=setInterval(function(){
    //         let s= openstack.executeComandVM(ipFlotant, 'oai', 'fine . -iname *.csv');
    //         console.log("que tiene s", s);
    //         if(s=null){
    //         ssh= openstack.executeComandVM(ipFlotant, 'oai', 'oai', 'cat /home/oai/pruebas/*.csv');
    //         console.log('lo que hay en ssh',ssh)
    //         var test = new TestMovil(req.body.dataForm);    
    //         let dataj=cvsJSON(ssh);
    //         test.infoResult=dataj;    

    //         test.save();
    //         res.json(
    //             {
    //                 code:"200",
    //                 status: 'ok',
    //                 content: test
    //             }
    //         ); 
    //         clearInterval(myVar);
    //         }
    //     },2000);    
    //     }

    //findCVS();
    //console.log(findCVS());

    // await new Promise(function(resolve, reject){
    //     resolve('somethin')
    // }).then(res=>{         
        

    // }).catch(error=>{
    //     console.log("error consultar prueba")
    // })