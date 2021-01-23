const express = require('express');
const router = express.Router();


const MachineMovilController = require('../../controllers/telco_movil/machineMovil.controller');


router.put('/mserver/:id', MachineMovilController.updatedMachineMovil);

router.get('/mservers', MachineMovilController.getMachinesMovil);
router.post('/mserver', MachineMovilController.createMachineMovil);
router.get('/mserver/:id', MachineMovilController.showMachineMovil);
router.delete('/mserver/:id', MachineMovilController.deleteMachineMolvil);
router.post('/mserver/arquitecture/:id',MachineMovilController.addMachineOp)



module.exports = router; 