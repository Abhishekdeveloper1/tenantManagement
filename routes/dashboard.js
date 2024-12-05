const express = require('express');
const router = express.Router();

const {dashboard,packagelist,subscriptionplan,addSubscriptionPlan,subscriptionplanlist}=require("../controllers/DashboardController");
const {sessionMiddleware,checkSession,checkAdminRole,checkOwnerRole,checkTenantRole} = require("../middleware/sessionMiddleware");

router.get('/dashboard',checkSession,dashboard);
router.get('/subscription-plans',checkOwnerRole,packagelist);
router.get('/subscriptionplan',checkAdminRole,subscriptionplan);
router.post('/add-subscription-plan',checkAdminRole,checkAdminRole,addSubscriptionPlan);
router.get('/subscription-list',checkAdminRole,subscriptionplanlist);




module.exports=router;