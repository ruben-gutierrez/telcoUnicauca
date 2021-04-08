const express = require('express');
const router = express.Router();


const resultMovilController = require('../../controllers/telco_movil/resultMovil.controller');



router.post('/mresult',resultMovilController.createResult); 
// router.post('/mresul',resultMovilController.executeTest); 

router.get('/mresults',resultMovilController.getResults); 
//router.get('/datatest/:id',testMovilController.getDataTest);
// router.post('/',testMovilController.createTest);
//router.get('/mtest/:id',testMovilController.getTest);
// router.put('/:id',testMovilController.updateTest);
router.delete('/mresult/:id',resultMovilController.deleteResult);




module.exports = router; 