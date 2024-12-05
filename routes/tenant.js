const express=require('express');
const router=express.Router();
const { uplodMiddleware } = require('../middleware/fileuploadMiddleware');
const { addTenantDetails,saveTenantDetails } = require("../controllers/TenantController");
const {sessionMiddleware,checkSession,checkAdminRole,checkOwnerRole,checkTenantRole} = require("../middleware/sessionMiddleware");

router.get('/add-tenant-details',addTenantDetails);
router.post('/save-tenant-details',uplodMiddleware.fields([{ name: 'idProof', maxCount: 1 }, { name: 'addressProof', maxCount: 8 }]),saveTenantDetails);

module.exports=router;
