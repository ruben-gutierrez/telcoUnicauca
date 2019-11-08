const express = require ('express');
const morgan = require('morgan');
const app = express();


const { mongoose } = require('./database');
//Settings
app.set('port', process.env.PORT || 3000 );


//Middlewares
app.use(morgan('dev'));
app.use(express.json());


//Routes

app.use('/api/users', require('./routes/user.routes'));
app.use('/auth', require('./routes/auth.routes'));

//Starting the server


app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});