const express=require('express');
const router=express.Router();
const { propertyDetails } = require("../controllers/PropertyController");
router.get('/property-details',propertyDetails);

module.exports=router;
