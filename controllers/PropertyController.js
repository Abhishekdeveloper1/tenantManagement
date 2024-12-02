const PropertyModel =require("../models/PropertyModel");
const mongoose=require('mongoose');

const { uplodMiddleware } =require("../middleware/fileuploadMiddleware");
const propertyDetails = (req, res) => {
    try {
      if (Object.keys(req.body).length > 0) {
        console.log("Received data:", req.body);
          res.send({ success: true, message: "Property details processed successfully." });
      } else {
        res.render('templates/users/propertyDetails', { title: 'Property Details' });
      }
    } catch (error) {
      // Handle any potential errors
      console.error("Error in propertyDetails controller:", error);
      res.status(500).send({ success: false, message: "An error occurred while processing the request." });
    }
  };

 
  const savepropertyDetails = async (req, res) => {
    try {
      const {
        ownerName,
        propertyName,
        street,
        city,
        state,
        zipCode,
        country,
        propertyType,
        houseType,
        buildingOrApartmentName,
        bedrooms,
        toilets,
        propertySize,
        rentPrice,
        description,
        contactDetails,
        isAvailable
      } = req.body;
  
      // Handle image uploads (multiple images)
   const images = req.files 
  ? req.files.map(file => file.path.replace('public/', '')) 
  : [];

 
      const userId = req.user ? req.user._id : new mongoose.Types.ObjectId(); // Use authenticated user ID or generate a new ObjectId
      const subscriptionId = req.body.subscriptionId || new mongoose.Types.ObjectId();
  
      if (!ownerName || !propertyName || !street || !city || !state || !zipCode || !propertyType || !bedrooms || !toilets || !rentPrice) {
        return res.status(400).send({ 
          success: false, 
          message: "All required fields must be filled." 
        });
      }
  
      // Create a new property object
      const newProperty = new PropertyModel({
        ownerName,
        propertyName,
        address: {
          street,
          city,
          state,
          zipCode,
          country
        },
        propertyType,
        houseType,
        buildingOrApartmentName, // Include building/apartment name
        bedrooms,
        toilets,
        propertySize,
        rentPrice,
        description,
        contactDetails: {
          phone: contactDetails?.phone, // Safely handle nested contact details
          email: contactDetails?.email // Safely handle nested contact details
        },
        images, // Array of image paths
        userId,
        subscriptionId,
        isAvailable: isAvailable === 'true' // Convert string to boolean
      });
  
      // Save the property details to the database
      await newProperty.save();
  
      res.redirect('/propertyLists');
      
    } catch (error) {
      console.error("Database save error:", error);
      res.status(500).send({
        success: false,
        message: "An error occurred while saving property details.",
        error: error.message
      });
    }
  };
  
const propertyLists=async(req,res)=>{
  const propertylists=await PropertyModel.find({});
console.log(propertylists);
  res.render('templates/users/propertyLists', {propertylists});

}
 module.exports={propertyDetails,savepropertyDetails,propertyLists,}