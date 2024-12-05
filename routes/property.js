const express=require('express');
const router=express.Router();
const { uplodMiddleware } = require('../middleware/fileuploadMiddleware');
const {sessionMiddleware,checkSession,checkAdminRole,checkOwnerRole,checkTenantRole} = require("../middleware/sessionMiddleware");
const { propertyDetails,savepropertyDetails,propertyLists,editPropertyDetails,updatePropertyDetails } = require("../controllers/PropertyController");
router.get('/property-details',checkOwnerRole,propertyDetails);
router.post('/save-property-details',checkOwnerRole,uplodMiddleware.array('images', 10),savepropertyDetails);
router.get('/propertyLists',checkSession,propertyLists);
router.get('/edit-property-details/:id',checkOwnerRole,editPropertyDetails);
router.post('/updatePropertyDetails',checkOwnerRole,uplodMiddleware.array('images', 10), updatePropertyDetails);






module.exports=router;
