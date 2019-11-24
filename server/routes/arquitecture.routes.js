const express = require('express');
const router = express.Router();
const arquitectureController = require('../controllers/arquitecture.controller');

router.get('/arquitectures',arquitectureController.getArquitectures);
router.post('/arquitecture',arquitectureController.createArquitecture);
router.get('/arquitecture/:id',arquitectureController.showArquitecture);
router.put('/arquitecture/:id',arquitectureController.updateArquitecture);
router.delete('/arquitecture/:id',arquitectureController.deleteArquitecture);


module.exports = router;