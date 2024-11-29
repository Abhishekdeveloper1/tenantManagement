const express = require('express');
const router = express.Router();

const {dashboard,packagelist}=require("../controllers/DashboardController");
const {sessionMiddleware,checkSession} = require("../middleware/sessionMiddleware");

router.get('/dashboard',dashboard);
router.get('/subscription',packagelist);

module.exports=router;