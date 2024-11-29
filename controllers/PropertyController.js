const PropertyModel = ("../../models/PropertyModel");
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

 module.exports={propertyDetails,}