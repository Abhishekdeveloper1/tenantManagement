const express = require('express');
const router = express.Router();
const { createUser, register } = require('../controllers/auth/authController.js');

router.get('/register', register);
router.post('/createUser', createUser);

module.exports = router;
