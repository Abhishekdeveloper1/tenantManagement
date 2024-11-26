const express = require('express');
const router = express.Router();

const {dashboard}=require("../controllers/DashboardController");
router.get('/dashboard',dashboard);
// router.get('/register1',register1);

module.exports=router;