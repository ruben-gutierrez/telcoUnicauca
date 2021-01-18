const Test = require('../models/test');
const Arquitecture = require('../models/arquitecture');
const Server = require('../models/server');
const Graph = require('../models/graph');
const config = require('../config');
const axios = require("axios");
const fs = require('fs');
const openstack = require('../functions/openstack')
const fGraph = require('../functions/graph')
const { exec } = require('child_process');
var SSH = require('simple-ssh');

const TestController={};

TestController.getTests= async(req, res) => {
    const test = await Test.find();
    res.json(test);
};
TestController.testTests= async(req, res) => {
    const arquitectures= await Arquitecture.find();
    let tests= await Test.find();
    let graphs= await Graph.find();
    let servers= await Server.find();
    
    arquitectures.forEach(async arquitecture => {
      await  Arquitecture.findByIdAndDelete(arquitecture._id)
        
    });
    tests.forEach(async test => {
       await Test.findByIdAndDelete(test._id)
        
    });
    graphs.forEach(async graph => {
      await  Graph.findByIdAndDelete(graph._id)
        
    });
    servers.forEach(async server => {
      await  Server.findByIdAndDelete(server._id)
    });
    res.send('borrado')
};
TestController.createTest= async(req, res) => {

    try {
        arquitecture = await Arquitecture.findById(req.body.idArquitecture)
        if (arquitecture) {


            let EDFile = req.body.contentFile
            const test = new Test(req.body);
            fs.appendFile('server/assets/tests/'+ test._id +'.xml', req.body.contentFile , (err) => {
                if (err) throw err;
                test.file=test._id+'.xml'
                test.status="active"
                test.type="aio"
                arquitecture.tests.push(test)
                arquitecture.save()
                test.save();
            });
            // console.log(req.body.contentFile)
            // fs.writeFile('server/assets/tests/'+ test._id +'.xml', req.body.contentFile ,  {'flag':'a'},  function(err) {
            //     if (err) {
            //         return console.error(err);
            //     }
            // });
           
            

            res.json(
                {
                    status:'200',
                    content:req.body,
                    arquitecture:arquitecture
                });
        }else{
            res.json(
                {
                    status:'404',
                    content:"Test dont create, arquitecture dont exist"
                }
            );
        }
        
    } catch (error) {
        res.json(
            {
                status:'400',
                content:"Resources dont exist"
            }
        );
    }
   
};
TestController.showTest= async(req, res) => {
    const test = await Test.findById(req.params.id);
    res.json(test);
};
TestController.executeTest= async(req, res) => {
    try {
        test = await Test.findById(req.params.id);
        arquitecture=await Arquitecture.findById(test.idArquitecture)
        arquitecture.tests.forEach(async (testArq,index) => {
        if (test._id.toString() == testArq._id.toString()) {

            arquitecture.tests[index].status='running'
            await Arquitecture.findByIdAndUpdate(arquitecture._id, arquitecture)
            // await arquitecture.save()
            test.status='running'
            await test.save()
            res.json(
                {
                    status:'200',
                    // content:arquitecture.tests[index].status
                }
            );
        }
    });
    
    // res.json(test);
    
    } catch (error) {
        res.json(
            {
                status:'400',
                content:error
            }
        );
    }
    
};
TestController.stopTest= async(req, res) => {
    try {
        test = await Test.findById(req.params.id);
        arquitecture=await Arquitecture.findById(test.idArquitecture)
        arquitecture.tests.forEach(async (testArq,index) => {
        if (test._id.toString() == testArq._id.toString()) {
            
            arquitecture.tests[index].status='active'
            await Arquitecture.findByIdAndUpdate(arquitecture._id, arquitecture)
            // await arquitecture.save()
            test.status='active'
            await test.save()
            res.json(
                {
                    status:'200',
                    content:test
                }
            );
        }
    });
    
    // res.json(test);
    
    } catch (error) {
        res.json(
            {
                status:'400',
                content:error
            }
        );
    }
    
};
TestController.updateTest=async(req, res) => {
    const idTest = req.params.id;
    const test = new Test(req.body);
    await Test.findByIdAndUpdate(idTest, {$set: test },{ new: true});
    res.json(
        {
            status:'200',
            answer:req.params.id,
            
        }
    );
};
TestController.updateTestFile=async(req, res) => {
    const idTest = req.params.id;
  
    console.log('content file', req.body)
        fs.writeFileSync('server/assets/tests/'+idTest+'.xml',req.body.file,{encoding:'utf8',flag:'w'})
        res.json(
            {
                status:'200',
                answer:req.params.id
            }
        );
    
    
    
    
    // await Test.findByIdAndUpdate(idTest, {$set: test },{ new: true});
   
};
TestController.getTestData=async(req, res) => {
    const idTest = req.params.id;
    try {
        test=await Test.findById(idTest);

        fs.readFile('server/assets/tests/'+test.file,'utf8', function(err, data) {
            if (err) {
            //   return console.log(err);
              return  res.json({
                status:404,
                message: "error leer archivo",
                content:err
            })
            }
            
        //     data=JSON.parse(data)
            return res.json({
                status:200,
                content: data
            })
          });
        
        
    } catch (error) {
        res.json(
            {
                status:'400',
                content:'resource dont exist'
            }
        );
    }
};
TestController.deleteTest=async(req, res) => {
    try {
        
        let test=await Test.findById(req.params.id);
        
        
        if (test) {
            let arquitecture=await Arquitecture.findById(test.idArquitecture)
            if (arquitecture) {
                await arquitecture.tests.forEach(async (testArq, index) => {
                    
                    if (testArq._id.toString() == test._id.toString()) {

                        arquitecture.tests.splice(index,1)
                        await Test.findByIdAndDelete(req.params.id);
                        await arquitecture.save()
                        fs.unlink('server/assets/tests/' + test._id+'.xml', (err) => {  // data[key] devuelve el valor del campo
                            if(err) throw err;
                            // console.log('File deleted: ' + data[key]);
                        });
                        res.json(
                            {
                                status:'200',
                                answer:"Test Delete"
                            }
                        );
                    }
                });
                
                
            }else{
                res.json(
                    {
                        status:'405',
                        answer:"Resource dont exist"
                    }
                );
            }
            
        }else{
            res.json(
                {
                    status:'405',
                    answer:"Resource dont exist"
                }
            );
        }
    } catch (error) {
        res.json(
            {
                status:'400',
                answer:"Infomation invalid"
            }
        );
    }
    
    
};



TestController.testing= async(req, res) => {
    res.send("cahvis esto es una prueba");
    //leer archivo linea por linea
    // try {
    //     file = fs.readFileSync('server/scripts/coreIMS/sipp.sh','utf8');
    //   } catch (err) {
    //     //   console.log("fallo el archivo")
    //     file="sudo apt install sipp -y"
    // }
   
    
    
    
    // keyPair=fs.readFileSync('server/key.pem', {
    //     encoding: 'utf8',
    //   })
    // var ssh = new SSH({
    //     host: '192.168.40.17',
    //     user: 'ubuntu',
    //     key: keyPair
    // });

    // ssh.exec("sudo echo '"+file+"'>scriptInstall"),
    // ssh.exec("sudo chmod 775 scriptInstall"),
    // ssh.exec("sudo ./scriptInstall",{
    //     pty: true,
    //     out: console.log.bind(console)
    // }),
    // ssh.exec("sudo /etc/rc2.d/S99zclearwater-aio-first-boot")
    // .start();
    
    // res.json({
    //     function:'ok'
    // })

    //tratar graficas
    //  try {
    //     exec("php /var/www/html/cacti/cli/list-graphs-host.php --list-graphs-host=41  | sed '1d' | sed '/^$/d' ",async  (error, stdout, stderr) => {
    //         if (error) {
    //             res.json({
    //                 status:400,
    //                 content:error
    //             });
    //           return;
    //         }
    //         ansCacti=stdout.split('\n')
    //         // ansCacti.forEach( (line,index) => {
    //         for await ([index, line] of ansCacti.entries()){                

    //             if (line !='') {
                    
    //                 ansCacti[index]=line.split('\t')
                    
    //                 if (ansCacti[index][ansCacti[index].length] == undefined) {
    //                     ansCacti[index].splice(ansCacti[index].length - 1,1)
    //                 }
                    
    //             }else{
    //                 ansCacti.splice(index,1)
    //             }
                
                
    //         };
            
    //         res.json({
    //             status:200,
    //             content:ansCacti,
    //             origin:stdout
    //         });
            
    //       });
           
    //       } catch (e) {
    //         res.json({
    //             status:400,
    //             content:e});
    //       }

    
};
module.exports = TestController;