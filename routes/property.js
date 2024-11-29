const express=require('express');
const router=express.Router();
const { propertyDetails } = require("../controllers/auth/PropertyController");
router.get('/property-details',propertyDetails);

module.exports=router;
