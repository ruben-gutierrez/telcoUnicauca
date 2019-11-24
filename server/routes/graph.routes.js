const express = require('express');
const router = express.Router();
const graphController = require('../controllers/graph.controller');

router.get('/graphs',graphController.getGraphs);
router.post('/graph',graphController.createGraph);
router.get('/graph/:id',graphController.showGraph);
router.put('/graph/:id',graphController.updateGraph);
router.delete('/graph/:id',graphController.deleteGraph);


module.exports = router;