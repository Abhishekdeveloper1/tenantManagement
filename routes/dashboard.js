const express = require('express');
const router = express.Router();

const {dashboard,packagelist,subscriptionplan,addSubscriptionPlan,subscriptionplanlist}=require("../controllers/DashboardController");
const {sessionMiddleware,checkSession} = require("../middleware/sessionMiddleware");

router.get('/dashboard',dashboard);
router.get('/subscription',packagelist);
router.get('/subscriptionplan',subscriptionplan);
router.post('/add-subscription-plan',addSubscriptionPlan);
router.get('/subscription-list',subscriptionplanlist);




module.exports=router;