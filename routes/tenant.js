const express=require('express');
const router=express.Router();
const { uplodMiddleware } = require('../middleware/fileuploadMiddleware');
const { addTenantDetails,saveTenantDetails,tenantList, editTenantController,updatetenantDetails} = require("../controllers/TenantController");
const {sessionMiddleware,checkSession,checkAdminRole,checkOwnerRole,checkTenantRole} = require("../middleware/sessionMiddleware");

router.get('/add-tenant-details',checkSession,checkTenantRole,addTenantDetails);
router.post('/save-tenant-details',checkSession,checkTenantRole,uplodMiddleware.fields([{ name: 'idProof', maxCount: 1 }, { name: 'addressProof', maxCount: 8 }]),saveTenantDetails);
router.get('/tenant-list',checkSession,tenantList);
router.get('/edit-tenant-details/:id',checkSession,checkTenantRole,editTenantController);
router.post('/update-tenant-details',checkSession,checkTenantRole,uplodMiddleware.fields([{ name: 'idProof', maxCount: 1 }, { name: 'addressProof', maxCount: 8 }]),updatetenantDetails);

module.exports=router;
