const express = require('express');
const router = express.Router();
const openstackController = require('../controllers/openstack.controller');

router.get('/test/:id',openstackController.test);


router.get('/consoleVM/:id',openstackController.getNetworks);


router.get('/networks',openstackController.getNetworks);
router.get('/network/:id',openstackController.showNetwork);
router.post('/network',openstackController.createNetwork);
router.delete('/network/:id',openstackController.deleteNetwork);
router.put('/network:id',openstackController.updateNetwork);

router.get('/subnets',openstackController.getSubnets);
router.get('/subnet/:id',openstackController.showSubnet);
router.post('/subnet',openstackController.createSubnet);
router.delete('/subnet/:id',openstackController.deleteSubnet);
router.put('/subnet/:id',openstackController.updateSubnet);

router.get('/routers',openstackController.getRouters);
router.get('/router/:id',openstackController.showRouter);
router.post('/router',openstackController.createRouter);
router.delete('/router/:id',openstackController.deleteRouter);
router.put('/router/:id',openstackController.updateRouter);
router.put('/router/:id/conectPublicNet/:idnet',openstackController.conectPublicRouter);
router.put('/router/:id/conectPrivateNet/:idnet',openstackController.conectPrivateRouter);

router.get('/servers',openstackController.getServers);
router.get('/server/:id',openstackController.showServer);
router.post('/server',openstackController.createServer);
router.delete('/server/:id',openstackController.deleteServer);
router.put('/server/:id/resize/:idFlavor',openstackController.updateServer);
router.put('/server/:id/shutdown',openstackController.shutdownServer);
router.put('/server/:id/turn_on',openstackController.turnOnServer);
router.post('/server/:id/create_image/:nameImage',openstackController.createImageFromServer);
router.put('/server/:id/rebuild/:idImage',openstackController.rebuildServer);
router.get('/server/ports/:id',openstackController.showPortsServer);

router.get('/flavors',openstackController.getFlavors);
router.get('/flavor/:id',openstackController.showFlavor);
router.post('/flavor',openstackController.createFlavor);
router.delete('/flavor/:id',openstackController.deleteFlavor);
router.put('/flavor/:id',openstackController.updateFlavor);

router.get('/images',openstackController.getImages);
router.get('/image/:id',openstackController.showImage);
router.post('/image',openstackController.createImage);
router.delete('/image/:id',openstackController.deleteImage);
router.put('/image/:id',openstackController.updateImage);

router.get('/ports',openstackController.getPorts);
router.get('/port/:id',openstackController.showPort);
router.post('/port',openstackController.createPort);
router.delete('/port/:id',openstackController.deletePort);
router.put('/port/:id',openstackController.updatePort);

router.get('/instants',openstackController.getInstants);
router.get('/instant/:id',openstackController.showInstant);
router.post('/instant',openstackController.createInstant);
router.delete('/instant/:id',openstackController.deleteInstant);
router.put('/instant/:id',openstackController.updateInstant);

router.get('/ipfloats',openstackController.getIpfloats);
router.get('/ipfloat:id',openstackController.showIpfloat);
router.post('/ipfloat',openstackController.createIpfloat);
router.delete('/ipfloat:id',openstackController.deleteIpfloat);
router.put('/ipfloat/:id',openstackController.updateIpfloat);
router.put('/ipfloat/:id/setport/:idPort',openstackController.SetServerIpfloat);
router.post('/ipfloat/:id/setport',openstackController.createAndLinkIpfloat);


module.exports = router;