const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/',verifyToken,authController.me);
router.post('/signin',authController.signin);
router.post('/signup',authController.signup);

module.exports = router;