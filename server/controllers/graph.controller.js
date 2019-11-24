const Graph = require('../models/graph');
const config = require('../config');
const axios = require("axios");

const GraphController={};

GraphController.getGraphs= async(req, res) => {
    const graph = await Graph.find();
    res.json(graph);
};
GraphController.createGraph= async(req, res) => {
    const graph = new Graph(req.body);
    await graph.save();
    res.json(
        {
            status:'200',
            answer:"Graph Created"
        }
    );
};
GraphController.showGraph= async(req, res) => {
    const graph = await Graph.findById(req.params.id);
    res.json(graph);
};
GraphController.updateGraph=async(req, res) => {
    const idGraph = req.params.id;
    const graph = new Graph(req.body);
    await Graph.findByIdAndUpdate(idGraph, {$set: graph },{ new: true});
    res.json(
        {
            status:'200',
            answer:"Graph Updated"
        }
    );
};
GraphController.deleteGraph=async(req, res) => {
    await Graph.findByIdAndDelete(req.params.id);
    res.json(
        {
            status:'200',
            answer:"Graph Delete"
        }
    );
};

module.exports = GraphController;