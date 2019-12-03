const express = require ('express');
const cron = require('node-cron');
const morgan = require('morgan');
const cors = require('cors');
const app = express();


const exec = require('child_process').exec;
var config = require('./config');


const { mongoose } = require('./database');
//Settings
app.set('port', process.env.PORT || 3000 );


//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: ['http://192.168.0.13:4200','http://localhost:4200']}))


//Routes

app.use('/api/users', require('./routes/user.routes'));
app.use('/auth', require('./routes/auth.routes'));
app.use('/openstack', require('./routes/openstack.routes'));
app.use('/', require('./routes/proyectTelco.routes'));
app.use('/ims/', require('./routes/arquitecture.routes'));
app.use('/ims/', require('./routes/test.routes'));
app.use('/ims/', require('./routes/graph.routes'));
app.use('/ims/', require('./routes/server.routes'));

//Starting the server


app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
    exec('sh server/scripts/createToken.sh',
      (error, stdout, stderr) => {
            // console.log(`${stdout}`);
            config.tokenOpenStack = stdout.replace('\r', '');
            config.headersOpenStack = { headers:{
              'X-Auth-Token': config.tokenOpenStack, 
              'Content-Type': 'application/json', 
              'Access-Control-Allow-Origin': '10.55.6.31',
              'Access-Control-Allow-Credentials': 'true',
              'Access-Control-Allow-Expose-Headers': 'Authorization',
              'Access-Control-Max-Age': '86400'
            }};
      }
    );

    var task = cron.schedule('59 * * * *', () =>  {
        exec('sh server/scripts/createToken.sh',
          (error, stdout, stderr) => {
              // console.log(`${stdout}`);
              config.tokenOpenStack = stdout.replace('\r', '');
              config.headersOpenStack = { headers:{
                'X-Auth-Token': config.tokenOpenStack, 
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '10.55.6.31',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Expose-Headers': 'Authorization',
                'Access-Control-Max-Age': '86400'
              }};
          }
        );
      }, {
        scheduled: false
      });

      task.start();
});





