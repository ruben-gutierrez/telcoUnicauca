const express = require('express');
const router = express.Router();
const ServerController = require('../controllers/server.controller');

router.get('/servers',ServerController.getServers);
router.post('/server',ServerController.createServer);
router.get('/server/:id',ServerController.showServer);
router.put('/server/:id',ServerController.updateServer);
router.delete('/server/:id',ServerController.deleteServer);
router.post('/server/:id',ServerController.actionsServer);

module.exports = router;