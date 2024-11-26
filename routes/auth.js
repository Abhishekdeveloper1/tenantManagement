// const express = require('express')
// const router=express.Router()

// const {createUser}=require("../controllers/auth/authController.js");

// router.post('/createUser',createUser);

// module.exports=router;

const express = require('express');
const router = express.Router();
const { createUser, register } = require('../controllers/auth/authController.js');

// Route to render the registration form
router.get('/register', register);

// Route to handle user creation
router.post('/createUser', createUser);

module.exports = router;
