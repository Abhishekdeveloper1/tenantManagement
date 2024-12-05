const PropertyModel =require("../models/PropertyModel");
const mongoose=require('mongoose');

const { uplodMiddleware } =require("../middleware/fileuploadMiddleware");
const { json } = require("express");
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

 
      // const userId = req.user ? req.user._id : new mongoose.Types.ObjectId(); // Use authenticated user ID or generate a new ObjectId
      const userId = req.session.user.id ? req.session.user.id: new mongoose.Types.ObjectId(); // Use authenticated user ID or generate a new ObjectId
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
  let propertylists;
  if(req.session.user.roles==='owner')
  {
    propertylists=await PropertyModel.find({userId:req.session.user.id});

 }
  else{
    propertylists=await PropertyModel.find({});

 }
console.log(propertylists);
  res.render('templates/users/propertyLists', {propertylists});

}
const editPropertyDetails=async(req,res)=>{
  const propertylists=await PropertyModel.findById(req.params.id);

  console.log(propertylists);  // Correctly access the 'id' from the request params
  // return;
  res.render('templates/users/editpropertyLists',{propertylists,pid:req.params.id});

}


const updatePropertyDetails = async (req, res) => {
  try {
    const { pid, ...updateData } = req.body; // Extract `pid` and other fields from the request body
    console.log("PID received:", pid);

    // Handle nested fields explicitly
    if (updateData.street || updateData.city || updateData.state) {
      updateData.address = {
        street: updateData.street || "",
        city: updateData.city || "",
        state: updateData.state || "",
        zipCode: updateData.zipCode || "",
        country: updateData.country || "India",
      };
      delete updateData.street;
      delete updateData.city;
      delete updateData.state;
      delete updateData.zipCode;
      delete updateData.country;
    }

    if (req.files && req.files.length > 0) {
      // Replace existing images if new ones are uploaded
      const imagePaths = req.files.map((file) =>
        file.path.replace("public/", "")
      );
      updateData.images = imagePaths;
    }

    // Convert isAvailable to boolean
    if (updateData.isAvailable) {
      updateData.isAvailable = updateData.isAvailable === "true";
    }

    // Perform the update
    const updatedProperty = await PropertyModel.findByIdAndUpdate(
      pid, // Use ObjectId directly
      { $set: updateData },
      { new: true } // Return the updated document
    );

    if (!updatedProperty) {
      return res.status(404).send("Property not found");
    }

    console.log("Updated Property:", updatedProperty);
    res.redirect("/propertyLists");
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).send("An error occurred while updating the property");
  }
};


 module.exports={propertyDetails,savepropertyDetails,propertyLists,editPropertyDetails,updatePropertyDetails,}