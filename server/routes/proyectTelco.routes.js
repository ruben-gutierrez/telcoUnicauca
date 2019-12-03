const express = require('express');
const router = express.Router();
const proyectTelcoController = require('../controllers/proyectTelco.controller');

router.get('/proyectstelco',proyectTelcoController.getProyectsTelco);
router.post('/proyecttelco',proyectTelcoController.createProyectTelco);
router.get('/proyecttelco/:id',proyectTelcoController.showProyectTelco);
router.put('/proyecttelco/:id',proyectTelcoController.updateProyectTelco);
router.delete('/proyecttelco/:id',proyectTelcoController.deleteProyectTelco);


module.exports = router;