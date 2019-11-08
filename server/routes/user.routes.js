const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/',userController.getUsers);
router.post('/',userController.createUser);
router.get('/:id',userController.showUser);
router.put('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);

module.exports = router;