const express = require('express');
const router = express.Router();
const testController = require('../controllers/test.controller');

router.get('/tests',testController.getTests);
router.post('/test',testController.createTest);
router.get('/test/:id',testController.showTest);
router.put('/test/:id',testController.updateTest);
router.delete('/test/:id',testController.deleteTest);


module.exports = router;