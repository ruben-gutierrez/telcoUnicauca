const express = require('express');
const router = express.Router();


const testMovilController = require('../../controllers/telco_movil/testMovil.controller');



router.get('/',testMovilController.getInfo);
// router.get('/',testMovilController.getTest);
// router.post('/',testMovilController.createTest);
// router.get('/:id',testMovilController.showTest);
// router.put('/:id',testMovilController.updateTest);
// router.delete('/:id',testMovilController.deleteTest);




module.exports = router; 