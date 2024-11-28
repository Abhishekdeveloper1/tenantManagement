const express = require('express');
const router = express.Router();

const {dashboard}=require("../controllers/DashboardController");
const {sessionMiddleware,checkSession} = require("../middleware/sessionMiddleware");

router.get('/dashboard',dashboard);
// router.get('/register1',register1);

module.exports=router;