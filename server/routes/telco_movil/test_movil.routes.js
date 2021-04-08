const express = require('express');
const router = express.Router();


const testMovilController = require('../../controllers/telco_movil/testMovil.controller');



router.post('/mtest',testMovilController.executeTest); 
router.get('/mtests',testMovilController.getTests); 
router.get('/datatest/:id',testMovilController.getDataTest);
// router.post('/',testMovilController.createTest);
router.get('/mtest/:id',testMovilController.getTest);
// router.put('/:id',testMovilController.updateTest);
 router.delete('/mtest/:id',testMovilController.deleteTest);




module.exports = router; 