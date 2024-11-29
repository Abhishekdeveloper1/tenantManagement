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

 
  // const savepropertyDetails = async (req, res) => {
  //   try {
  //     const {
  //       ownerName,
  //       propertyName,
  //       street,
  //       city,
  //       state,
  //       zipCode,
  //       propertyType,
  //       houseType,
  //       bedrooms,
  //       toilets,
  //       propertySize,
  //       rentPrice,
  //       description,
  //       contactDetails
  //     } = req.body;
  
  //     // Handle image uploads (multiple images)
  //     const images = req.files ? req.files.map(file => file.path) : [];  // Array of image paths
  //     const userId = req.user ? req.user._id : new mongoose.Types.ObjectId();  // Correct usage with 'new'
  //     const subscriptionId = req.body.subscriptionId ? req.body.subscriptionId : new mongoose.Types.ObjectId();  // Correct usage with 'new'
  
  //     // const userId = req.user ? req.user._id : mongoose.Types.ObjectId();  // Use the logged-in user's ID or generate a new ObjectId
  //     // const subscriptionId = req.body.subscriptionId ? req.body.subscriptionId : mongoose.Types.ObjectId();  // If subscriptionId is provided, use it; else, generate a new ObjectId
  
  //     // // Assuming `userId` and `subscriptionId` are provided by the logged-in user or passed in the request
  //     // const userId = req.user ? req.user._id : null;  // Example, adjust as per your authentication method
  //     // const subscriptionId = req.body.subscriptionId || null;
  
  //     if (!userId) {
  //       return res.status(400).send({ success: false, message: "User ID is required." });
  //     }
  
  //     // Create a new property object
  //     const newProperty = new PropertyModel({
  //       ownerName,
  //       propertyName,
  //       address: {
  //         street,
  //         city,
  //         state,
  //         zipCode
  //       },
  //       propertyType,
  //       houseType,
  //       bedrooms,
  //       toilets,
  //       propertySize,
  //       rentPrice,
  //       description,
  //       contactDetails,
  //       images,  // Array of image paths
  //       userId,
  //       subscriptionId
  //     });
  
  //     // Save the property details to the database
  //     await newProperty.save();
  
  //     // Respond with success message
  //     res.status(200).send({ success: true, message: 'Property details saved successfully.' });
  //   } catch (error) {
  //     console.error("Database save error:", error);
  //     res.status(500).send({
  //       success: false,
  //       message: "An error occurred while saving property details.",
  //       error: error.message
  //     });
  //   }
  // };
  const savepropertyDetails = async (req, res) => {
    try {
      const {
        ownerName,
        propertyName,
        street,
        city,
        state,
        zipCode,
        country, // Country field is included
        propertyType,
        houseType,
        buildingOrApartmentName, // Added this field from the form
        bedrooms,
        toilets,
        propertySize,
        rentPrice,
        description,
        contactDetails,
        isAvailable // Checkbox field for availability
      } = req.body;
  
      // Handle image uploads (multiple images)
      const images = req.files ? req.files.map(file => file.path) : []; // Array of image paths
  
      // Generate or fetch `userId` and `subscriptionId`
      const userId = req.user ? req.user._id : new mongoose.Types.ObjectId(); // Use authenticated user ID or generate a new ObjectId
      const subscriptionId = req.body.subscriptionId || new mongoose.Types.ObjectId();
  
      // Validate required fields (optional but recommended)
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
          country // Add country to the address
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
  
      res.redirect('/property-details');
      
    } catch (error) {
      console.error("Database save error:", error);
      res.status(500).send({
        success: false,
        message: "An error occurred while saving property details.",
        error: error.message
      });
    }
  };
  

 module.exports={propertyDetails,savepropertyDetails,}