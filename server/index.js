const express = require ('express');
const cron = require('node-cron');
const morgan = require('morgan');
// const http = require ('http');
const cors = require('cors');
const app = express();


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

//Starting the server


app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));


    var task = cron.schedule('* * * * *', () =>  {
        console.log('Task every minute');
      }, {
        scheduled: false
      });

      task.start();
});





