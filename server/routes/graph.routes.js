const express = require('express');
const router = express.Router();
const graphController = require('../controllers/graph.controller');

router.get('/graphs',graphController.getGraphs);
router.post('/graph',graphController.createGraph);
router.get('/graph/:id',graphController.showGraph);
router.get('/graphData/:id',graphController.getDataGraph);
router.put('/graph/:id',graphController.updateGraph);
router.delete('/graph/:id',graphController.deleteGraph);
router.get('/graphTypes/:id',graphController.graphTypes);


module.exports = router;