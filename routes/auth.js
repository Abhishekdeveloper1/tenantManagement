const express = require('express');
const router = express.Router();
const { createUser, register, logout, login } = require('../controllers/auth/AuthController.js');


router.get('/register', register);
router.post('/createUser', createUser);
router.post('/login', login);
router.get('/logout',logout);


module.exports = router;
