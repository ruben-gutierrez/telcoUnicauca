const express = require('express');
const router = express.Router();


const testMovilController = require('../../controllers/telco_movil/testMovil.controller');



router.get('/',testMovilController.getInfo);





module.exports = router; 