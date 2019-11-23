const express = require('express');
const router = express.Router();
const openstackController = require('../controllers/openstack.controller');

router.get('/test',openstackController.test);

router.get('/networks',openstackController.getNetworks);
router.get('/network/:id',openstackController.showNetwork);
router.post('/network/:id',openstackController.createNetwork);
router.delete('/network/:id',openstackController.deleteNetwork);
router.put('/network:id',openstackController.updateNetwork);

router.get('/subnets',openstackController.getSubnets);
router.get('/subnet/:id',openstackController.showSubnet);
router.post('/subnet/:id',openstackController.createSubnet);
router.delete('/subnet/:id',openstackController.deleteSubnet);
router.put('/subnet/:id',openstackController.updateSubnet);

router.get('/servers',openstackController.getServers);
router.get('/server/:id',openstackController.showServer);
router.post('/server/:id',openstackController.createServer);
router.delete('/server/:id',openstackController.deleteServer);
router.put('/server/:id',openstackController.updateServer);

router.get('/flavors',openstackController.getFlavors);
router.get('/flavor/:id',openstackController.showFlavor);
router.post('/flavor/:id',openstackController.createFlavor);
router.delete('/flavor/:id',openstackController.deleteFlavor);
router.put('/flavor/:id',openstackController.updateFlavor);

router.get('/images',openstackController.getImages);
router.get('/image:id',openstackController.showImage);
router.post('/image:id',openstackController.createImage);
router.delete('/image:id',openstackController.deleteImage);
router.put('/image:id',openstackController.updateImage);

router.get('/ports',openstackController.getPorts);
router.get('/port:id',openstackController.showPort);
router.post('/port:id',openstackController.createPort);
router.delete('/port:id',openstackController.deletePort);
router.put('/port:id',openstackController.updatePort);

router.get('/instants',openstackController.getInstants);
router.get('/instant:id',openstackController.showInstant);
router.post('/instant:id',openstackController.createInstant);
router.delete('/instant:id',openstackController.deleteInstant);
router.put('/instant:id',openstackController.updateInstant);

router.get('/ipfloats',openstackController.getIpfloats);
router.get('/ipfloat:id',openstackController.showIpfloat);
router.post('/ipfloat:id',openstackController.createIpfloat);
router.delete('/ipfloat:id',openstackController.deleteIpfloat);
router.put('/ipfloat:id',openstackController.updateIpfloat);


module.exports = router;