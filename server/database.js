const mongoose = require('mongoose');

const URI = 'mongodb://localhost/telco';
mongoose.connect(URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log(' db is conected'))
    .catch( err => console.error( err ));


module.exports = mongoose;