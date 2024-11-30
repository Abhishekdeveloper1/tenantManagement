const express=require('express');
const router=express.Router();
const { uplodMiddleware } = require('../middleware/fileuploadMiddleware');
const { propertyDetails,savepropertyDetails,propertyLists } = require("../controllers/PropertyController");
router.get('/property-details',propertyDetails);
router.post('/save-property-details',uplodMiddleware.array('images', 10),savepropertyDetails);
router.get('/propertyLists',propertyLists);




module.exports=router;
