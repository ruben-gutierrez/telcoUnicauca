const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');


router.get('/',verifyToken,userController.getUsers);
router.post('/',verifyToken,userController.createUser);
router.get('/:id',verifyToken,userController.showUser);
router.put('/:id',verifyToken,userController.updateUser);
router.delete('/:id',verifyToken,userController.deleteUser);

module.exports = router;